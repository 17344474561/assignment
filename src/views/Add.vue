<template>
  <div class="add">
    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="70%">
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="Gender" prop="gender">
            <el-input v-model="ruleForm.gender"></el-input>
            </el-form-item>
            <el-form-item label="Msg" prop="msg">
            <el-input v-model="ruleForm.msg"></el-input>
            </el-form-item>
            <el-form-item label="Hospital" prop="hospital">
            <el-input v-model="ruleForm.hospital"></el-input>
            </el-form-item>
        </el-form>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Add',
    data() {
       var checkname = (rule, value, callback) => {
         if (!value) {
           return callback(new Error('姓名不能为空'));
         }else{
             callback();
          }
       };
       var checkAge = (rule, value, callback) => {
         if (!value) {
           return callback(new Error('年龄不能为空'));
         }
         setTimeout(() => {
           if (!Number.isInteger(value)) {
             callback(new Error('请输入数字值'));
           } else {
               callback();
             }
         }, 1000);
       };
       var checkGender = (rule, value, callback) => {
         if (!value) {
           return callback(new Error('Gender不能为空'));
         }else{
             callback();
          }
       };
       var checkMsg= (rule, value, callback) => {
         if (!value) {
           return callback(new Error('Msg不能为空'));
         }else{
             callback();
          }
       };
       var checkHospital = (rule, value, callback) => {
         if (!value) {
           return callback(new Error('Hospital不能为空'));
         }else{
             callback();
          }
       };
      return {
        dialogVisible: false,
        ruleForm: {
          name:"",
          age: '',
          gender:"",
          msg:"",
          hospital:"",
         
        },
        rules: {

          name: [
            { validator: checkname, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          gender: [
            { validator: checkGender, trigger: 'blur' }
          ],
          msg: [
            { validator: checkMsg, trigger: 'blur' }
          ],
          hospital: [
            { validator: checkHospital, trigger: 'blur' }
          ],
        }
       };
     },
     methods: {

       addData () {
         console.log(this.ruleForm)
       }
     
  },
  created(){
        
  }
}
</script>
