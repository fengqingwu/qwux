<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="物料编码" prop="mattersNo">
            <el-input type="text" size="mini" :disabled="isType" v-model.trim="ruleForm.mattersNo" :maxlength="10"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物料名称" prop="mattersName">
            <el-input type="text" size="mini" v-model.trim="ruleForm.mattersName" :maxlength="21"@change="checkNum('mattersName',20)"></el-input>
          </el-form-item>
        </el-col>
        <!-- waiting -->
     <!--    <el-col :span="8">
          <el-form-item label="产品名称" prop="mattersName">
            <el-input type="text" size="mini" v-model.trim="ruleForm.mattersName" :maxlength="21"@change="checkNum('mattersName',20)"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="参数" prop="param">
            <el-input type="text" size="mini" :maxlength="401" v-model.trim="ruleForm.param" @change="checkNum('param',400)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="型号" prop="modelDesc">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.modelDesc" @change="checkNum('modelDesc',20)"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="规格" prop="norms">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.norms" @change="checkNum('norms',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位" prop="unit">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.unit"  @change="checkNum('unit',20)"></el-input>
          </el-form-item>
        </el-col>        
        <el-col :span="8">
          <el-form-item label="生产厂商" prop="factory">
            <el-select v-model="ruleForm.factory" size="mini" placeholder="请选择">
              <el-option v-for="item in options[0]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="物料分类" prop="mattersTypeId">
            <el-select v-model="ruleForm.mattersTypeId" size="mini" placeholder="请选择">
              <el-option v-for="item in options[0]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓库名" prop="storeSetId">
            <el-select v-model="ruleForm.storeSetId" size="mini" placeholder="请选择">
              <el-option v-for="item in options[1]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>   
      
        <el-col :span="8">
          <el-form-item label="库存数量" prop="curAmount">
            <el-input-number size="mini" disabled :controls="false"  style="width:100%" placeholder="请输入数量" :min="0" :max="10000000" v-model.trim="ruleForm.curAmount"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌" prop="brand">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.brand"@change="checkNum('brand',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="材质" prop="material">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.material"  @change="checkNum('material',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="等级" prop="level">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.level"  @change="checkNum('level',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="安全库存" prop="secureStock">
            <el-input-number size="mini" :controls="false" style="width:100%" placeholder="请输入数量" :min="0"  v-model.trim="ruleForm.secureStock" @blur="check()"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select v-model="ruleForm.status" size="mini" placeholder="请选择">
              <el-option v-for="item in options[2]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="版本号" prop="versions">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.versions" @change="checkNum('versions',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="描述" prop="desc">
            <el-input type="textarea" size="mini"  :maxlength="41" :rows="3" v-model.trim="ruleForm.desc" @change="checkNum('desc',40)"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["options"],
  data() {

           var validateNo= (rule, value, callback) => {
        if(value==''){
          return  callback(new Error('此项为必填项'));
        }
        if (!/[a-zA-Z0-9]{10}/.test(value)) {
          callback(new Error('格式有误,请重新输入'));
        } else {
          callback();
        }
      };

    return {
      isType:false,
      ruleForm: {
        mattersNo:'',
        mattersName: "",
        mattersTypeId: "",
        status: "",
        norms: "",
        param: "",
        modelDesc: "",
        factory:"",
        brand: "",
        material: "",
        level: "",
        unit: "",
        curAmount: 0,
        desc: "",
        versions: "",
        storeSetId: "", //仓库名
        secureStock: undefined
      },
      rules: {
        mattersNo:[{
          required: true,
         validator:validateNo,
         trigger: 'blur'
        }],
        //校验
        mattersName: [
          {
            required: true,
            message: "此项为必填项",
            trigger: "change"
          }
        ], //物料名称
        mattersTypeId: [
          {
            required: true,
            message: "此项为必填项",
            trigger: "change"
          }
        ], //物料分类
        status: [], //状态
        norms: [
          {
            required: true,
            message: "此项为必填项",
            trigger: "change"
          }
        ], //规格
        param: [
          {
            required: true,
            message: "此项为必填项",
            trigger: "change"
          }
        ], //参数
        modelDesc: [], //型号
        brand: [], //品牌
        material: [], //材质
        level: [], //等级
        unit: [], //单位
        curAmount: [
          {
            required: true,
            message: "此项为必填项",
            trigger: "change"
          }
        ], //库存数量
        desc: [], //描述
        versions: [], //版本号
        secureStock: [], //安全库存
        storeSetId: [
          {
            required: true,
            message: "此项为必填项",
            trigger: "change"
          }
        ] //仓库名
      }
    };
  },
  props: ["options"],
  methods: {
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    },
    validateForm(func) {
      let _this = this;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          func();
        } else {
          this.$message({
            message: "请把信息填写完整",
            type: "error"
          });
          return false;
        }
      });
    },
    check(key) {
      if (this.ruleForm.curAmount < this.ruleForm.secureStock) {
        this.$message({
          message: "当前库存量不得低于安全库存量",
          type: "error"
        });
      }
    },
    checkNum(key, num) {
      if (this.ruleForm[key].length > num) {
        this.$message({
          message: "输入内容长度超出限制",
          type: "error"
        });
        this.ruleForm[key] = this.ruleForm[key].substring(
          0,
          this.ruleForm[key].length - 1
        );
      }
    }
  }
};
</script>
<style lang="less">
.settingToastBody {
  padding: 0 30px 0 0;
}
</style>
