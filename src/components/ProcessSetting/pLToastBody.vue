<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="1">
          <el-form-item label="工艺名称" prop="crafworkName">
            <el-input v-model="ruleForm.crafworkName" placeholder="请选择" filterable style="width: 222px;">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="2">
          <el-form-item label="主生产设备" prop="macType">
            <el-select v-model="ruleForm.macType" placeholder="请选择" filterable style="width: 222px;">
                <el-option v-for="item in options[0]" :key="item.id" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="工艺岗位" prop="quartersEmp">
            <el-select v-model="ruleForm.quartersEmp" placeholder="请选择" filterable style="width: 222px;">
                 <el-option v-for="item in options[1]" :key="item.model" :label="item.label.quartersDesc" :value="item.value">
                 </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <el-form-item label="单位" prop="unit">
            <el-input v-model="ruleForm.unit" placeholder="请选择" filterable style="width: 222px;">      
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: ['options'],
    data() {
      return {
        ruleForm: {
          crafworkName: '', //工艺名称
          macType: '', //主生产设备
          quartersEmp: '', //工艺岗位
          unit: '', //单位
          midProdNo:''
        },
        rules: { //校验
          crafworkName: [{required: true, message: '此选择为必填项', trigger: 'change'}], //工艺名称
          macType: [{required: true, message: '此选择为必填项', trigger: 'change'}], //主生产设备
          quartersEmp: [{required: true, message: '此选择为必填项', trigger: 'change'}], //工艺岗位
          unit: [{required: true, message: '此选择为必填项', trigger: 'change'}], //单位
          require: [], //工艺要求
          remark: [], //备注
          midProdNo:[],
          prodNo: [{required: true, message: '此选择为必填项', trigger: 'change',}] //产品信息        
        }
      }
    },
    mounted(){
          console.log(this.options,'xxxccc');
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
</style>
