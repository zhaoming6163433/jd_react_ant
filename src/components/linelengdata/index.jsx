import React, { Component } from 'react';
import './index.scss';
import util from "utils/util.js";
class Linelengdata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            myChart: {},
            legendarr:[],
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
            console.log('------------------linelengdata')
            this.showchar();
        }
    }
    componentDidMount() {
        this.state.myChart = window.$echarts.init(document.getElementById(this.props.chartid));
        window.addEventListener('resize', () => {
            this.state.myChart.resize();
        })
        this.showchar();
    }
    showchar() {
        let oData = this.props.base_data;
        let arr = Object.keys(oData.series);
        if (oData.series && oData.xAxis[0].length && arr.length != 0) {
            // 有数据
            let _baseeries = oData.series;
            this.state.legendarr = [];
            this.state.seriesarr = [];
            this.state.datearr = [];
            this.state.datearr = oData.xAxis[0];
            for (var key in _baseeries) {
                this.state.legendarr.push(key)
                let obj = {
                    name: key,
                    type: 'line',
                    stack: this.props.chartid == 'm2' || this.props.chartid == 'm1' ? '总量' : '',
                    data: _baseeries[key]
                }
                this.state.seriesarr.push(obj);
            }
        } else {
            this.state.legendarr = [];
            this.state.seriesarr = [];
            this.state.datearr = [];
            // 没有数据,获取开始日期后七天时间
            let oDate = util.getSevenDate(new Date('2019-9-01'), '2019-9-16');
            oDate.map((item, index) => {
                this.state.datearr.push(item)
            })
            let obj = {
                name: "",
                type: 'line',
                stack: this.props.chartid == 'm2' || this.props.chartid == 'm1' ? '总量' : '',
                data: [0, 0, 0, 0, 0, 0, 0]
            }
            this.state.seriesarr.push(obj);
        }

        let option = {
            title: {
                text: this.title,
                textStyle: {
                    fontSize: 14,
                    color: "#909399"
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: (datas, index) => {
                    if (this.props.chartid == 'm2' || this.props.chartid == 'm1') {
                        var res = datas[0].name + '<br/>';
                        for (var i = 0, length = datas.length; i < length; i++) {
                            if (datas[i].seriesName != "") {
                                res += datas[i].seriesName + '：'
                                    + (datas[i].value * 100).toFixed(2) + '%' + '<br/>'
                            } else {
                                res += '无：'
                                    + (datas[i].value * 100).toFixed(2) + '%' + '<br/>'
                            }

                        }
                        return res
                    } else {
                        var res = datas[0].name + '<br/>';
                        for (var i = 0, length = datas.length; i < length; i++) {
                            if (datas[i].seriesName != "") {
                                res += datas[i].seriesName
                                    + '：' + datas[i].value + '<br/>';
                            } else {
                                res += '无：' + datas[i].value + '<br/>';
                            }

                        }
                        return res
                    }
                }
            },
            legend: {
                // data:['全部项目','拍拍贷2019','宜人贷2019','宜车贷2019'],
                data: this.state.legendarr,
                padding: [5, 80, 5, 80]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                right: '20px',
                feature: {
                    saveAsImage: {},
                    // dataView: {readOnly: false}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                // data: ['2019/7/1','2019/7/2','2019/7/3','2019/7/4','2019/7/5','2019/7/6','2019/7/7']
                data: this.state.datearr
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: (value, index) => {
                        if (this.props.chartid == 'm2' || this.props.chartid == 'm1') {
                            return (value * 100).toFixed(2) + '%';
                        } else {
                            return value;
                        }
                    },
                    // formatter: this.props.chartid == 'm2' || this.props.chartid == 'm1'?'{value} %': '{value}',
                    textStyle: {
                        color: '#000'//y轴刻度数值颜色
                    }
                },
                show: true
            },
            series: this.state.seriesarr
        };
        this.state.myChart.clear();
        this.state.myChart.setOption(option);
    }
    render() {
        return (
            <div className="linelengdata">
                <div id={this.props.chartid} className="myline"></div>
            </div>
        );
    }
}
export default Linelengdata;