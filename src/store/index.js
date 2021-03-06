import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import qs from "qs"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData:[],
    sear:'',
  },

 // state 只能在这里改
 // 只能改同步代码不能改异步
  mutations: {
    //获取初始数据
    GET_DATA ( state , action ) {
        state.tableData = action
    },
  },

  //异步
  actions: {
    ACTION_DATA ( { commit } ) {
        axios.get("https://api.baxiaobu.com/index.php/home/v5/getuser")
          .then(res => {
            commit( "GET_DATA" , res.data.users)
        })
    },
    //添加
    ADD_DATA ( stores , obj ) {
        axios.post("https://api.baxiaobu.com/index.php/home/v5/add" ,
           qs.stringify( obj ))
          .then(res => {
            if (res.data.status == 200) {
              stores.dispatch('ACTION_DATA')
            }
        })
    },
    //删除
    ACTION_DEL_DATA ( stores , del ) {
        axios.post("https://api.baxiaobu.com/index.php/home/v5/deleteUser" , 
            qs.stringify({ id: del.id }))
            .then(res => {
            if (res.data.status == 200) {
              stores.dispatch('ACTION_DATA')
            }
        })
    },

    //修改
    ACTION_UPDATA ( stores , data ) {
        axios.post("https://api.baxiaobu.com/index.php/home/v5/updateUser",
          qs.stringify(data))
          .then(res => {
            if (res.data.status == 200) {
              stores.dispatch('ACTION_DATA')
            }
        })
    }
    
  },
})
