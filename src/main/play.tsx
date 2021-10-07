import React,{useState} from 'react';
import { Row, Col, Space, message, Button, Upload, Input, Form} from 'antd';
import { MapContainer, TileLayer, Marker,  CircleMarker, Polyline, Popup} from 'react-leaflet';
import { Robber,Police,Exit,Jail } from '../common/common';
import { UploadOutlined } from '@ant-design/icons';
import axios, { AxiosInstance } from 'axios';
import L from 'leaflet'
import './map.css';

const Create : React.FC = () =>{
    const [attackerPos,setAttackerPos] = useState(-1)
    const [initAttackerPos,setInitAttackerPos] = useState(-1)
    const [data,setData] = useState<Object>({})
    const [graph,setGraph]= useState<Object>()
    const [position,setPosition] = useState<Object>({})
    const [successRead,setSuccessRead] = useState(false)
    const [edges,setEdges] = useState<Set<[number,number,number,number]>>(new Set());
    const [Defenders,setDefenders] = useState<Set<number>>();
    const [initDefenders,setInitDefenders] = useState<Set<number>>();
    const [exits,setExits] = useState<Set<number>>();
    const [playing,setPlaying] = useState(false)
    const [caught,setCaught] = useState(false)
    const [won,setWon] = useState(false)
    const [map, setMap] = useState<L.Map>()
    const [timeLeft,setTimeLeft] = useState(0)
    const [initTimeLeft,setInitTimeLeft] = useState(0)
    const [apiURL,setApiURL] = useState<string>("")
    var API: AxiosInstance;

    const readFile = (file)=>{
        var reader = new FileReader();
        reader.onload = function(event) {
            if (event.target?.result && typeof event.target?.result==="string"){
                var a = JSON.parse(event.target?.result)
                setSuccessRead(true)
                setData(a)
            }else{
                setSuccessRead(false)
                message.error("Failed to read file!")
            }
            
        }
        reader.readAsText(file)
        
        return false
    }

    const move = (node: number)=>{
        if (!playing || caught || won ){
            return
        }
        if (graph && graph[attackerPos].has(node)){
            API = axios.create({
                baseURL: apiURL,
                headers: {
                    "Content-type": "application/json"
                }
            });
            API.get(`api/move?node=${node}`).then((res) => {
                const { success, defenders} = res.data;
                console.log("Response Data",res.data)
                if (success){
                    let s:Set<number> = new Set(defenders)
                    console.log("New Defenders Position",s)
                    setDefenders(s)
                    setAttackerPos(node)
                    let time = timeLeft-1
                    setTimeLeft(time)
                    //call api
                    if (s && s.has(node)){
                        setCaught(true)
                        message.info("You have lost :-(")
                    }else if (exits && exits.has(node)){
                        setWon(true)
                        message.success("You have won!")
                    }else if (time===0){
                        setWon(true)
                        message.info("You have lost :-(")
                    }
                }
            })
        }
    }

    const renderGraph = ()=>{
        setAttackerPos(-1)
        setInitAttackerPos(-1)
        setDefenders(undefined)
        setPosition({})
        setGraph(undefined)
        setExits(undefined)
        setEdges(new Set())
        try{
            if (data['timeHorizon']===undefined){
                throw(Error("invalid data in json file"))
            }
            setTimeLeft(data['timeHorizon'])
            setInitTimeLeft(data['timeHorizon'])
            var pos = {}
            setPosition(data['position'])
            for  (let key in data['position']){
                let n = parseInt(key,10)
                if (data['position'][key]===undefined){
                    throw(Error("invalid data in json file"))
                }
                pos[n]= data['position'][key]
            }
            setPosition(pos)
            let tempDefs:Set<number> = new Set()
            for (let d in data['defenders']){
                let key = data['defenders'][d].toString()
                if (data['position'][key]===undefined){
                    throw(Error("invalid data in json file"))
                }
                tempDefs.add(data['defenders'][d])
            }
            setDefenders(tempDefs)
            setInitDefenders(tempDefs)
            let tempExits:Set<number> = new Set()
            for (let d in data['exits']){
                let key = data['exits'][d].toString()
                if (data['position'][key]===undefined){
    
                    throw(Error("invalid data in json file"))
                }
                tempExits.add(data['exits'][d])
            }
            setExits(tempExits)
            
            let key = data['attacker'].toString()
            if (data['position'][key]===undefined){
                throw(Error("invalid data in json file"))
            }
            setAttackerPos(data['attacker'])
            setInitAttackerPos(data['attacker'])
            let graph = {}
            for  (let key in data['graph']){
                let n1 = parseInt(key,10)
                let n2 = 0
                for (let key2 in data['graph'][key]){
                    n2= data['graph'][key][key2]
                    if (graph[n1]===undefined){
                        graph[n1]= new Set()
                    }
                    graph[n1].add(n2)
                    if (n1!==n2){
                        let k1 = n1.toString()
                        let k2 = n2.toString()
                        if (data['position'][k1]===undefined ||data['position'][k2]===undefined ){
                            throw(Error("invalid data in json file"))
                        }
                        let edge:[number,number,number,number] = [data['position'][k1][0],data['position'][k1][1],data['position'][k2][0],data['position'][k2][1]]
                        setEdges(edges => new Set(edges).add(edge))
                    }
                }
            }
            if (map){
              map.setView(data['position'][data['attacker']],13)
            }
            setGraph(graph)
        }catch(err){
            message.error("Failed to render graph, invalid data in json file")
        }
    }
 
    const resetGame = ()=>{
        setAttackerPos(initAttackerPos)
        setPlaying(false)
        setCaught(false)
        setWon(false)
        setDefenders(initDefenders)
        setTimeLeft(initTimeLeft)
    }

    const play= ()=>{
        if (attackerPos!==-1){
            API = axios.create({
                baseURL: apiURL,
                headers: {
                    "Content-type": "application/json"
                }
            });
            API.get('api/reset').then((res) => {
                console.log(res)
                const { success} = res.data;
                if (success){
                    setPlaying(true)
                }else{
                    message.error("Error server response")
                }
            }).catch(_=>{message.error("Unable to connect to server")})

        }
    }

    const onApiURLChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setApiURL(e.currentTarget.value)
    }

    const SideMenu = () =>{
        return (
            <div style={{marginTop:20}}>
                <h1>Upload </h1>
                <Col>
                <Space direction="vertical">
                    <Upload
                    accept="application/json"
                    maxCount={1}
                    beforeUpload={readFile}
                    > 
                        <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                    </Upload>
                    <Button
                    type="primary"
                    onClick={renderGraph}
                    disabled={!successRead}
                    >
                    Render Graph
                    </Button>
                    
                    <Row>
                    <Space>
                        <Button
                        type="primary"
                        onClick={play}
                        disabled={!successRead || playing}
                        >
                        Play
                        </Button>
                        <Button
                        danger
                        type="primary"
                        onClick={resetGame}
                        disabled={!successRead}
                        >
                        Reset Game
                        </Button>
                    </Space>
                    </Row>
                    {
                        playing &&
                        <Row>
                            <h3>Time Left: {timeLeft}</h3>
                        </Row>
                    }
                    
                </Space>
                </Col>
                

            </div>
        )
    }


    return (
        <div>
            <Row>
                <Col span={9}>
                    <SideMenu/>
                    <br/>
                    <Form >
                    <Form.Item
                        label="API URL"
                    >
                        <Input onChange={onApiURLChange} value={apiURL} />
                    </Form.Item> 
                    </Form>
                    <br/>
                <h1>Instuctions </h1>
                <ul>
                    <li>Upload the json file you get when create graph and render graph</li>
                    <li>Input the server URL. Server template can be found in the link below.</li>
                    <li>If your server is hosted on local machine, and your url is localhost, please disable "block insecure private network requests" if you are using chrome via "chrome://flags/#block-insecure-private-network-requests"</li>
                    <li>In addition, please add "http://" before "localhost" if your url is localhost. E.g. "http://localhost:8000"</li>
                    <li>Click Play to start playing</li>
                    <li>Double click on the map to select the next node the move</li>
                    <li>Click on the node to view the node number based on the json graph</li>
                    <li>For more details and server template, visit: https://github.com/limkaraik/NSG-Server-Template</li>
                    <li>Sample server and json file can be found here: https://github.com/limkaraik/NSG-sample-server</li>
                </ul>
                </Col>
                <Col span = {15}>
                
                    <MapContainer center={[51.505, -0.09]} whenCreated={setMap} zoom={13} doubleClickZoom={false} scrollWheelZoom={true} style={{width:800, height:650, marginLeft:100, marginTop:20}}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* render nodes*/ 
                            position &&
                            Object.keys(position).map((val,i)=>(
                                <CircleMarker center={position[val]} key={val} fillOpacity={0.7} interactive={true} eventHandlers={{ dblclick:(e) =>{
                                    move(parseInt(val,10))
                                }, click:(e)=>{}}}>
                                    <Popup>
                                        Node {val}
                                    </Popup>
                                </CircleMarker>
                            ))
                        }
                        {/* render edges*/ 
                            edges.size>0 &&
                            Array.from(edges).map((edge,index) =>(
                                <Polyline  key={index} positions={[[edge[0],edge[1]],[edge[2],edge[3]]]}/>
                            ))
                        }
                        {/* render exits*/ 
                            exits &&
                            Array.from(exits).map((pos,i)=>(
                                <Marker position={position[pos]} key={i}  interactive={false} icon={caught && pos===attackerPos ? Jail: Exit}/>
                            ))
                        }
                        {/* render defenders*/ 
                            Defenders &&
                            Array.from(Defenders).map((pos,i)=>(
                                <Marker position={position[pos]} key={i}  interactive={false} icon={caught && pos===attackerPos ? Jail: Police}/>
                            ))
                        }
                        {/* render attacker*/ 
                            attackerPos!==-1 && <Marker position={position[attackerPos]} icon={caught ? Jail: Robber} interactive={false}/>
                        }
                        
                    </MapContainer>
             
                </Col>
            </Row>
        </div>
    );
};

export default Create;