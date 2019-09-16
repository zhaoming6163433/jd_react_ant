import React, { Component } from 'react';
import { Button, Table } from 'antd';
import {connect} from 'react-redux';

const mapState = state => ({
    home: state.home
})
const mapDispatch = (dispatch) => ({
    add_user: dispatch.home
})

class Home extends Component {
    componentDidMount(){
        console.log(this.props.home)
    };
    changeData = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'home/base_getids',
            params: {'home':'首页'}
        });
    };
    render() {
        // console.log(this.props.home)
        // const { columns, data } = this.props.home;
        return (
            <div>
                {/* <Button type="primary" onClick={this.changeData}>修改数据</Button>
                <div>
                    <Table rowKey={(record, index) => `complete${record.id}${index}`} columns={columns} dataSource={data}/>
                </div> */}
            </div>
        );
    }
  }

  export default connect(mapState,mapDispatch)(Home);
