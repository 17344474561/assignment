import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:[],
    sear:'',
    datas:{}
  },

 // state 只能在这里改
 //只能改同步代码不能改异步
  mutations: {
    //获取初始数据
     'GET_DATA' ( state , action ) {
          state.data = action
      },

      'DEL_DATA' ( state , del ) {
          state.data = state.data.filter( val =>val.id != del.id )
      },

      'SEARCH_DATA' ( state , val ) {
          state.sear = val
      },

      'UPDATA' ( state , datas ) {
          console.log(datas)
          state.datas = datas
      }
  },

  //异步
  actions: {
    'ACTION_DATA' () {
        
    }
  },
  getters: {
    allData: state => state.data,
    upData: state => state.datas,
    searData: state => state.data.filter(v => {
      return v.name.includes(state.sear)
    }),
  },
  modules: {
  }
})
