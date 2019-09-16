import React, { Component } from 'react';
import './index.scss';
import util from "utils/util.js";
class Linelengdata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            myChart: {},
            base_data: []
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        console.log('---------------')
    }
    componentDidMount() {
        this.myChart = window.$echarts.init(document.getElementById(this.props.chartid));
        window.addEventListener('resize', () => {
            this.myChart.resize();
        })
        this.showchar();
    }
    showchar() {
        let arr = Object.keys(this.props.base_data.series);
        if (this.props.base_data.series && this.props.base_data.xAxis[0].length && arr.length != 0) {
            // 有数据
            let _baseeries = this.props.base_data.series;
            this.legendarr = [];
            this.seriesarr = [];
            for (var key in _baseeries) {
                this.legendarr.push(key)
                let obj = {
                    name: key,
                    type: 'line',
                    stack: this.props.chartid == 'm2' || this.props.chartid == 'm1' ? '总量' : '',
                    data: _baseeries[key]
                }
                this.seriesarr.push(obj);
            }
        } else {
            this.legendarr = [];
            this.seriesarr = [];
            // 没有数据,获取开始日期后七天时间
            let oDate = util.getSevenDate(new Date('2019-9-01'), '2019-9-16');
            this.props.base_data.xAxis[0].length = 0;
            oDate.map((item, index) => {
                this.props.base_data.xAxis[0].push(item)
            })
            let obj = {
                name: "",
                type: 'line',
                stack: this.props.chartid == 'm2' || this.props.chartid == 'm1' ? '总量' : '',
                data: [0, 0, 0, 0, 0, 0, 0]
            }
            this.seriesarr.push(obj);
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
                data: this.legendarr,
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
                data: this.props.base_data.xAxis[0]
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
            series: this.seriesarr
        };
        this.myChart.clear();
        this.myChart.setOption(option);
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