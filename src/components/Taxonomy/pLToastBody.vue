<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="分类名称" prop="typeDesc">
            <el-input type="text" v-model.trim="ruleForm.typeDesc" :maxlength="20"></el-input>
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
          typeDesc: ''
        },
        rules: { //校验
          typeDesc: [{required: true, message: '请输入分类名称', trigger: 'change'}], //产品名称
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
