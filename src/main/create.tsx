import React,{useState} from 'react';
import { Row, Col, Radio, Space, Switch, message, Button, InputNumber} from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents, CircleMarker, Polyline} from 'react-leaflet';
import { Robber,Police,Exit } from '../common/common';
import './map.css';

const Create : React.FC = () =>{
    const [stateSelection, setStateSelection] = useState(1);
    const [nodes,setNodes] = useState<Set<[number,number]>>(new Set());
    const [edges,setEdges] = useState<Set<[number,number,number,number]>>(new Set());
    const [firstNode, setFirstNode] = useState<[number,number]>();
    const [edgeNodeSelection, setEdgeNodeSelection] = useState(false);
    const [defenders,setDefenders] = useState<Set<[number,number]>>(new Set());
    const [exits,setExits] = useState<Set<[number,number]>>(new Set());
    const [attacker,setAttacker] = useState<[number,number]>();
    const [timeHorizon, setTimeHorizon] = useState(10);

    const toggle = (e)=>{
        if (e.key==='a'){
            setEdgeNodeSelection(!edgeNodeSelection)
        }
    }
    document.onkeyup = toggle;

    const Update = () => {

        const map = useMapEvents({
            dblclick(e) {  
                let pos:[number,number] = [e.latlng.lat,e.latlng.lng] 
                if (stateSelection ===1){
                    setNodes(nodes => new Set(nodes).add(pos))    
                }else if ((stateSelection ===2)){
                    setNodes(nodes => {
                        const next = new Set(nodes);
                        next.forEach((val) => {
                            if (val[0]===pos[0] && val[1]===pos[1]){
                                next.delete(val) //delete node from nodes
                                //if node contain edges delete edges
                                setEdges(edges => {
                                    const newEdges = new Set(edges);
                                    newEdges.forEach(edge => ((edge[0]===pos[0] && edge[1]===pos[1]) ||
                                        (edge[2]===pos[0] && edge[3]===pos[1]))
                                        ? newEdges.delete(edge) : edge)
                                    return newEdges;
                                });
                                //if deleted node is defender delete defender
                                setDefenders(defenders => {
                                    const newDef = new Set(defenders);
                                    newDef.delete(val)
                                    return newDef;
                                });
                                //if deleted node is exit delete exit
                                setExits(exits => {
                                    const newExits = new Set(exits);
                                    newExits.delete(val)
                                    return newExits;
                                });
                                //if deleted node is attacker delete attacker
                                if (attacker && attacker[0]===val[0] && attacker[1]===val[1]){
                                    setAttacker(undefined)
                                }
                            }
                        })
                        return next;
                    });
                }
            },
            click(e){
                let pos:[number,number] = [e.latlng.lat,e.latlng.lng] 
                //add or delete edge
                if ((stateSelection ===3 || stateSelection ===4)){
                    nodes.forEach((val)=>{
                        if (val[0]===pos[0] && val[1]===pos[1]){
                            if (edgeNodeSelection === false){ //to select source node
                                setFirstNode(pos)
                                message.info("Source Node Selected")
                            }else{ //select target node
                                if (firstNode===undefined){
                                    message.error("Select the Source Node First")
                                }else if (stateSelection===3 && (firstNode[0]!==pos[0] || firstNode[1]!==pos[1]) ){
                                    let edge:[number,number,number,number] = [firstNode[0], firstNode[1],pos[0],pos[1]]
                                    setEdges(edges => new Set(edges).add(edge))
                                }else if (stateSelection===4){
                                    setEdges(edges => {
                                        const next = new Set(edges);
                                        next.forEach(val => ((val[0]===pos[0] && val[1]===pos[1] && val[2]===firstNode[0] && val[3]===firstNode[1]) ||
                                            (val[2]===pos[0] && val[3]===pos[1] && val[0]===firstNode[0] && val[1]===firstNode[1]))
                                            ? next.delete(val) : val)
                                        return next;
                                    });
                                }
                            }
                        }
                    })
            }else if ((stateSelection ===5 || stateSelection ===6)){ //add or delete defenders
                nodes.forEach((val)=>{
                    if (val[0]===pos[0] && val[1]===pos[1]){
                        if (stateSelection===5){
                            setDefenders(defenders => new Set(defenders).add(val))  
                        }else{
                            setDefenders(defenders => {
                                const next = new Set(defenders);
                                next.delete(val)
                                return next;
                            });
                        }
                        
                    }
                })
            }else if ((stateSelection ===7 || stateSelection ===8)){ //add or delete exits
                nodes.forEach((val)=>{
                    if (val[0]===pos[0] && val[1]===pos[1]){
                        if (stateSelection===7){
                            setExits(exits => new Set(exits).add(val))  
                        }else{
                            setExits(exits => {
                                const next = new Set(exits);
                                next.delete(val)
                                return next;
                            });
                        }
                        
                    }
                })
            }else if ((stateSelection ===9)){ //set attacker
                nodes.forEach((val)=>{
                    if (val[0]===pos[0] && val[1]===pos[1]){
                        setAttacker(val)
                    }
                })
            }
            },
        })
        return (
            null
        )   
        
    }

    const onSwitchChange = (e)=>{
        setEdgeNodeSelection(e)
    };

    const onChangeStateSelection = (e) => {
        setStateSelection(e.target.value)
      };

    const onClickReset= ()=>{
        setNodes(new Set())
        setEdges(new Set())
        setDefenders(new Set())
        setExits(new Set())
        setAttacker(undefined)
        setFirstNode(undefined)
    }

    const onClickCreateGraph = ()=>{
        let data = {"graph":{},
            "position":{},
            "defenders":new Array(),
            "attacker":-1,
            "exits":new Array(),
            "timeHorizon":timeHorizon,
        }

        let count = 1;
        nodes.forEach((val)=>{
            data["position"][count]= val
            data['graph'][count] = [count]
            if (defenders.has(val)){
                data['defenders'].push(count)
            }
            if (exits.has(val)){
                data['exits'].push(count)
            }
            if (attacker && attacker[0]===val[0] && attacker[1]===val[1]){
                data['attacker'] = count
            }
            count++
        })

        edges.forEach((edge)=>{
            let n1 = 0
            let n2 = 0
            for  (let key in data['position']){
                let pos = data['position'][key]
                if (pos[0]===edge[0] && pos[1]===edge[1]){
                    n1 = parseInt(key,10)
                }else if (pos[0]===edge[2] && pos[1]===edge[3]){
                    n2 = parseInt(key,10)
                }                
            }
            if (n1!==0 && n2!==0){
                let a:Array<number> = data['graph'][n1]
                a.push(n2)
                a= data['graph'][n2]
                a.push(n1)
            }
            
        })
        const a = document.createElement("a");
  
        a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json"
          }));
        a.setAttribute("download", "data.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }

    const onTimeHorizonChange = (value: number)=>{
        setTimeHorizon(value)
    }

    const SideMenu = () =>{
        return (
            <div style={{marginTop:20}}>
                <h1>Select Action </h1>
                <Space direction='vertical'>
                <Row>
                    <Radio.Group
                    onChange={onChangeStateSelection}
                    value={stateSelection}
                    optionType="button"
                    buttonStyle="solid"
                    >
                        <Space direction='vertical'>
                        <Row>
                            <Radio.Button value={1} style={{ width: 150 }}>Add Nodes</Radio.Button>
                            <Radio.Button value={2} style={{ width: 150 }}>Delete Nodes</Radio.Button>
                        </Row>
                        <Row>
                            <Radio.Button value={3} style={{ width: 150 }}>Add Edges</Radio.Button>
                            <Radio.Button value={4} style={{ width: 150 }}>Delete Edges</Radio.Button>
                            <Switch defaultChecked={false} checkedChildren={'Target'} unCheckedChildren={'Source'} onChange={onSwitchChange} checked={edgeNodeSelection} style={{marginLeft:20, marginTop:5}}/>
                        </Row>
                        <Row>
                            <Radio.Button value={5} style={{ width: 150 }}>Add Defenders</Radio.Button>
                            <Radio.Button value={6} style={{ width: 150 }}>Delete Defenders</Radio.Button>
                        </Row>
                        <Row>
                            <Radio.Button value={7} style={{ width: 150 }}>Add Exits</Radio.Button>
                            <Radio.Button value={8} style={{ width: 150 }}>Delete Exits</Radio.Button>
                        </Row>
                        <Row>
                            <Radio.Button value={9} style={{ width: 150 }}>Set Attacker</Radio.Button>
                        </Row>
                        </Space>
                    </Radio.Group>
                </Row>
                <Row>
                    <Space>
                        <h3>Time Horizon</h3>
                        <InputNumber min={1} max={100} defaultValue={10} onChange={onTimeHorizonChange} value={timeHorizon}/>
                    </Space>
                </Row>
                </Space>
                <Row style={{marginTop:20}}>
                    <Space>
                        <Button type="primary" onClick={onClickCreateGraph}>Generate Graph</Button>
                        <Button danger type="primary" onClick={onClickReset}>Reset</Button>
                    </Space>
                </Row>
          
                <br/>
                <h1>Instuctions </h1>
                <ul>
                    <li>Double click on the map to add or delete nodes</li>
                    <li>To add or delete edges, click to select the source node, then toggle the switch to select target node.(edges are undirected*) </li>
                    <li>You can press 'a' on the keyboard to toggle the switch when adding edges </li>
                    <li>Click on the nodes to add or delete Defenders/Exits</li>
                    <li>Click on the nodes to set Attacker</li>
                    <li>For more details and server template, visit: https://github.com/limkaraik/NSG-Server-Template</li>
                    <li>Sample server and json file can be found here: https://github.com/limkaraik/NSG-sample-server</li>
                </ul>

            </div>
        )
    }


    return (
        <div>
            <Row>
                <Col span={9}>
                    <SideMenu/>
                </Col>
                <Col span = {15}>
                
                    <MapContainer center={[51.505, -0.09]} zoom={13} doubleClickZoom={false} scrollWheelZoom={true} style={{width:800, height:650, marginLeft:100, marginTop:20}}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Update/>
                        {/* render nodes*/ 
                            nodes.size>0 && 
                            Array.from(nodes).map((val,index) =>(
                                <CircleMarker center={val} key={index} fillOpacity={0.7} interactive={true} eventHandlers={{ dblclick:(e) =>{}, click:(e)=>{}}}/>
                            ))
                        }
                        {/* render edges*/ 
                            edges.size>0 && 
                            Array.from(edges).map((edge,index) =>(
                                <Polyline  key={index} positions={[[edge[0],edge[1]],[edge[2],edge[3]]]}/>
                            ))
                        }
                        {/* render defenders*/ 
                            defenders.size>0 && 
                            Array.from(defenders).map((val,index) =>(
                                <Marker position={val} key={index}  interactive={false} icon={Police}/>
                            ))
                        }
                        {/* render exits*/ 
                            exits.size>0 && 
                            Array.from(exits).map((val,index) =>(
                                <Marker position={val} key={index}  interactive={false} icon={Exit}/>
                            ))
                        }
                        {/* render attacker*/ 
                            attacker && <Marker position={attacker} icon={Robber} interactive={false}/>
                        }
                        
                    </MapContainer>
             
                </Col>
            </Row>
        </div>
    );
};

export default Create;