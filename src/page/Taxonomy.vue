//产品分类
<template>
  <div class="Taxonomy">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="产品分类" name="first">
            <product-classification v-if="activeName=='first'"></product-classification>
      </el-tab-pane>
      <!--<el-tab-pane label="物料分类" name="second">
            <material-classification v-if="activeName=='second'"></material-classification>
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>
<script>

// import materialClassification from '../components/Taxonomy/materialClassification'
import productClassification from '../components/Taxonomy/productClassification'

export default {
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    productClassification,
    // materialClassification
  }
};
</script>
<style lang="less">
// .Taxonomy {
 
// }
</style>

