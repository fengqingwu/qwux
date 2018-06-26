<template>
  <div class="settingToastBody">
    <el-form :model="settingData" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row v-for="(item,index) in settingData.listParam">
        <el-col :span="24">
          <el-form-item label="工艺参数名">
            <el-input v-model="item.param"  placeholder="不能重复" style="width: 222px;"></el-input>
            <el-button type="primary" class="left-d" @click="addMe(item)">+</el-button>
            <el-button type="primary" class="right-d" @click="jian(index)">-</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {
  findByStructId,//获取工艺参数
} from "../../api/ProcessSetting";
  export default {
    props: ['options','rowData'],
    data() {
      return {
        settingData:{
            id:'',
            "listParam":[
               {
                id:33,
                param:''
              }
            ]
        },
        ruleForm: {
          
        },
        rules: { //校验
          parameterName: [{required: true, message: '此选择为必填项', trigger: 'change'}], //工艺参数名 
        }
      }
    },
    mounted(){
     //获取工艺参数
     var that = this;
     var par = { 'crafworkId': this.rowData.id }
     //console.log("par" , par )
    // debugger;
      findByStructId({Vue:this,params:par }).then(data=>{      
          console.log( "参数列表" , data )
          that.settingData.listParam.splice(0,0,...data.model);
      })
    },
    methods: {
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
      addMe(data){
       if(data.param===''){
         return;
       } 
       let result = this.settingData.listParam.filter((item)=>{
          return item.param === data.param;
        })
       // debugger
        if(result.length>1){
           data.param = '';
          return 
        }
        this.settingData.listParam.push({
          id:33,
          param:''
        })
      },
      jian(i){
        if(this.settingData.listParam.length==1){
          return;
        }
        this.settingData.listParam.splice(i,1)
      },
      submitForm(fun) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (fun) {
              fun();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
  }
</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
  }
 .el-form-item__error {
    width: 85px;
  
}
.right-d{
  float: right;
  margin-right:-11px;
  margin-top:-41px; 
}
</style>
