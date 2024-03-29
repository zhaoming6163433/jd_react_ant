import React, { Component } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import Routes from '@/routes/index';
import LeftMenu from '@/components/leftMenu';
import Loading from '@/components/loading';
import { connect } from 'react-redux';
import { post_user_info } from './services/api';
import emitter from "utils/ev"

import './App.scss';
const { Header, Sider, Content } = Layout;
const mapState = state => ({
  count: state.count
})

const mapDispatch = (dispatch) => ({
  countDispatch: dispatch.count
})

class App extends Component {
  componentDidMount() {
    this.base_getids('');
    // console.log(getState)

    }
    handleClick = () => {
        emitter.emit("callMe","Hello")
        this.props.countDispatch.increment(10)
    };
    handleClick2 = () => {
      this.props.countDispatch.incrementAsync(20)
    };
    //获取用户信息
    async base_getids(){
      try{
          let res = await post_user_info("");
          console.log(res)
      }catch(e){
    }
  }
  render() {
    const routers = Routes.map((item, index) => {
      return item.exact ? <Route key={index} exact path={item.path} component={item.component} /> : <Route key={index} path={item.path} component={item.component} />;
    });
    return (
      <ConfigProvider locale={zhCN}>
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
                    3454页5652
                      <Switch>{routers}</Switch>
                    <div>
                      The count is {this.props.count}
                      <button onClick={this.handleClick}>increment</button>
                      <button onClick={this.handleClick2}>incrementAsync</button>
                    </div>
                    <Loading />
                  </Content>
                </Layout>
              </Layout>
            </div>
          </HashRouter>
        </Router>
      </ConfigProvider>
    );
  }
}

// export default App;
export default connect(mapState, mapDispatch)(App);
