import { post_user_info } from '@/services/api';

export const echartData = {
  state: {
    base_data1:{
        "series": {
            "申请单量": [800, 900, 700, 800, 750]
        },
        "xAxis": [
            ["2019-08-16", "2019-08-17", "2019-08-18", "2019-08-19", "2019-08-20"]
        ]
    },
    base_data2:{
        series: {申请单量: []},
        xAxis: [[]]
    },
    base_data3:[
        {
          "name": "拍拍贷2019",
          "value": 70
        }, {
          "name": "宜人贷2019",
          "value": 65
        }, {
          "name": "宜车贷2019",
          "value": 66
        }, {
          "name": "宜农贷2019",
          "value": 75
        }
    ],
    base_data4:{
        "series":{
            "2018-09": [0,0.0001,0.0005,0.0006,0.0007,0.0008,0.0009,0.001,0.0012,0.0014,0.0016,0.002,0.0032],
            "2018-10": [0,0.0001,0.0005,0.0006,0.0007,0.0008,0.0009,0.001,0.0012,0.0014,0.0016,0.002,0.0032],
        },
        "xAxis": [
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        ]
    },
    // base_data4:{"series":{},"xAxis":[[]]}
    base_data5:{
        "series": {
          "3": [30, 38, 50, 45, 50],
          "6": [60, 62, 55, 55, 55],
          "9": [90, 95, 60, 65, 60],
          "12": [120, 105, 65, 75, 65],
          "18": [180, 125, 70, 85, 70],
          "24": [240, 135, 75, 95, 75],
          "36": [360, 145, 80, 110, 80],
          "其它": [400, 155, 85, 130, 85]
        },
        "xAxis": [
          ["2019-07-25", "2019-07-26", "2019-07-27", "2019-07-28", "2019-07-29"]
        ]
    }
  },
  subscriptions: {
  },
  effects: (dispatch) => ({
    async post_base_data1(params){
        // 开启Loading
        dispatch.Loading.isLoading(true);
        try{
            // let res = await post_user_info("");
            let data = {
                "series": {
                    "申请单量": [800, 900, 200, 800, 750]
                },
                "xAxis": [
                    ["2019-08-16", "2019-08-17", "2019-08-18", "2019-08-19", "2019-08-20"]
                ]
            }
            this.CHANGE_BASE_DATA1(data);
            // 关闭Loading
            dispatch.Loading.isLoading(false);
        }catch(e){
            // 关闭Loading
            dispatch.Loading.isLoading(false);
        }
    },
    async post_base_data3(params){
        // 开启Loading
        dispatch.Loading.isLoading(true);
        try{
            // let res = await post_user_info("");
            let data3 = [
                {
                    "name": "拍拍贷2019",
                    "value": 20
                }, {
                    "name": "宜人贷2019",
                    "value": 3
                }, {
                    "name": "宜车贷2019",
                    "value": 12
                }, {
                    "name": "宜农贷2019",
                    "value": 33
                }
            ]
            this.CHANGE_BASE_DATA3(data3);
            // 关闭Loading
            dispatch.Loading.isLoading(false);
        }catch(e){
            // 关闭Loading
            dispatch.Loading.isLoading(false);
        }
    },
    async post_base_data4(params){
        try{
            // let res = await post_user_info("");
            // this.CHANGE_BASE_DATA4(res);
        }catch(e){

        }
    }
  }),
  reducers: {
    CHANGE_BASE_DATA1(state, data) {
        return { ...state,
            base_data1: data };
    },
    CHANGE_BASE_DATA3(state, data) {
        return { ...state,
            base_data3: data };
    },
    CHANGE_BASE_DATA4(state, data) {
        return { ...state,
            base_data4: data };
    }
  }
};
