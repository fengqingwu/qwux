<template>
  <div class="settingToastBody">
         <div class="xh-toast-body">
    <el-form :model="config" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row >
        <el-col >
          <el-form-item label="员工头像" class="staffMes"><img :src="config.imgUrl"/></el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="公司名称" class="staffMes">
            {{config.companyName}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="部门名称" class="staffMes">
            {{config.orgName}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="员工工号" class="staffMes">
            {{config.empNo}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="员工姓名" class="staffMes">
            {{config.empName}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="条形码" class="staffMes"><img :src="'data:image/png;base64,'+config.barcode"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
					 </div>
  </div>
</template>
<script>
  export default {
    props: ['config']
  }

</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
  }
</style>
 