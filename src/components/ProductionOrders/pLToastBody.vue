<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="产品信息" prop="prodNo">
            <el-select v-model="ruleForm.prodNo" placeholder="请选择" filterable >
              <el-option v-for="item in options[0]" :key="item.id" :label="item.label.prodNo" :value="item.prodNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备编码" prop="macNo">
            <el-select v-model="ruleForm.macNo" placeholder="请选择" filterable >
              <el-option v-for="item in options[1]" :key="item.id" :label="item.label.code" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备名称" prop="modelName">
            <el-select v-model="ruleForm.modelName" placeholder="请选择设备编码" filterable>
              <el-option v-for="item in options[1]" :key="item.id" :label="item.label.devName" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工艺名称" prop="craftworkMsg">
            <el-select v-model="ruleForm.craftworkMsg" placeholder="请选择" filterable >
              <el-option v-for="item in options[2]" :key="item.id" :label="item.model" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="半成品编码" prop="midProdNo">
            <el-select v-model="ruleForm.midProdNo" placeholder="请选择" filterable >
              <el-option v-for="item in options[0]" :key="item.id" :label="item.label.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="数量" prop="amount">
            <el-input-number type="number" v-model.trim="ruleForm.amount" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="作业日期" prop="taskDate">
            <el-date-picker v-model="ruleForm.taskDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始时间" prop="starTime">
            <el-date-picker v-model="ruleForm.starTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="13">
          <el-form-item label="备注" prop="remark">
            <el-input v-model.trim="ruleForm.remark" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="工艺要求" prop="require">
            <el-input v-model.trim="ruleForm.require" type="textarea" :rows="3"></el-input>
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
          macNo: '', //设备编码
          taskDate: '', //作业日期
          starTime: '', //开始时间
          endTime: '', //结束时间
          midProdNo: '',//半成品编码1111
          crafworkId: '', //半成品编码
          amount: '', //数量
          require: '', //工艺要求
          remark: '', //备注
          prodNo: '' //产品信息
        },
        rules: { //校验
          macNo: [], //设备编码
          taskDate: [], //作业日期
          starTime: [], //开始时间
          endTime: [], //结束时间
          midProdNo: [],//半成品编码11111
          crafworkId: [], //半成品编码
          amount: [], //数量
          require: [], //工艺要求
          remark: [], //备注
          prodNo: [] //产品信息        
        }
      }
    },
    methods: {
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
