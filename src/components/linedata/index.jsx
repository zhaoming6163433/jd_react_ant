import React, { Component } from 'react';
import './index.scss';
import echarts from 'echarts';
import util from "utils/util.js";
class Linedata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:props.title,
            myChart: {},
            base_data:[]
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        console.log('---------------')
        // if (store.getState().Contract.SetCodeOff) {
        //   return false;
        // } else {
        //   this.setState({
        //     codeOff: false
        //   });
        // }
    }
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById(this.props.chartid));
        window.addEventListener('resize',() =>{
            this.myChart.resize();
        })
        this.showchar();
    }
    showchar() {
        let arr = Object.keys(this.props.base_data.series);
        if (this.props.base_data.series && this.props.base_data.xAxis[0].length && arr.length != 0) {
            // 有数据
            let _datearr = this.props.base_data.xAxis&&this.props.base_data.xAxis[0];
            let _baseeries = this.props.base_data.series;
            for(var key in _baseeries){
                this.props.base_data.series = _baseeries[key]
            }
        } else {
            // 没有数据,获取开始日期后七天时间
            let oDate = util.getSevenDate(new Date('2019-9-01'),'2019-9-16');
            this.props.base_data.xAxis[0].length = 0;
            oDate.map((item,index)=>{
                this.props.base_data.xAxis[0].push(item)
            })
            this.props.base_data.series = [0,0,0,0,0,0,0];
        }
        let option = {
            title: {
                text: this.state.title,
                textStyle:{
                    fontSize:14,
                    color:"#909399"
                }
            },
            toolbox: {
                right:'20px',
                feature: {
                    saveAsImage: {},
                    // dataView: {readOnly: false}
                }
            },
            color: ['#409eff'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '0%',
                right: '5%',
                bottom: '16',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    // data :  ['2019/07/01','2019/07/02','2019/07/03','2019/07/04','2019/07/05','2019/07/06','2019/07/07'],
                    data: this.props.base_data.xAxis[0],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name: this.serieskey,
                    type: 'line',
                    // data:[11, 11, 15, 13, 12, 13, 10],
                    data: this.props.base_data.series,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        };
        this.myChart.clear();
        this.myChart.setOption(option);
    }
  render() {
    return (
        <div className="linedata">
            <div id={this.props.chartid} className="myline"></div>
        </div>
    );
  }
}

export default Linedata;