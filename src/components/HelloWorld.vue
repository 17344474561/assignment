<template>
  <div class="hello">
      <Add/>
      <template>
        <el-table
          :data="tableData.filter( 
            data => !search || data.name.toLowerCase().includes(
              search.toLowerCase()
            ))"
          style="width: 100%">
        <el-table-column label="ID" prop="id"> </el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column label="Age"  prop="age"> </el-table-column>
        <el-table-column label="Gender" prop="gender"> </el-table-column>
        <el-table-column label="Msg" prop="msg"> </el-table-column>
        <el-table-column label="Hospital" prop="hospital"> </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    
  </div>
</template>

<script>
import Add from "../views/Add"
import { mapState , mapActions} from "vuex"
import axios from "axios"
export default {
  data () {
    return {
      tableData:[],
      search: ''
    }
    
  },
  methods: {  
      ...mapActions([
         'ACTION_DATA',
      ]),
      sear () {
          this.tableDatav = this.$store.getters.searData
      },
      handleEdit(index, row) {
         this.$router.push({
           path:"/Updata",
           params:"row"
         })
         this.$store.commit('UPDATA')
        console.log(index, row);
      },
      handleDelete(index, row) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.$store.commit("DEL_DATA",row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
     
  },
  watch:{
      search (value) {
          this.$store.commit( "SEARCH_DATA" , value )
      },
  },
  computed:{ ...mapState(['data'])},
  created () {
      axios.get("https://api.baxiaobu.com/index.php/home/v5/getuser")
        .then(res => {
          this.$store.commit("GET_DATA",res.data.users)
          this.tableData = this.$store.getters.allData
      })
  },
  components: {
    Add
  }
}
</script>
<style scoped>
</style>
