import React, { Component } from 'react';
import Linedata from 'components/linedata';
import Piedata from 'components/piedata';
import Linelengdata from 'components/linelengdata';
import Paipairebar from 'components/paipairebar';
import { Button } from 'antd';
import WebWorker from "react-webworker"
const myWorker = new Worker("./worker.js")
const myWorker1 = new Worker("./worker1.js")

class aa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartid:'applychart',
      chartid1: 'applychart1',
      chartid2: 'piechart',
      chartid3:'m1',
      chartid4:'paipairebar',
      chartid5:'paipairebar1',
      base_data1:{
        "series": {
          "申请单量": [800, 900, 700, 800, 750]
        },
        "xAxis": [
          ["2019-08-16", "2019-08-17", "2019-08-18", "2019-08-19", "2019-08-20"]
        ]
      },
      base_data2:{
        series: {申请单量: []},
        xAxis: [[]]
      },
      base_data3:[
        {
          "name": "拍拍贷2019",
          "value": 70
        }, {
          "name": "宜人贷2019",
          "value": 65
        }, {
          "name": "宜车贷2019",
          "value": 66
        }, {
          "name": "宜农贷2019",
          "value": 75
        }
      ],
      base_data4:{
        "series":{
          "2018-09": [0,0.0001,0.0005,0.0006,0.0007,0.0008,0.0009,0.001,0.0012,0.0014,0.0016,0.002,0.0032],
          "2018-10": [0,0.0001,0.0005,0.0006,0.0007,0.0008,0.0009,0.001,0.0012,0.0014,0.0016,0.002,0.0032],
        },
        "xAxis": [
          ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        ]
      },
      base_data5:{
        "series": {
          "3": [30, 38, 50, 45, 50],
          "6": [60, 62, 55, 55, 55],
          "9": [90, 95, 60, 65, 60],
          "12": [120, 105, 65, 75, 65],
          "18": [180, 125, 70, 85, 70],
          "24": [240, 135, 75, 95, 75],
          "36": [360, 145, 80, 110, 80],
          "其它": [400, 155, 85, 130, 85]
        },
        "xAxis": [
          ["2019-07-25", "2019-07-26", "2019-07-27", "2019-07-28", "2019-07-29"]
        ]
      }
    };
  }
  changeState = () => {
    this.setState({
      chartid:'applychart1'
    });
  }
  componentDidMount() {
    myWorker.postMessage(this.state.base_data5);
    myWorker1.postMessage(this.state.base_data5);
  }
    render() {
      return (
        <div className="App">
          <Button type="primary" onClick={this.changeState}>Button</Button>
          <Linedata chartid={this.state.chartid} title='图表1' base_data={this.state.base_data1}></Linedata>
          {/* <Linedata chartid={this.state.chartid1} title='图表2' base_data={this.state.base_data2}></Linedata> */}
          <Piedata chartid={this.state.chartid2} title='图表3' base_data={this.state.base_data3}></Piedata>
          <Linelengdata chartid={this.state.chartid3} title='图表4' base_data={this.state.base_data4}></Linelengdata>
          {/* <Paipairebar chartid={this.state.chartid4} title='图表5' base_data={this.state.base_data5}></Paipairebar> */}
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

export default aa;
