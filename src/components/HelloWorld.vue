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
           <el-table-column
            align="right">
            <template slot="header">
              <el-input
                v-model="search"
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
     <!-- 修改 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理权限" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="管理员">
            <el-option label="管理员" value="管理员 "></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upData" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Add from '../views/Add'
import { mapState } from 'vuex'
import './style.less'

export default {
  data () {
    return {
      search: '',
      form: { 
        id:'' , 
        name:'' ,
        age: '' , 
        gender:'' , 
        msg:'' , 
        hospital:'' 
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
    }
  },
  methods: {  
      //修改
      upData () { 
          this.$store.dispatch('ACTION_UPDATA' , this.form )
          this.dialogFormVisible = false
      },
      //回显
      handleEdit( index , row ) {
          this.dialogFormVisible = true
          Object.assign( this.form , row);

      },
      //删除
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
          this.$store.dispatch("ACTION_DEL_DATA", row )
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
  },

  computed:{ ...mapState([ 'tableData' ]) },

  created () {
        this.$store.dispatch('ACTION_DATA')
  },

  components: {
      Add,
  }
}
</script>
<style scoped>
</style>
