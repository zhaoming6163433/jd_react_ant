import React, { Component } from 'react';
import { Button, Table } from 'antd';
import {connect} from 'react-redux';

const mapState = state => ({
    home: state.home
})
const mapDispatch = (dispatch) => ({
    homeDispatch: dispatch.home
})

class Home extends Component {
    componentDidMount(){
        console.log(this.props.home)
    };
    changeData = () => {
        this.props.homeDispatch.post_user_info({'home':'首页'});
    };
    render() {
        console.log(this.props.home)
        const { columns, userinfo } = this.props.home;
        return (
            <div>
                <Button type="primary" onClick={this.changeData}>修改数据</Button>
                <div>
                    <Table rowKey={(record, index) => `complete${record.id}${index}`} columns={columns} dataSource={userinfo}/>
                </div>
            </div>
        );
    }
  }

  export default connect(mapState,mapDispatch)(Home);
