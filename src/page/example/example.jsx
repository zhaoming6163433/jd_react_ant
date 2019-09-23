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
  exampleData: state.exampleData
})
const mapDispatch = (dispatch) => ({
  exampleDispatch: dispatch.exampleData
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
    this.props.exampleDispatch.post_base_data1({ 'home': '首页' });
    this.props.exampleDispatch.post_base_data3({ 'home': '首页' });
  }
  componentDidMount() {
    // 设置图表5、图表6初始化数据
    myWorker.postMessage(this.props.exampleData.base_data5);
    myWorker1.postMessage(this.props.exampleData.base_data5);
  }
  // 弹出框1 确定按钮-提交数据
  handleOk = e => {
    e.preventDefault();
    let oFrom = this.formRef.props.form;
    oFrom.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        console.log('父组件=======')
        this.setState({
          demoVisible: false,
        });
        // 发送请求
        this.props.exampleDispatch.post_base_data6({ 'home6': '首页' });
      } else {
				console.log('Received values of form: ', values);
			}
    });
  };
  // 弹出框1 取消按钮
  handleCancel = e => {
    this.setState({
      demoVisible: false,
    });
  };
  // 弹出框2 确定按钮-提交数据
  handleOk2 = e => {
    e.preventDefault();
    let oFrom = this.formRef2.props.form;
    oFrom.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        console.log('父组件=======')
        this.setState({
          demoVisible2: false,
        });
        // 发送请求
        this.props.exampleDispatch.post_base_data6({ 'home6': '首页' });
      } else {
				console.log('Received values of form: ', values);
			}
    });
  };
  // 弹出框2 取消按钮
  handleCancel2 = e => {;
    this.setState({
      demoVisible2: false,
    });
  };
  // 弹出框1 显示
  showDialog1 = () =>{
    this.setState({
      demoVisible: true,
    });
  }
  // 弹出框2 显示
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
        <Linedata chartid={this.state.chartid} title='图表1' base_data={this.props.exampleData.base_data1}></Linedata>
        <Linedata chartid={this.state.chartid1} title='图表2' base_data={this.props.exampleData.base_data2}></Linedata>
        <Piedata chartid={this.state.chartid2} title='图表3' base_data={this.props.exampleData.base_data3}></Piedata>
        <Linelengdata chartid={this.state.chartid3} title='图表4' base_data={this.props.exampleData.base_data4}></Linelengdata>
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
            <div>啦啦啦啦啦啦啦</div>
            <div>啦啦啦啦啦啦啦</div>
            {/* 经过 Form.create 之后如果要拿到 ref，可以使用 rc-form 提供的 wrappedComponentRef */}
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
            {/* 经过 Form.create 之后如果要拿到 ref，可以使用 rc-form 提供的 wrappedComponentRef */}
            <DemoForm2 wrappedComponentRef={(form) => this.formRef2 = form}></DemoForm2>
          </div>
        </AllDialog>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(example);
