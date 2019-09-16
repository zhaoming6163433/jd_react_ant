import { post_user_info } from '@/services/api';

export const home = {
  state: {
    columns: [{
          title: '姓名',
          dataIndex: 'name',
        }, {
          title: 'ID',
          dataIndex: 'id',
    }],
    userinfo: [{
        "name": "赵明",
        "id": "122"
    }]
  },

  subscriptions: {

  },

  effects: {
    async post_user_info(params){
        console.log(params)
        try{
            let res = await post_user_info("");
            this.ADD_USER(res);
        }catch(e){

        }
    }
  },

  reducers: {
    ADD_USER(state, data) {
      return { ...state,
        userinfo: data };
    }
  }
};
