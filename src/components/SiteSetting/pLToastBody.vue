<template>
  <div class="settingToastBody">

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
     <input type="hidden" v-model="ruleForm.id" >
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="场地名称" prop="factoryName" >
            <el-input type="text" v-model.trim="ruleForm.factoryName" :disabled="isAmount" maxlength="40"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="场地类型" prop="factoryType">
            <el-select v-model="ruleForm.factoryType" placeholder="请选择" :disabled="isAmount" filterable >
              <el-option v-for="item in typeData" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
                <el-col :span="18">
              <el-form-item label="场地描述" prop="factoryDesc" >
            <el-input type="text" v-model.trim="ruleForm.factoryDesc" :disabled="isAmount" maxlength="200"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="18">
         <el-form-item label="管理者" prop="manager" >
            <el-input type="text" v-model.trim="ruleForm.manager" :disabled="isAmount" maxlength="30"></el-input>
          </el-form-item>
        </el-col> 
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import {
    factoryType
  } from '../../api/Settingsite'
  export default {
    props: ['options', 'type'],
    data() {
      return {
        isAmount:false,
        typeData: [],
        ruleForm: {
        producInfo: '',
        factoryName: '',
        factoryType: '',
        factoryDesc: '',
        manager: '',
        id:''
        },
        rules: { //校验
          factoryName:[
            {
            required: true,
            message: '请填写空盘名称',
            trigger: 'change'
          }
          ],
          factoryType:[
            { required: true, message: '请选择场地名称', trigger: 'change' }
          ],
          factoryDesc: [
            { required: true, message: '请选择部门名称', trigger: 'change' }
          ], 
         manager:[
            {
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }
          ], 
        }
      }
    },
/*     props: ['options'], */
    methods: {
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
      submitForm(fun) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
              fun();
          } else {
            return false;
          }
        });
      },//表单验证.....
/*       change() {
        let index = this.producInfoData.findIndex((item, index) => {
          return this.ruleForm.producInfo == item.value;
        })
        if (index != -1) {
          let producInfo = this.ruleForm.producInfo;
          let {
        coiledName,
        factoryName,
        orgName,
        status,
        id //id
          } = this.producInfoData[index];
          this.ruleForm = {
        producInfo,
        coiledName,                                                    
        factoryName,
        orgName,
        status,
        id //id                                                                   
          }
        }

      }, */
/*       setSelectData(data){
        let _arr = new Array();
        for(let key in data){
            _arr.push({
                label:data[key],
                value:key
            })
        }
        return _arr;
      } */
    },
    mounted() {
       //工艺信息查询
/*         factoryType({
        params:{}
      }).then(data=>{
        this.typeData=data.model
         console.log(data.model)
      })  */
/*          factoryType({Vue:this}).then(data=>{
          this.typeData = this.setSelectData(data.model);
          console.log(data.model)
      })   */ 
       factoryType({
        Vue: this
      }).then(data => {
        this.typeData = data.model;
       console.log(this.typeData)
      })    
    }
  }

</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
  }

</style>
