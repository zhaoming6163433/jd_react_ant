import React, { Component } from 'react';
import './index.scss';
import util from "utils/util.js";
import { Spin } from 'antd';
class Linedata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:props.title,
            myChart: {},
            serieskey:'',
            seriesarr:[],
            datearr:[]
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.props.base_data) == JSON.stringify(nextProps.base_data)) {
            // 数据相等，阻止更新
            return false
        }
        return true
    }
    componentDidUpdate (prevProps, prevState) {
        // 如果数据发生变化，则更新图表
        if(JSON.stringify(this.props.base_data) != JSON.stringify(prevProps.base_data)) {
            console.log('------------------linedata')
            this.showchar();
        }
    }
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        this.state.myChart = window.$echarts.init(document.getElementById(this.props.chartid));
        window.addEventListener('resize',() =>{
            this.state.myChart.resize();
        })
        this.showchar();
    }
    toggle = value => {
        this.setState({ loading: value });
    };
    showchar() {
        let oData = this.props.base_data;
        let arr = Object.keys(oData.series);
        if (oData.series && oData.xAxis[0].length && arr.length != 0) {
            // 有数据
            this.state.datearr = [];
            this.state.seriesarr = [];
            this.state.datearr = oData.xAxis&&oData.xAxis[0];
            let _baseeries = oData.series;
            for(var key in _baseeries){
                this.state.serieskey = key;
                this.state.seriesarr = _baseeries[key];
            }
        } else {
            // 没有数据,获取开始日期后七天时间
            let oDate = util.getSevenDate(new Date('2019-9-01'),'2019-9-16');
            this.state.datearr = [];
            this.state.seriesarr = [];
            oDate.map((item,index)=>{
                this.state.datearr.push(item)
            })
            this.state.seriesarr = [0,0,0,0,0,0,0];
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
                    data: this.state.datearr,
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
                    name: this.state.serieskey,
                    type: 'line',
                    // data:[11, 11, 15, 13, 12, 13, 10],
                    data: this.state.seriesarr,
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
        this.state.myChart.clear();
        this.state.myChart.setOption(option);
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