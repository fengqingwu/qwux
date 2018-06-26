<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="物料名称:" prop="mattersName">
            <el-input type="text" size="mini" v-model.trim="ruleForm.mattersName" :maxlength="21"@change="checkNum('mattersName',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属分类:" prop="mattersTypeId">
            <el-select v-model="ruleForm.mattersTypeId" size="mini" placeholder="请选择">
              <el-option v-for="item in options.materName" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="参数:" prop="param">
            <el-input type="text" size="mini" :maxlength="401" v-model.trim="ruleForm.param" @change="checkNum('param',400)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产厂商:" prop="factory">
            <el-input type="text" size="mini" :maxlength="401" v-model.trim="ruleForm.factory" @change="checkNum('factory',400)"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="型号:" prop="modelDesc">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.modelDesc" @change="checkNum('modelDesc',20)"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="规格:" prop="norms">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.norms" @change="checkNum('norms',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="材质:" prop="material">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.material"  @change="checkNum('material',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="等级:" prop="level">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.level"  @change="checkNum('level',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌:" prop="brand">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.brand"@change="checkNum('brand',20)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:" prop="status">
            <el-select v-model="ruleForm.status" size="mini" placeholder="请选择">
              <el-option v-for="item in options.marStatus" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="版本号:" prop="versions">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.versions" @change="checkNum('versions',20)"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="单位:" prop="unit">
            <el-input type="text" size="mini" :maxlength="21" v-model.trim="ruleForm.unit"  @change="checkNum('unit',20)"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="单位重量:" prop="weight">
            <el-input type="number" size="mini" :maxlength="21" v-model.trim="ruleForm.weight"  @change="checkNum('weight',20)"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="24">
          <el-form-item label="描述:" prop="desc">
            <el-input type="textarea" size="mini"  :maxlength="41" :rows="3" v-model.trim="ruleForm.desc" @change="checkNum('desc',40)"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: ['options', 'type'],
    data() {
    //  let prodNoVD = (rule, value, callback) => {
    //     if (!value||value.trim() === '') {
    //        callback(new Error('此选择为必填,请填写'));
    //     }else if (!/^[a-zA-Z0-9]{10}$/.test(value)) {
    //       callback(new Error('格式有误'));
    //     } else {
    //       callback();   
    //     }
    //   }
      return {
        isAmount:false,
        crafData:[],
        producInfoData: [],
        ruleForm: {
          mattersName: "",
          mattersTypeId: "",
          param: "",
          factory: "",
          modelDesc: "",
          norms: "",
          material: "",
          level:  "",
          brand:  "",
          status:  "",
          versions: "",
          unit: "",
          weight: "",
          desc:  "",

          //mattersNo: '',
          // midProdNo:'',//盘头组编码
          // mattersTypeId: '', //所属分类
          // crafworkStructId: '', //所属工艺
          // param: '', //参数
          // modelDesc: '', //型号
          // norms: '', //规格
          // unit: '', //计量单位
          // material: '', //材质
          // level: '', //等级
          // amount:'',
          // remark: '' //备注
        },
        rules: { //校验
          mattersName: [{required: true,message: '物料名称不能为空',trigger: 'blur' }],//物料名称
          mattersTypeId: [{required: true, message: '请选择所属分类', trigger: 'change'}],
          param: [{required: true,message: '物料参数不能为空',trigger: 'blur' }],
          factory: [{required: true,message: '生产厂商不能为空',trigger: 'blur' }],
          modelDesc:[],
          norms:[],
          material: [],
          level: [],
          brand: [],
          status: [{required: true, message: '请选择物料状态', trigger: 'change'}],
          versions: [],
          unit: [{required: true,message: '物料单位不能为空',trigger: 'blur' }],
          weight: "",
          desc: []
        }
      }
    },
    props: ['options'],
    created(){
      //test.....................
       // this.ruleForm={
       //    mattersName: "测试",
       //    mattersTypeId: "2",
       //    param: "测试"+Math.random(),
       //    factory: "测试"+Math.random(),
       //    modelDesc: "测试"+Math.random(),
       //    norms: "测试"+Math.random(),
       //    material: "测试"+Math.random(),
       //    level:  "测试"+Math.random(),
       //    brand:  "测试"+Math.random(),
       //    status:  "1",
       //    versions: "1.0.0",
       //    unit: "kg",
       //    weight: "10",
       //    desc:  "测试"+Math.random()
       //  }
    },
    methods: {
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
      },


      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
      submitForm(fun) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
              fun();
          } else {
            return false;
          }
        });
      },//表单验证.....
      change() {
        let index = this.producInfoData.findIndex((item, index) => {
          return this.ruleForm.producInfo == item.prodNo;
        })
        if (index != -1) {
          let producInfo = this.ruleForm.producInfo;
          let {
            mattersTypeId, //所属分类1
            crafworkStructId, //所属工艺
            param, //参数
            modelDesc, //型号
            norms, //规格
            amount,//数量
            unit, //计量单位
            material, //材质1
            level, //等级1
            remark, //备注
            prodNo, //产品编号
            prodName, //产品名称
            id //id
          } = this.producInfoData[index];
          this.ruleForm = {
            producInfo,
            mattersTypeId, //所属分类1
            crafworkStructId, //所属工艺
            param, //参数
            modelDesc, //型号
            norms, //规格
            amount,//数量
            unit, //计量单位
            material, //材质1
            level, //等级1
            remark, //备注
            prodNo, //产品编号
            prodName, //产品名称
            id
          }
        }

      },
      setSelectData(data){
        let _arr = new Array();
        for(let key in data){
            _arr.push({
                label:data[key],
                value:key
            })
        }
        return _arr;
    }
    }
    //,
    // mounted() {
    //   //工艺信息查询
    //   crafworkTaskEmp({Vue:this}).then(data=>{
    //       this.crafData = this.setSelectData(data.model);
    //   })
    //   productlist({
    //     Vue: this
    //   }).then(data => {
    //     this.producInfoData = data.model;
    //   })
    // }
  }

</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
  }

</style>
