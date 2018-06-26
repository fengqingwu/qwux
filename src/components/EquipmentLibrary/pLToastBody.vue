<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="设备信息" prop="macName">
            <el-select v-model="ruleForm.macName" placeholder="请选择" :disabled="isAmount" filterable >
              <el-option v-for="item in Information" :key="item.id" :label="item.label" :value="item.devInfo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="设备分类" prop="macType">
            <el-select v-model="ruleForm.macType" placeholder="请选择" :disabled="isAmount" filterable >
              <el-option v-for="item in Library" :key="item.id" :label="item.value" :value="item.modelName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="所属部门" prop="orgId">
            <el-select v-model="ruleForm.orgId" placeholder="请选择" :disabled="isAmount" filterable >
              <el-option v-for="item in FindByOrg" :key="item.id" :label="item.orgName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="所属产地" prop="factoryId">
            <el-select v-model="ruleForm.factoryId" placeholder="请选择" :disabled="isAmount" filterable >
              <el-option v-for="item in Factory" :key="item.id" :label="item.factoryName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="品牌" prop="brand">
            <el-input type="text" v-model.trim="ruleForm.brand"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="型号" prop="spec">
            <el-input type="text" v-model.trim="ruleForm.spec"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="条形编码" prop="barcode">
            <el-input type="text" v-model.trim="ruleForm.barcode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { 
  EquipmentInsert,
  EquipmentLibrary,
  EquipmentInformation, 
  EquipmentFindByOrg,
  EquipmentFactory
  } from '../../api/productLibrary'  
  export default {
    data() {
      return {
        isAmount:false,
        Information:[],
        Library:[],
        FindByOrg:[],
        Factory:[],
        Insert:{},
        ruleForm: {
          macNo:'',
          macName: '', //设备信息
          macStatus:'',//设备状态
          macType: '', //设备分类
          orgId: '', //所属部门
          factoryId:'', //所属产地
          brand: '', //品牌
          spec: '', //型号
          barcode: '', //条形编码
        },
        rules: { //校验
          macName: [{required: true, message: '此选择为必填项', trigger: 'change'}], //设备编码
          macType: [{required: true, message: '此选择为必填项', trigger: 'change'}], //设备分类
          orgId: [{required: true, message: '此选择为必填项', trigger: 'change'}], //所属部门
          factoryId: [{required: true, message: '此选择为必填项', trigger: 'change'}], //所属产地
          brand: [{required: true, message: '此选择为必填项', trigger: 'blur'}], //品牌
          spec: [{required: true, message: '此选择为必填项', trigger: 'blur'}], //型号
          barcode: [{required: true, message: '此选择为必填项', trigger: 'blur'}], //条形编码
        }
      }
    },
    props: ['options'],
    mounted(){
      EquipmentInformation({
        Vue:this
      }).then(data=>{
        this.Information = data.model;
      }),
      EquipmentLibrary({
        Vue:this
      }).then(data=>{
        this.Library = data.model;
      }),
      // EquipmentInsert({
      //   Vue: this
      // }).then(data => {
      //   this.Insert = data.model;
      // }),
      EquipmentFindByOrg({
        Vue:this
      }).then(data=>{
        this.FindByOrg = data.model;
      }),
      EquipmentFactory({
        Vue:this
      }).then(data=>{
        this.Factory = data.model.items;
      })
    },
    methods: {
      resetForm() {
        this.$refs['ruleForm'].resetFields();
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
    }
  }

</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
  }

</style>
