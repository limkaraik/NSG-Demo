import React from 'react';
import { Layout, Menu} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Play from './play';
import Create from './create';
const { Header, Content,Footer } = Layout;

const Main : React.FC = () =>{

    return (
        <Router>
             <Layout className="layout">
                <Header>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1">
                            Play
                            <Link to="/" />
                        </Menu.Item>
                        <Menu.Item key="2">
                            Create
                            <Link to="/create" />
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Route exact path="/" component={Play} />
                    <Route exact path="/create" component={Create} />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Game Demo ©2021 Created Lim Kar Aik</Footer>
            </Layout>
        </Router>
    );
};

export default Main;