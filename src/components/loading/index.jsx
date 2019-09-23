import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import './index.scss';
const mapState = state => ({
    Loading: state.Loading
})
class Loading extends Component {
  render() {
    return (
        <div className="loading" style={{ display: this.props.Loading ? 'block' : 'none'}}>
            <Spin spinning={this.props.Loading} tip="Loading..." className="spin"></Spin>
        </div>
    )
  }
}
export default connect(mapState)(Loading);
