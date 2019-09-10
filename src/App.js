import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Routes from './routes/index';
import LeftMenu from '../src/components/leftMenu';
import { post_base_getids } from './services/api';
import './App.scss';

const { Header, Sider, Content } = Layout;
class App extends Component {
    componentDidMount () {
      this.base_getids('')
    }
    //创建新建id
    async base_getids(){
      try{
          let res = await post_base_getids("");
          console.log(res)
      }catch(e){

      }
    }
    render() {
      const routers = Routes.map((item, index) => {
        return item.exact ? <Route key={index} exact path={item.path} component={item.component} /> : <Route key={index} path={item.path} component={item.component} />;
      });
      return (
        // <div className="App">
        //   <Button type="primary">Button</Button>
        // </div>
        <Router>
          <HashRouter>
            <div className="App">
              <Layout>
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: 2 }}>
                  <div className="logo">
                    878878787
                  </div>
                  <LeftMenu />
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                  <Header className="header">
                    天天宇通
                  </Header>
                  <Content style={{ background: '#fff', padding: 15, marginLeft: 10, marginRight: 10, minHeight: 415, marginTop: 30 }}>
                    3454页565
                    <Switch>{routers}</Switch>
                  </Content>
                </Layout>
              </Layout>
            </div>
          </HashRouter>
        </Router>
      );
    }
  }

export default App;
