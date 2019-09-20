import React, { Component } from 'react';
import './index.scss';
import $ from 'n-zepto';
class Paipairebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            myChart: {},
            worker: null,
            newbase_data:{},
            seriesarr:[],
            datearr:[],
            legendarr:[]
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
            console.log('------------------paipairebar')
            this.showchar();
        }
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        this.state.myChart = window.$echarts.init(document.getElementById(this.props.chartid));
        window.addEventListener('resize', () => {
            this.state.myChart.resize();
        })
        this.handleres();
    }
    handleres = () => {
        if (!this.props.base_data) {
            return;
        }
        this.state.seriesarr = this.props.base_data.seriesarr;
        this.state.datearr = this.props.base_data.datearr;
        this.state.legendarr = this.props.base_data.legendarr;
        this.showchar();
    }
    handletable = () => {
        //处理表格数据
        let newbase_data = {};
        $.extend(newbase_data, this.props.base_data);
        let myobj = newbase_data.series;
        for (let key in myobj) {
            this.state.seriesarr.forEach((item, index) => {
                if (item.name == key) {
                    myobj[key] = item.data;
                }
            });
        }
        this.state.newbase_data = newbase_data;
    }
    showchar() {
        this.handletable();
        let option = {
            title: {
                text: this.state.title,
                textStyle: {
                    fontSize: 14,
                    color: '#606266'
                }
            },
            color: ['#072F6D', '#0140A1', '#0157D4', '#3a88fa', '#5a9dff', '#8ebcff', '#b3d1ff', '#d9e8ff', '#333333', '#333333', '#333333', '#333333', '#333333', '#333333', '#333333'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: (value) => {
                    value = value.reverse();
                    let result = "";
                    for (let i = 0; i < value.length; i++) {
                        let date = value[i]["axisValue"];
                        if (i > 0) {
                            date = "";
                        }
                        result = result + date + '<br />' + value[i].marker + " " + value[i].seriesName + ': ' + (value[i].value).toFixed(2) + '%';
                    }
                    return result;
                },
                position: (point, params, dom, rect, size) => {
                    if (this.chartposition) {
                        return { right: '10%', top: '10%' };
                    }
                },
            },
            legend: {
                // right: '0px',
                top: '20px',
                left: 'center',
                data: this.state.legendarr
            },
            grid: {
                top: '30%',
                left: '0%',
                right: '0%',
                bottom: '16',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.state.datearr,
                    axisTick: {
                        alignWithLabel: true
                    }

                }
            ],
            yAxis: [
                {
                    minInterval: 1,
                    type: 'value',
                    splitNumber: 5,
                    axisLabel: {
                        formatter: (value) => {
                            switch (this.state.serieskey) {
                                default:
                                    return value + '%';
                            }
                        }
                    }, splitLine: {
                        show: false
                    }
                }
            ],
            series: this.state.seriesarr.reverse()
        };
        this.state.myChart.clear();
        this.state.myChart.setOption(option);
    }
    render() {
        return (
            <div className="paipairebar">
                <div id={this.props.chartid} className="mybar"></div>
            </div>
        );
    }
}

export default Paipairebar;