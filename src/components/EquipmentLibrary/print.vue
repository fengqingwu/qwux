<template>
  <div class="settingToastBody">
         <div class="xh-toast-body">
    <el-form :model="config" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row >
        <el-col >
          <el-form-item label="设备信息" class="staffMes">{{ config.macName }}</el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="设备分类" class="staffMes">
            {{config.macType}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="所属部门" class="staffMes">
            {{config.orgName}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="型号" class="staffMes">
            {{config.spec}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="品牌" class="staffMes">
            {{config.brand}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="设备状态" class="staffMes">
            {{config.macStatus}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="条形编码" class="staffMes"><img :src="'data:image/png;base64,'+config.image"/>
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
 