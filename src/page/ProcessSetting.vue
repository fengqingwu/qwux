//工艺设置
<template>
  <div class="productLibrary">
        <el-tabs type="border-card">
      <el-tab-pane label="工艺设置">
        <!-- 搜索 -->
        <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
        <!--  表格 -->
        <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add"
          @remove="remove" @edit="edit" @buttonFunction='buttonFunction'></mes-table>
        </el-tab-pane>
    </el-tabs>
    <!-- 仓储设置or修改 -->
    <mes-toast :config="toastData" @close="close" @save="save" @saveAgain="saveAgain" @handleClose="close">
      <!-- 弹窗内容 -->
      <p-l-toast-body ref="ToastBody" :options="[search.searchConfig[0][0].childrens,
                                                 search.searchConfig[0][1].childrens,
                                                 midProdNoSelect]"></p-l-toast-body>
    </mes-toast>

     <!-- 工艺参数设置 -->
    <mes-toast :config="toastInfoData"  @close="closes" @save="saves" @handleClose="close">
      <!-- 弹窗内容 -->
      <p-w-toast-body :rowData="rowData" ref="ToastBodys"></p-w-toast-body>
    </mes-toast>

  </div>
</template>
<script>
import {
  pageForCrack, //分页查询page
  insert,  //新增工艺设置
  update, //编辑
  remove,//删除
  findById,//根据id查询工艺
  findByQuar,//工艺岗位
  machineType,//获取机联网设备
  updateParam,//工艺参数设置
  listMidProduct,
} from "../api/ProcessSetting";
import {productlist} from '../api/index';
import pLToastBody from "../components/ProcessSetting/pLToastBody";
import pWToastBody from "../components/ProcessSetting/pWToastBody";
export default {
  data() {
    return {
       rowData:{},// 设置参数的当前行数据.....     
      toastType: "",
      lookInfoData: {},
      midProdNoSelect:[],
      toastData: {
        title: "新增产品", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "450px", //弹窗宽
        btnData: []
      },
        toastInfoData: {
        title: "工艺参数设置", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "450px", //弹窗宽
        btnData: [
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
        ]
      },
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
      search: {
        searchData: {},
        searchConfig: [
          [
            {
              label: "工艺名称",
              field: "crafworkName",
              type: "input",
              childrens:[]
            },
            {
              label: "主生产设备",
              field: "macType",
              type: "input",
              childrens:[]
            }
          ]
        ]
      },
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
            name: "编辑",
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
            field: "crafworkName",
            label: "工艺名称",
            type: "text"
          },
          {
            field: "macType",
            label: "主生产设备",
            type: "text"
          },
          {
            field: "quartersEmp",
            label: "工艺岗位",
            type: "text"
          },
          {
            field: "unit",
            label: "计量单位",
            type: "text"
          },
          {
            field: "工艺参数设置",
            label: "操作",
            type: "btnText"
          }
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
      tableData: []
    };
  },
  mounted() {
      //产品下拉
      productlist({Vue:this}).then(data=>{
          this.search.searchConfig[0][1].childrens = data.model;
      })
      //根据id查询工艺
      findByQuar({Vue:this}).then(data=>{
          this.search.searchConfig[0][1].childrens = this.setSelectData(data.model);
      })
      //获取机联网设备
      machineType({Vue:this}).then(data=>{
          this.search.searchConfig[0][0].childrens = this.setSelectData(data.model);
      })
      
      listMidProduct({Vue:this}).then(data=>{
         this.midProdNoSelect = data.model;
      })
    //获取表格数据
    this.getDate();
  },
  methods: {
    saves(){
       // console.log(this.$refs['ToastBodys']) 
       this.$refs['ToastBodys'].submitForm(this.eidtOperations.bind(this,true));

       
         let params = this.$refs['ToastBodys'].settingData;
          params.listParam =  params.listParam.filter(item=>{
          return item.param !==''
      })
      // listMidProduct({Vue:this,params:{}}).then((data)=>{
           
      // })
    },
    buttonFunction(data) {
      //表格单行末尾工艺设置
      this.toastInfoData.dialogVisible = true;
      this.rowData = data;
      console.log(data);
    },
    add() {
      //新增
      // debugger;
      this.toastData.title = "新增工艺设置";
      this.toastData.btnData = this.toastSettingBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "add";
    },
    edit() {
      //编辑
      this.toastData.title = "工艺设置编辑";
      this.toastData.btnData = this.toastEditBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "edit";
      if (this.toastType == "edit") {
        setTimeout(() => {
          let {
          crafworkName,
          macType,
          unit,
          quartersEmp,
          operaTion,
            id
          } = this.tableConfig.currentSelectArr[0];
          this.$refs["ToastBody"].ruleForm = {
          crafworkName,
          macType,
          unit,
          quartersEmp,
          operaTion,
            id
          };
        }, 0);
      }
    },
    save() {
     //  debugger;
      if (this.toastType == "edit") {
        //编辑
        this.$refs['ToastBody'].submitForm(this.eidtOperation.bind(this,true));
      } else {
        //新增
        this.$refs['ToastBody'].submitForm(this.addOperation.bind(this,true));
      }
    },
    saveAgain() {
      this.$refs['ToastBody'].submitForm(this.addOperation.bind(this));
    },
    eidtOperation() {
      //编辑实际操作
      let ToastBody = this.$refs["ToastBody"];
      let params = ToastBody.ruleForm;
      update({ Vue: this, params: this.setAttr(params) }).then(data => {
        this.$message({
          message: data.message,
          type: "success"
        });
        ToastBody.resetForm();
        this.toastData.dialogVisible = false;
        this.getDate(this.search.searchData);
      });
    },
     eidtOperations() {
      //工艺参数设置
      let ToastBodys = this.$refs["ToastBodys"];
      let params = ToastBodys.settingData;
      updateParam({ Vue: this, params: this.setAttr(params) }).then(data => {
        this.$message({
          message: data.message,
          type: "success"
        });
        ToastBodys.resetForm();
        this.toastInfoData.dialogVisible = false;
        this.getDate(this.search.searchData);
      });
    },
    addOperation(flag) {
      //新增实际操作
      //debugger;
      let ToastBody = this.$refs["ToastBody"];
      let params = ToastBody.ruleForm;
      delete params["id"];
      insert({ Vue: this, params: this.setAttr(params) }).then(data => {
        this.$message({
          message: data.message,
          type: "success"
        });
        ToastBody.resetForm();
        if (flag) {
          this.toastData.dialogVisible = false;
        }
        this.getDate(this.search.searchData);
      });
    },
    close() {
      //关闭弹窗
      this.$refs["ToastBody"].resetForm();
      this.toastData.dialogVisible = false;
    },
     closes() {
      //关闭弹窗
      this.$refs["ToastBodys"].resetForm();
      this.toastInfoData.dialogVisible = false;
    },
    searchList(data) {
      //查询数据
      this.tableConfig.pageNo = 1;
      let params = this.setAttr(data);
      this.getDate(params);
    },
    sizeChange() {
      //分页size变化
      this.getDate(this.search.searchData);
    },
    pageChange() {
      //分页page变化
      this.getDate(this.search.searchData);
    },
    remove() {
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
          remove({
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
            this.getDate(this.search.searchData); //刷新数据
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getDate(data = {}) {
      //获取分页数据
      data.pageNo = this.tableConfig.pageNo;
      data.pageSize = this.tableConfig.pageSize;
      pageForCrack({
        params: this.setAttr(data),
        Vue: this
      }).then(data => {
        // debugger;
         this.tableData = data.model.items;
         this.tableConfig.total = data.model.numRows;
         this.tableConfig.loadShow = false;
      });
    },
    setAttr(data) {
      for (let attr in data) {
        if (!data[attr]) {
          delete data[attr];
        }
      }
      return data;
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
  },
  components: {
    pLToastBody,
    pWToastBody
  }
};
</script>

