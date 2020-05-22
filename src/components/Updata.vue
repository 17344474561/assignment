<template>
    <div class="hello">
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
            <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import axios from "axios"
import qs from "qs"
export default {
  name: 'Updata',
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
         ruleForm: {
          name:"",
          age: '',
          gender:"",
          msg:"",
          hospital:""
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
       submitForm(formName) {
         this.$refs[formName].validate((valid) => {
           if (valid) {

            // const obj = {
            //     id: this.$store.getters.upData.id,
            //     name: this.ruleForm.name ,
            //     age: this.ruleForm.age ,
            //     gender: this.ruleForm.gender,
            //     msg: this.ruleForm.msg ,
            //     hospital:this.ruleForm.hospital
            // }
            axios.post('https://api.baxiaobu.com/index.php/home/v5/updateUser' , qs.stringify( this.ruleForm ))
                .then(res => {
                    if(res.status == 200){
                        console.log(res)
                        alert(" 修改成功")
                            this.$router.push({
                            path:"/",
                        })
                    }   
            })
           } else {
             console.log('error 修改失败');
             return false;
           }
         });
       }
     },
     created(){
        this.ruleForm.name = this.$store.getters.upData.name
        this.ruleForm.age = this.$store.getters.upData.age
        this.ruleForm.gender = this.$store.getters.upData.gender
        this.ruleForm.msg = this.$store.getters.upData.msg
        this.ruleForm.hospital = this.$store.getters.upData.hospital
     }
}
</script>