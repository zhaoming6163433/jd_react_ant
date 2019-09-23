import React, { Component } from 'react';
import {connect} from 'react-redux';
import Linedata from 'components/linedata';
import Piedata from 'components/piedata';
import Linelengdata from 'components/linelengdata';
import Paipairebar from 'components/paipairebar';
import { Button } from 'antd';
import WebWorker from "react-webworker"
const myWorker = new Worker("./worker.js")
const myWorker1 = new Worker("./worker1.js")
const mapState = state => ({
  echartData: state.echartData
})
const mapDispatch = (dispatch) => ({
  echartDispatch: dispatch.echartData
})
class example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartid:'applychart',
      chartid1: 'applychart1',
      chartid2: 'piechart',
      chartid3:'m1',
      chartid4:'paipairebar',
      chartid5:'paipairebar1',
    };
  }
  changeState = () => {
    this.props.echartDispatch.post_base_data1({'home':'首页'});
    this.props.echartDispatch.post_base_data3({'home':'首页'});
  }
  componentDidMount() {
    myWorker.postMessage(this.props.echartData.base_data5);
    myWorker1.postMessage(this.props.echartData.base_data5);
  }
    render() {
      return (
        <div className="App">
          <Button type="primary" onClick={this.changeState}>修改数据</Button>
          <Linedata chartid={this.state.chartid} title='图表1' base_data={this.props.echartData.base_data1}></Linedata>
          <Linedata chartid={this.state.chartid1} title='图表2' base_data={this.props.echartData.base_data2}></Linedata>
          <Piedata chartid={this.state.chartid2} title='图表3' base_data={this.props.echartData.base_data3}></Piedata>
          <Linelengdata chartid={this.state.chartid3} title='图表4' base_data={this.props.echartData.base_data4}></Linelengdata>
          <WebWorker worker={myWorker}>
            {({ data, error, postMessage }) => {
              if (error) return `Something went wrong: ${error.message}`
              if (data)
                return (
                  <div>
                    <Paipairebar chartid={this.state.chartid4} title='图表5' base_data={data}></Paipairebar>
                  </div>
                )
              // return <button onClick={() => postMessage(this.state.base_data5)}>Hello</button>
            }}
          </WebWorker>
          <WebWorker worker={myWorker1}>
            {({ data, error, postMessage }) => {
              if (error) return `Something went wrong: ${error.message}`
              if (data)
                return (
                  <div>
                    <Paipairebar chartid={this.state.chartid5} title='图表6' base_data={data}></Paipairebar>
                  </div>
                )
              // return <button onClick={() => postMessage(this.state.base_data5)}>Hello</button>
            }}
          </WebWorker>
        </div>
      );
    }
  }

  export default connect(mapState,mapDispatch)(example);
