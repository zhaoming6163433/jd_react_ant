import { post_base_getids } from '@/services/api';

export const home = {
  state: {
    columns: [{
          title: '姓名',
          dataIndex: 'name',
        }, {
          title: 'ID',
          dataIndex: 'id',
        }],
    data: [{
        "name": "赵明",
        "id": "122"
      }]
  },

  subscriptions: {

  },

  effects: {
    async base_getids(params){
        console.log(params)
        try{
            let res = await post_base_getids("");
            this.ADD_USER(res);
        }catch(e){

        }
    }
  },

  reducers: {
    ADD_USER(state, data) {
      return { ...state,
        JSON_DATA: data };
    }
  }
};
