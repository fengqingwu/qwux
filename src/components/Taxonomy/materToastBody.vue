<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="分类名称" prop="typeName">
            <el-input type="text" v-model.trim="ruleForm.typeName" :maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3" :maxlength="40"></el-input>
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
          typeName: '',
          remark: ''
        },
        rules: { //校验
          typeName: [{required: true, message: '请输入分类名称', trigger: 'change'} ], //产品名称
          remark: [] //备注        
        }
      }
    },
    props: ['options'],
    methods: {
    submitForm(fun) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
             fun();
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    }
  }

</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
  }

</style>
