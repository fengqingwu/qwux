<template>
  <div class="settingToastBody">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
         <el-col :span="18">
          <el-form-item label="员工工号" prop="empNo">
  <el-select v-model="ruleForm.empNo" placeholder="可输可选" :disabled="isAmount" filterable   @change="change"  maxlength="30">
              <el-option v-for="items in producInfoData" :key="items.id" :label="items.empNo" :value="items.empNo" >
              </el-option> 
            </el-select>  
          </el-form-item>
  </el-col>  

      <el-col :span="18">
          <el-form-item label="员工姓名" prop="empNo">
            <el-select v-model="ruleForm.empNo" placeholder="请选择" filterable maxlength="30">
              <el-option v-for="item in producInfoData" :key="item.id" :label="item.empName" :value="item.empNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>  

        <el-col :span="18">
          <el-form-item label="条形码" prop="barcode">
            <el-input type="text" v-model="ruleForm.barcode" :disabled="isAmount" maxlength="14"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import{
  writeAndSelect,
  addStaff 
}from '../../api/StaffMessage';
  export default {
    props: ['options', 'type'],
    data() {
       let prodNoVD = (rule, value, callback) => {
        if (!value||value.trim() === '') {
           callback(new Error('此选择为必填,请填写'));
        }else if (!/^[a-zA-Z0-9]{14}$/.test(value)) {
          callback(new Error('格式有误'));
        } else {
          callback();   
        }
      }
      return {
        isAmount:false,
        crafData:[],
        producInfoData: [],
        ruleForm: {
          empNo: '', //员工编码
          empName:'',
          barcode: ''//条形码
        },
        rules: { //校验
         empNo:[
            {
            required: true,
            message: '请输入员工工号',
            trigger: 'change',
            filterable:true
          }
          ],//员工编号
                  empName:[
            {
            required: true,
            message: '请输入员工姓名',
            trigger: 'change',
            filterable:true
          }
          ],//员工编号
 
           barcode: [
            { required: true, message: '请输入14位条形码', trigger: 'change' ,   validator: prodNoVD}
          ],//条形码
        }
      }
    },
    props: ['options'],
    methods: {
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
          return this.ruleForm.producInfo == item.value;
        })
        if (index != -1) {
          let producInfo = this.ruleForm.producInfo;
          let {
            empNo,
            staffName,
            barcode,
            id //id
        
          } = this.producInfoData[index];
          this.ruleForm = {
            producInfo,
            empNo,
            empName,
            barcode,
            id //id
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
/*          addStaff ({Vue:this}).then(data=>{
           alert(1)
          this.producInfoData = this.setSelectData(data.model.items);
      })   */
      writeAndSelect({
        Vue: this
        }).then(data => {
          this.producInfoData= data.model.items;
        })   
      /*   writeAndSelect({
        params:{}
      }).then(data=>{
        console.log(data,'--------')
        this.producInfoData=data.model.items
      })
 */
  },
/*   watch: {
        title() {
            if (this.title.length > this.titleMaxLength) {
                this.title = String(this.title).slice(0, this.titleMaxLength);
            }
        }
    } */
}

</script>
<style lang="less">
  .settingToastBody {
    padding: 0 30px 0 0;
  }

</style>

