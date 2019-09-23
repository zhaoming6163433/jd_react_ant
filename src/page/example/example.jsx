import React, { Component } from 'react';
import { connect } from 'react-redux';
import Linedata from 'components/linedata';
import Piedata from 'components/piedata';
import Linelengdata from 'components/linelengdata';
import Paipairebar from 'components/paipairebar';
import AllDialog from 'components/allDialog';
import DemoForm from './from';
import DemoForm2 from './from2';
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
      chartid: 'applychart',
      chartid1: 'applychart1',
      chartid2: 'piechart',
      chartid3: 'm1',
      chartid4: 'paipairebar',
      chartid5: 'paipairebar1',
      demoVisible: false,
      demoVisible2: false,
      formRef:null,
      formRef2:null
    };
  }
  changeState = () => {
    this.props.echartDispatch.post_base_data1({ 'home': '首页' });
    this.props.echartDispatch.post_base_data3({ 'home': '首页' });
  }
  componentDidMount() {
    myWorker.postMessage(this.props.echartData.base_data5);
    myWorker1.postMessage(this.props.echartData.base_data5);
  }
  handleOk = e => {
    console.log(e);
    this.handleSubmit(e)
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      demoVisible: false,
    });
  };
  handleOk2 = e => {
    console.log(e);
    this.handleSubmit2(e)
  };
  handleCancel2 = e => {
    console.log(e);
    this.setState({
      demoVisible2: false,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let oFrom = this.formRef.props.form;
    oFrom.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        console.log('父组件=======')
        this.setState({
          demoVisible: false,
        });
      } else {
				console.log('Received values of form: ', values);
			}
    });
  };
  handleSubmit2 = e => {
    e.preventDefault();
    let oFrom = this.formRef2.props.form;
    oFrom.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({
          demoVisible2: false,
        });
      } else {
				console.log('Received values of form: ', values);
			}
    });
  }
  showDialog1 = () =>{
    this.setState({
      demoVisible: true,
    });
  }
  showDialog2 = () =>{
    this.setState({
      demoVisible2: true,
    });
  }
  render() {
    return (
      <div className="App">
        <Button type="primary" onClick={this.changeState}>修改数据</Button>
        <Button type="primary" onClick={this.showDialog1} style={{marginLeft:'30px'}}>弹出框1</Button>
        <Button type="primary" onClick={this.showDialog2} style={{marginLeft:'30px'}}>弹出框2</Button>
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
        <AllDialog
          visible={this.state.demoVisible}
          width='90%'
          title="Demo"
          okText="确认1"
          cancelText="取消2"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="content">
            <div>8839399</div>
            <DemoForm wrappedComponentRef={(form) => this.formRef = form}></DemoForm>
          </div>
        </AllDialog>
        <AllDialog
          visible={this.state.demoVisible2}
          width='90%'
          title="Demo2"
          okText="确认"
          cancelText="取消"
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
        >
          <div className="content">
            <DemoForm2 wrappedComponentRef={(form) => this.formRef2 = form}></DemoForm2>
          </div>
        </AllDialog>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(example);
