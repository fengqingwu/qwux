//物料分类设置
<template>
 <div class="box">
    <el-tabs type="border-card" v-model="activeName">
      <!-- tab -->
      <el-tab-pane label="物料分类设置" name="one">
          <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add"
          @remove="remove" @edit="edit" @buttonFunction="buttonFunction"></mes-table>
      </el-tab-pane>
    </el-tabs>
      <mes-toast :config="toastData" @close="closeToast" @save="save" @saveAgain="saveAgain" @handleClose="closeToast">
        <el-row>
            <el-form span="24" :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">      
            <el-col span="20">
              <el-form-item label="分类名称:" prop="typeName">
                <el-input type="text" size="mini" placeholder="请输入分类名称" :maxlength="20" v-model.trim="ruleForm.typeName"  @change="checkNum('typeName',20)"></el-input>
                </el-form-item>
            </el-col>
            <el-col span="20">
              <el-form-item label="描述:" prop="remark">
                <el-input type="textarea" size="mini"  placeholder="请输入物料分类描述" :maxlength="41" :rows="3" v-model.trim="ruleForm.remark" @change="checkNum('remark',40)"></el-input>
              </el-form-item>
            </el-col>
             </el-form>
        </el-row>
      </mes-toast>
 </div> 
</template>
<script>
  import {
      findPageMatterType,
      addMatterType,
      editMatterType,
      removeMatterType
  } from "../api/MaterialClassification"
export default{
  data(){
    return {
      // formdata
      ruleForm:{
          id: undefined,  
          typeName: undefined,
          remark: undefined
      },
      // tab
      activeName:'one',
      // 表格
      tableConfig: {
        //操作按钮配置
        toolbarConfig: [
          {
            icon: "circle-plus",
            disabled: false,
            method: "add",
            name: "新增",
            type:'primary'
          },
          {
            icon: "edit",
            disabled: true,
            method: "edit",
            name: "编辑"
          },
          {
            icon: "remove",
            disabled: true,
            method: "remove",
            name: "删除"
          }
        ],
        //表格字段配置
        colConfig: [
          {
            field: "typeNo",
            label: "分类编码",
            type: "text"
          },
          {
            field: "typeName",
            label: "分类名称",
            type: "text"
          },
          {
            field: "remark",
            label: "备注",
            type: "text"
          }//,
         // { field: "查看详情", label: "操作", type: "btnText" }
        ],
        isSelection: true, //是否可选
        isPage: true, //是否分页
        currentSelectArr: [], //当前勾选的数据
        align: "center", //文本对齐方式
        pageNo: 1,
        pageSize: 20,
        total: 0,
        isHigh: false,
        isLoading: true, //是否开启loading
        loadShow: false //loading控制
      },
      tableData: [],
      //对话框配置
      toastData: {
        title: "新增物料分类", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "500px", //弹窗宽
        btnData: []
      },
      isAmount: false,
      rules: { //校验
          typeName: [{required: true, message: '分类名称不能为空',trigger: 'blur'}]
      },
      toastType: "",
       toastSettingBtn: [
          {
            name: "取消", //按钮名
            method: "close", //回调函数
            bgColor: "dialog-white" //按钮背景
          },
          {
            name: "保存",
            method: "save",
            bgColor: "dialog-deep-blue"
          },
          {
            name: "保存并继续",
            method: "saveAgain",
            bgColor: "dialog-bule"
          }
        ],
        toastEditBtn: [
          {
            name: "取消", //按钮名
            method: "close", //回调函数
            bgColor: "dialog-white" //按钮背景
          },
          {
            name: "修改",
            method: "save",
            bgColor: "dialog-deep-blue"
          }
        ],


    }
  },
  methods:{
    // 验证
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
    // 页面
    sizeChange(){
      this.getData({})
    },
    pageChange(){
      this.getData({})
    },
    // 新增物料
    add(){
      //新增
      this.toastData.title = "新增物料分类";
      this.toastData.btnData = this.toastSettingBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "add";
      setTimeout(()=>{
         this.isAmount = false;
      },0)
    },
    remove(){
      //删除
      let len = this.tableConfig.currentSelectArr.length - 1;
      let ids = "";
      //判断删除的size是否等于当前页的数量
      this.tableConfig.currentSelectArr.forEach((item, index) => {
        ids += len === index ? item.id : item.id + ",";
      });
      let flag =
        this.tableData.length === this.tableConfig.currentSelectArr.length;
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeMatterType({
            Vue: this,
            params: {
              ids
            }
          }).then(data => {
            this.$message({
              message: data.message,
              type: "success"
            });
            //回到上一页
            if (flag) {
              this.tableConfig.pageNo +=
                this.tableConfig.pageNo - 1 >= 1 ? -1 : 0;
            }
            this.getData();//刷新数据
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(){
 //编辑
      this.toastData.title = "编辑物料";
      this.toastData.btnData = this.toastEditBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "edit";
      if (this.toastType == "edit") {
        setTimeout(() => {
          let {
          id,  
          typeName,
          remark
          } = this.tableConfig.currentSelectArr[0];
          this.ruleForm = {
            id,  
            typeName,
            remark
          };
          for(let o in this.ruleForm){
            if(this.ruleForm[o] == '-')this.ruleForm[o]='';
          }

        }, 0);
        this.isAmount = true;
      }
    },
    buttonFunction(){
      console.log("buttonFunction")
    },
    setAttr(data) {
      for (let attr in data) {
        if (null==data[attr]) {
          delete data[attr];
        }
      }
      return data;
    },
    fillData(row){
        let arr={};
        for(let a in this.tableConfig.colConfig){
          if(null == row[this.tableConfig.colConfig[a].field])row[this.tableConfig.colConfig[a].field]='-';
        }
        return row;
      },
    //获取页面数据
    getData(data = {}){      
      let that = this;
      //获取分页数据
      data.pageNo = that.tableConfig.pageNo;
      data.pageSize = that.tableConfig.pageSize;
      findPageMatterType({
        params: that.setAttr(data),
        Vue: that
      }).then(data => {
        for(let b in data.model.items){
            that.fillData(data.model.items[b]);
          }
        that.tableData = data.model.items;
        // console.log(JSON.stringify(data.model.items));
        that.tableConfig.total = data.model.numRows;
        that.tableConfig.loadShow = false;
      });
    },
    closeToast(){
      this.toastData.dialogVisible=false;
    },
    save(){
      if (this.toastType == "edit") {
        //编辑
        this.submitForm(this.eidtOperation.bind(this));
      } else {
        //新增
        this.submitForm(this.addOperation.bind(this,true));
      }
    },
    saveAgain(){
         this.submitForm(this.addOperation.bind(this));
    },
    eidtOperation() {
      //编辑实际操作
      let ToastBody = this;
      let params = this.ruleForm;
      editMatterType({ Vue: this, params: this.setAttr(params) }).then(data => {
        this.$message({
          message: data.message,
          type: "success"
        });
        ToastBody.resetForm();
        this.toastData.dialogVisible = false;
        this.getData({});
      });
    },
    //添加新数据
    addOperation(flag) {
      //新增实际操作
      let that = this;
      let params = this.ruleForm;
      delete params["id"];
      // console.log(JSON.stringify('params:==>', {typeremark: params.typeName, remark: params.remark}),"=====")
      // console.log(JSON.stringify(params),"<===params")
      // that.setAttr(params)
      //{typeremark: params.typeName, remark: params.remark}
      addMatterType({ Vue: that, params: {typeName: params.typeName, remark: params.remark} }).then(data => {
        this.$message({
          message: data.message,
          type: "success"
        });
        that.resetForm();
        if (flag) {
          this.toastData.dialogVisible = false;
        }
        this.getData({});
      });
    },

    handleClose(){
      this.toastData.dialogVisible=false;
    },
    // 表单相关
    resetForm() {
      let that=this;
      setTimeout(function(){
        that.$refs['ruleForm'].resetFields();
      },0)
    },
    submitForm(fun) {
      let that=this;
      setTimeout(function(){
        that.$refs['ruleForm'].validate((valid) => {
        if (valid) {
            fun();
        } else {
          return false;
        }
      });
      })      
    }
  },
  created(){
      this.getData({})
  },
    watch: {
    "tableConfig.currentSelectArr": function() {
      //按钮控制
      if (this.tableConfig.currentSelectArr.length == 1) {
        this.tableConfig.toolbarConfig[1].disabled = false;
        this.tableConfig.toolbarConfig[2].disabled = false;
      } else if (this.tableConfig.currentSelectArr.length > 1) {
        this.tableConfig.toolbarConfig[1].disabled = true;
        this.tableConfig.toolbarConfig[2].disabled = false;
      } else {
        this.tableConfig.toolbarConfig[1].disabled = true;
        this.tableConfig.toolbarConfig[2].disabled = true;
      }
    }
  }
}  
</script>
<style scoped>
  .demo-ruleForm{
    width:100%;
    height:auto;
  }
</style>
