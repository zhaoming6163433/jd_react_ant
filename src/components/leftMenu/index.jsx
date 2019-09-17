import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

class leftMenu extends Component {
    rootSubmenuKeys = ['sub1', 'sub2'];
    state = {
      openKeys: [],
    };
    componentDidMount () {
      var hash = window.location.hash.split('/')[1] ? window.location.hash.split('/')[1] : '';
      console.log(window.location.hash)
      this.setState({
        openKeys: [hash],
        selectedKeys: [hash]
      });
    }
    onSelect=(item, key, selectedKeys) => {
      this.setState({
        selectedKeys: item ? item.selectedKeys : [],
      });
    }
    // componentWillUpdate(nextprops, nextstate) {
    //   // console.log(111, nextprops,this.state.props);
    //   var hash = window.location.hash.split('/')[1] ? window.location.hash.split('/')[1] : '';
    //   if (!this.state.selectedKeys || nextstate.selectedKeys[0] != this.state.selectedKeys[0]) {
    //     // console.log(this.state.selectedKeys, nextstate.selectedKeys);
    //     this.setState({
    //       openKeys: [hash],
    //       selectedKeys: [hash]
    //     });
    //   }
    // }
    onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys });
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
      }
    };
  render() {
    return (<div style={{ width: 256 }}>
        <Menu
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ width: 200 }}
          selectedKeys={this.state.selectedKeys}
          onSelect={this.onSelect}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="aa">
            <Icon type="pie-chart" />
            <span>aa</span>
            <Link to="/aa"></Link>
          </Menu.Item>
          <Menu.Item key="home">
            <Icon type="desktop" />
            <span>home</span>
            <Link to="/home"></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default leftMenu;