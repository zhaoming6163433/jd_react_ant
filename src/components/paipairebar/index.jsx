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
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = window.$echarts.init(document.getElementById(this.props.chartid));
        window.addEventListener('resize', () => {
            this.myChart.resize();
        })
        // this.handleres();
    }
    handleres = () => {
        if (!this.props.base_data) {
            return;
        }
        //处理百分比数据
        let _datearr = this.props.base_data.xAxis && this.props.base_data.xAxis[0];
        let _baseeries = this.props.base_data.series;
        this.state.worker = this.$worker.run((_datearr, _baseeries) => {
            let legendarr = [];//存放种类的数组
            let seriesarr = [];//存放每个种类每天占比的数组
            let datetotalarr = [];//存放每天数据的总和
            let datearr = _datearr;//日期数组

            //计算每天每个类别的总和数组
            for (let i = 0; i < datearr.length; i++) {
                let totalnum = 0;//当天各个种类数据总和
                for (var key in _baseeries) {
                    let _data = _baseeries[key][i];
                    totalnum = totalnum + _data;
                }
                datetotalarr.push(totalnum);
            }

            //重新处理每天每个种类的占比
            for (let i = 0; i < datearr.length; i++) {
                for (var key in _baseeries) {
                    let _data = _baseeries[key][i];
                    _baseeries[key][i] = (Math.floor(_data / datetotalarr[i] * 10000) / 10000) * 100;
                    if (isNaN(_baseeries[key][i])) {
                        _baseeries[key][i] = 0;
                    }
                }
            }

            //对处理后的结果赋值
            for (var key in _baseeries) {
                legendarr.push(key);
                let obj = {
                    name: key,
                    barMaxWidth: 40,
                    type: 'bar',
                    stack: '总量',
                    data: _baseeries[key]
                }
                seriesarr.push(obj);
            }
            return {
                seriesarr: seriesarr,
                datearr: datearr,
                legendarr: legendarr
            }
        }, [_datearr, _baseeries])
            .then((res) => {
                this.seriesarr = res.seriesarr;
                this.datearr = res.datearr;
                this.legendarr = res.legendarr;
                this.showchar();
            }).catch((e) => {
                console.log(e)
            });
    }
    handletable = () => {
        //处理表格数据
        let newbase_data = {};
        $.extend(newbase_data, this.props.base_data);
        let myobj = newbase_data.series;
        for (let key in myobj) {
            this.seriesarr.forEach((item, index) => {
                if (item.name == key) {
                    myobj[key] = item.data;
                }
            });
        }
        this.newbase_data = newbase_data;
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
                data: this.legendarr
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
                    data: this.datearr,
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
                            switch (this.serieskey) {
                                default:
                                    return value + '%';
                            }
                        }
                    }, splitLine: {
                        show: false
                    }
                }
            ],
            series: this.seriesarr.reverse()
        };
        this.myChart.clear();
        this.myChart.setOption(option);
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