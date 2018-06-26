<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="产品信息" prop="producInfo">
            <el-select v-model="ruleForm.producInfo" placeholder="请选择" filterable @change="change">
              <el-option v-for="item in producInfoData" :key="item.id" :label="item.label" :value="item.prodNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="盘头组编码" prop="midProdNo" >
            <el-input type="text" v-model.trim="ruleForm.midProdNo" maxlength="10"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上级编码" prop="prodNo">
            <el-select v-model="ruleForm.prodNo" placeholder="请选择" filterable >
              <el-option v-for="item in prodNo" :key="item.id" :label="item.label.parentNo" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="来源" prop="factoryType">
            <el-select v-model="ruleForm.factoryType" filterable placeholder="请选择" >
               <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
               </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属工艺" prop="transVal(craftworkMsg)">
            <el-select v-model="ruleForm.craftworkMsg" placeholder="请选择" filterable >
              <el-option v-for="item in options[1]" :key="item.id" :label="item.model" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        </el-col>
        <el-col :span="8">
          <el-form-item label="参数" prop="param">
            <el-input type="text" v-model.trim="ruleForm.param"></el-input>
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
          <el-form-item label="数量" prop="amount">
            <el-input-number type="number" v-model.trim="ruleForm.amount" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计量单位" prop="unit">
            <el-input type="text" v-model.trim="ruleForm.unit" ></el-input> 
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="材质" prop="material">
            <el-input type="text" v-model.trim="ruleForm.material"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="等级" prop="level">
            <el-input type="text" v-model.trim="ruleForm.level"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :rows="3" v-model.trim="ruleForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import {
    productlist
  } from '../../api/index'
  import {
  findByQuar,
  listMidProduct
} from "../../api/ProcessSetting";
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
        prodNo:[], // 上级编码
        producInfoData: [],
        ruleForm: {
          producInfo: '',
          midProdNo:'',//盘头组编码
          mattersTypeId: '', //所属分类
          crafworkStructId: '', //所属工艺
          param: '', //参数
          modelDesc: '', //型号
          norms: '', //规格
          unit: '', //计量单位
          material: '', //材质
          level: '', //等级
          amount:'',
          remark: '' //备注
        },
        options1: [{  //来源的下拉
          value: '选项1',
          label: '本厂'
        }, {
          value: '选项2',
          label: '外协'
        }],
        factoryType: '',


        rules: { //校验
          producInfo:[
            {
            required: true,
            message: '请选择产品',
            trigger: 'change'
          }
          ],//产品信息
          midProdNo:[
            { required: true, message: '请输入产品编码', trigger: 'blur' }
          ],//产品编码....
          mattersTypeId: [], //所属分类
          crafworkStructId: [
            { required: false, message: '请选择所属工艺', trigger: 'change' }
          ], //所属工艺
          param: [], //参数
          modelDesc: [], //型号
          norms: [], //规格
          rockPosition: [], //仓储位置
          factorySetId: [], //生产场地
          amount:[
            { required: true, message: '请输入数量', trigger: 'blur' }
          ],//数量
          unit: [
            { required: true, message: '请输入计量单位', trigger: 'blur' }
          ], //计量单位
          material: [], //材质
          level: [], //等级
          remark: [] //备注      
        }
      }
    },
    props: ['options'],
    methods: {
      /***更改下拉列表项格式***/
      transVal( val ){
        return  ','+(val.split('').join(',').trim())+','
      },
      handlelink(){
        
       ruleForm.crafworkStructId= ruleForm.crafworkStructId.split('').join(",")
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
    },
    mounted() {
      //工艺信息查询
      findByQuar({Vue:this}).then(data=>{
          this.crafData = this.setSelectData(data.model);
          
      })
       //分页查询产品编码
      listMidProduct({Vue:this}).then(data=>{
          this.prodNo = this.setSelectData(data.model);
      })
      productlist({
        Vue: this
      }).then(data => {
        this.producInfoData = data.model;
      })
    }
  }

</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
  }

</style>
