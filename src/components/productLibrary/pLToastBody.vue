<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="产品编码" prop="prodNo">
            <el-input type="text" v-model.trim="ruleForm.prodNo" maxlength="10"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="prodName">
            <el-input type="text" v-model.trim="ruleForm.prodName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产场地" prop="factorySetId">
            <el-select v-model="ruleForm.factorySetId" placeholder="从场地设置中选" filterable>
                 <el-option v-for="item in options[1]" :key="item.models" :label="item.factoryName" :value="item.id">
                 </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="参数" prop="param">
            <el-input type="text" v-model.trim="ruleForm.param"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="型号" prop="modelDesc">
            <el-input type="text" v-model.trim="ruleForm.modelDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格" prop="norms">
            <el-input type="text" v-model.trim="ruleForm.norms"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分类" prop="mattersTypeId">
            <el-select v-model="ruleForm.mattersTypeId" placeholder="从产品分类取" filterable>
                 <el-option v-for="item in options[2]" :key="item.model" :label="item.label" :value="item.value">
                 </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计量单位" prop="unit">
            <el-input type="text" v-model.trim="ruleForm.unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="等级" prop="level">
            <el-input type="text" v-model.trim="ruleForm.level"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="材质" prop="material">
            <el-input type="text" v-model.trim="ruleForm.material"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="当前库存量" prop="curAmount">
            <el-input-number v-model="ruleForm.curAmount" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3"></el-input>
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
      let prodNoVD = (rule, value, callback) => {
        if (!value||value.trim() === '') {
           callback(new Error('此选择为必填,请填写'));
        }else if (!/^[a-zA-Z0-9]{10}$/.test(value)) {
          callback(new Error('格式有误'));
        } else {
          callback();   
        }
      }
      return {
        ruleForm: {
          prodNo: '',
          prodName: '',
          norms: '',
          param: '',
          modelDesc: '',
          mattersTypeId: '', //所属分类
          factorySetId: '',//生产场地
          unit: '',
          level: '',
          material: '',
          prodStatus: '',
          curAmount: '',
          remark: ''
        },
        rules: { //校验
          prodNo: [{
            required: true,
            validator: prodNoVD,
            trigger: 'change'
          }], //s
          prodName: [{
            required: true,
            message: '此选择为必填,请填写',
            trigger: 'change'
          }], //产品名称s
          norms: [], //规格
          param: [], //参数
          modelDesc: [], //型号
          mattersTypeId: [], //所属分类
          factorySetId:[],//生产场地
          unit: [{
            required: true,
            message: '此选择为必填,请填写',
            trigger: 'change'
          }], //计量单位s
          level: [], //等级
          material: [], //材质
          prodStatus: [], //产品状态
          curAmount: [], //当前库存量
          remark: [] //备注        
        }
      }
    },
    mounted(){
      console.log("this.options" , this.options )
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
