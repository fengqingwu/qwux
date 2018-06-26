<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
         <input type="hidden" v-model="ruleForm.id" >
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="空盘编码" prop="coiledNo" >
            <el-input type="text" v-model.trim="ruleForm.coiledNo" :disabled="isAmount" maxlength="30" style="ime-mode:disabled"  onKeyUp="value=value.replace(/[\W]/g,'')"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="18">
          <el-form-item label="内周长" prop="crycle">
            <el-input class="circle" type="number" v-model.trim="ruleForm.crycle"  oninput="if(value.length>11)value=value.slice(0,11)"
            :maxlength="inputMaxL"  @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(ruleForm.crycle) ? null : ruleForm.crycle.length - 1"   ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="场地名称" prop="factoryId">
            <el-select v-model="ruleForm.factoryId" placeholder="请选择" >
              <el-option v-for="item in factoryIdData" :key="item.id" :label="item.factoryName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
                <el-col :span="18">
          <el-form-item label="部门名称" prop="deptId">
            <el-select v-model="ruleForm.deptId" placeholder="请选择">
              <el-option v-for="item in producInfoData" :key="item.id" :label="item.orgName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="18">
          <el-form-item label="状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择"  >
              <el-option v-for="item in statusData" :key="item.id" :label="item.status" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import {
    findByOrg,
    pageForFactory,
    machineType    
  } from '../../api/SpaceCoiled'
  export default {
    props: ['options', 'type'],
    data() {
             let prodNoVD = (rule, value, callback) => {
        if (!value||value.trim() === '') {
           callback(new Error('此选择为必填,请填写'));
        }else if (!/^[a-zA-Z0-9]{14}$/.test(value)) {
          callback(new Error('格式有误'));
        } else {
          callback();   
        }
      }
      return {
        isAmount:false,
        factoryIdData:[],
        producInfoData: [],
        statusData:[],
        ruleForm: {
        producInfo: '',
        coiledNo: '',
        factoryId: '',
        factoryName: '',
        deptId: '',
        status: '',
        orgName:'',
        id:''
        },
        rules: { //校验
          coiledNo:[
            {
            required: true,
            message: '请填写空盘名称',
            trigger: 'change'
          }
          ],//产品信息
            crycle:[
            {
            required: true,
            message: '请填写内周长名称',
            trigger: 'change'
          } 
          ],//产品信息 
          factoryId:[
            { required: true, message: '请选择场地名称', trigger: 'change' }
          ],//产品编码....
          deptId: [
            { type:'number',required: true, message: '请选择部门名称', trigger: 'change' }
          ], //所属工艺
        status:[
            {
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }
          ],//产品信息   
        }
      }
    },
    props: ['options'],
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
      // change() {
      //   let index = this.producInfoData.findIndex((item, index) => {
      //     return this.ruleForm.producInfo == item.label;
      //   })
      //   if (index != -1) {
      //     let producInfo = this.ruleForm.producInfo;
      //     let {
      //   coiledNo,
      //   factoryId,
      //   orgName,
      //   status,
      //   id //id
      //     } = this.producInfoData[index];
      //     this.ruleForm = {
      //   producInfo,
      //   coiledNo,                                                    
      //   factoryId,
      //   orgName,
      //   status,
      //   id //id                                                                   
      //     }
      //   }

      // },
      setSelectData(data){
        let _arr = new Array();
        for(let key in data){
            _arr.push({
                label:data[key],
                value:key
            })
        }
        return _arr;
      }
 
    },
    mounted(){
       //工艺信息查询
     /*  pageForFactory({
        Vue:this
        }).then(data=>{
          this.factoryIdData = this.setSelectData1(data.model.items);
      }), */
      
       findByOrg({
        Vue: this
      }).then(data => {
        this.producInfoData=data.model;
       console.log(JSON.stringify(this.producInfoData))
      }),  
/*    findByOrg({Vue:this}).then(data=>{
          this.producInfoData= this.setSelectData(data.model);
          console.log(data.model)
      }),  */
    machineType({Vue:this}).then(data=>{
          this.statusData= this.setSelectData(data.model);
          console.log(data.model)
      })   ,
/*          pageForFactory({Vue:this}).then(data=>{
          this.factoryIdData= this.setSelectData(data.model.items);
          console.log(data.model.items)
      })      */
    pageForFactory({
       Vue: this
       }).then(data=> {
        this.factoryIdData =data.model.items;
       })     
      
    //  pageForFactory({Vue:this}).then(data=>{
    //       this.producInfoData = this.setSelectData(data.model);
    //   })
/*      pageForFactory({
        Vue: this
      }).then(data => {
        this.producInfoData = data.model;
       console.log(this.producInfoData)
      })   */
      
    },

    watch:{
            coiledNo:function(){
                this.searcBarCode=this.searcBarCode.replace(/[\W]/g,'');
            },
    },
  }

</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
    input::-webkit-outer-spin-button,    
            input::-webkit-inner-spin-button{    
                          -webkit-appearance: none !important;  
                                    }
  }


</style>
