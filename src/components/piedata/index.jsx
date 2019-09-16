import React, { Component } from 'react';
import './index.scss';
import echarts from 'echarts';
class Piedata extends Component {
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
        if (this.props.base_data.series && this.props.base_data.xAxis[0].length) {
            // 有数据
            let _datearr = this.props.base_data.xAxis&&this.props.base_data.xAxis[0];
            let _baseeries = this.props.base_data.series;
            // console.log(_baseeries)

            for(var key in _baseeries){
                this.props.base_data.series = _baseeries[key]
            }
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
                data: this.props.base_data
            },
            series : [
                {
                    name: '项目名称',
                    type: 'pie',
                    radius : '50%',
                    center: ['50%', '60%'],
                    data: this.props.base_data,
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
        this.myChart.clear();
        this.myChart.setOption(option);
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