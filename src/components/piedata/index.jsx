import React, { Component } from 'react';
import './index.scss';
class Piedata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:props.title,
            myChart: {},
            seriesarr:{}
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.props.base_data) == JSON.stringify(nextProps.base_data)) {
            return false
        }
        return true
    }
    componentDidUpdate (prevProps, prevState) {
        // 如果数据发生变化，则更新图表
        if(JSON.stringify(this.props.base_data) != JSON.stringify(prevProps.base_data)) {
            console.log('------------------piedata')
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
    showchar() {
        if (this.props.base_data.length) {
            // 有数据
            this.state.seriesarr = this.props.base_data;
        }
        let option = {
            title : {
                text: this.state.title,
                x:'left',
                textStyle:{
                    fontSize:14,
                    color:"#909399"
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                // data: ['拍拍贷2019','宜人贷2019','宜农贷2019','宜车贷2019']
                data: this.state.seriesarr
            },
            series : [
                {
                    name: '项目名称',
                    type: 'pie',
                    radius : '50%',
                    center: ['50%', '60%'],
                    data: this.state.seriesarr,
                    // data:[
                    //     {value:335, name:'拍拍贷2019'},
                    //     {value:310, name:'宜人贷2019'},
                    //     {value:234, name:'宜农贷2019'},
                    //     {value:135, name:'宜车贷2019'}
                    // ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.state.myChart.clear();
        this.state.myChart.setOption(option);
    }
  render() {
    return (
        <div className="piedata">
            <div id={this.props.chartid} className="mypie"></div>
        </div>
    );
  }
}
export default Piedata;