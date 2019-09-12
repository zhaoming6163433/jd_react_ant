let models = {
    state: {
      count: 0,
      JSON_DATA: ''
    },
    reducers: {
      increment(state) {
        return {
          ...state,
          count: state.count + 1
        };
      },
      setJSON_DATA(state, data) {
        return {
          ...state,
          JSON_DATA: data
        };
      }
    },
    effects: {
      async getJsonData() {
        await fetch('./manifest.json')
          .then(res => res.json())
          .then(json => {
            this.setJSON_DATA(json);
          })
          .catch(err => {
            this.setJSON_DATA(err);
          });
      }
    }
  };
   
  export default models;