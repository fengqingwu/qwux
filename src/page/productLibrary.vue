//产品库
<template>
  <div class="productLibrary">
        <el-tabs type="border-card">
      <el-tab-pane label="产品库">
        <!-- 搜索 -->
        <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
        <!--  表格 -->
        <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add"
          @remove="remove" @edit="edit" @buttonFunction="buttonFunction"></mes-table>
        </el-tab-pane>
    </el-tabs>
    <!-- 仓储设置or修改 -->
    <mes-toast :config="toastData" @close="close" @save="save" @saveAgain="saveAgain" @handleClose="close">
      <!-- 弹窗内容 -->
      <p-l-toast-body ref="ToastBody" :options="[search.searchConfig[0][0].childrens,
                                                  search.searchConfig[0][1].childrens,
                                                  search.searchConfig[0][2].childrens
                                                 ]"></p-l-toast-body>
    </mes-toast>
    <!-- 查看详情 -->
    <mes-toast :config="toastInfoData" @infoClose="infoClose">
      <!-- 弹窗内容 -->
      <look-info ref="ToastInfoBody" :config="lookInfoData"></look-info>
    </mes-toast>
  </div>
</template>
<script>
import {
  productStoreCrmPage,
  removeProduct,
  addProduct,
  editProductMsg,
  productlist,//产品信息下拉
  pageForFactory,//生产场地下拉查询
  selectProdType, //所属分类产品下拉查询

} from "../api/productLibrary";
import pLToastBody from "../components/productLibrary/pLToastBody";
export default {
  data() {
    return {
      toastType: "",
      lookInfoData: {},
      toastData: {
        title: "新增产品", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "1000px", //弹窗宽
        btnData: []
      },
      toastInfoData: {
        title: "查看详情", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "1000px", //弹窗宽
        btnData: [
          {
            name: "关闭", //按钮名
            method: "infoClose", //回调函数
            bgColor: "dialog-deep-blue" //按钮背景
          }
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
              label: "产品信息",
              field: "prodName",
              type: "select",
              childrens: []
            },
            {
              childrens:[]
            },
            {
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
            field: "prodName",
            label: "产品名称",
            type: "text"
          },
          {
            field: "factoryName",
            label: "生产场地",
            type: "text"
          },
          {
            field: "productMsg",
            label: "规格/参数/型号",
            type: "text"
          },
           {
            field: "unit",
            label: "计量单位",
            type: "text"
          },
           {
            field: "material",
            label: "材质",
            type: "text"
          },
          {
            field: "level",
            label: "等级",
            type: "text"
          },
          { field: "查看详情", label: "操作", type: "btnText" }
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
      attrTransfrom: {
        prodNo:"产品编码",
        prodName: "产品名称",
        factoryName: "生产场地",
        param:"参数",
        modelDesc: "型号",
        norms: "规格",
        unit:"计量单位",
        material: "材质",
        level: "等级",
        typeName:"所属分类",
        remark:"备注",
      }
    };
  },
  mounted() {
    //获取表格数据
    this.getDate();
     //产品信息下拉查询
      // productlist({

      //   Vue: this,
      //   prodName: {
      //     id:"",
      //     name: 'prodName'
      //   }
      // }).then(data => {
      //    this.search.searchConfig[0][0].childrens = data.model.items;
      //   //  console.log("下拉查询",this.search.searchConfig[0][1].childrens)
      // // this.search.searchData = data.model.items;
      // })
       productlist({Vue:this}).then(data=>{
        //  debugger;
        // console.log("this.search.searchConfig[0][1]", this.search.searchConfig[0][1])
          this.search.searchConfig[0][0].childrens = data.model;
          console.log("下拉查询",data);

      })
     //生产场地查询
      pageForFactory({Vue:this}).then(data=>{
        // console.log("this.search.searchConfig[0][1]", this.search.searchConfig[0][1])
          this.search.searchConfig[0][1].childrens =data.model.items;
      })
       //所属分类下拉查询
      selectProdType({Vue:this}).then(data=>{
        
          this.search.searchConfig[0][2].childrens =data.model;
      })
  },
  methods: {
    buttonFunction(data) {
      //表格单行末尾查看详情
      this.toastInfoData.dialogVisible = true;
      let params = {};
      for (let attr in this.attrTransfrom) {
        let key = this.attrTransfrom[attr];
        let value = data[attr];
        params[key] = value;
      }
      setTimeout(() => {
        this.lookInfoData = params;
      }, 0);
    },
    add() {
      //新增
      this.toastData.title = "新增产品";
      this.toastData.btnData = this.toastSettingBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "add";
    },
    edit() {
      //编辑
      this.toastData.title = "编辑产品";
      this.toastData.btnData = this.toastEditBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "edit";
      if (this.toastType == "edit") {
        setTimeout(() => {
          let {
            prodName,
            prodNo,
            factoryName,//生产场地
            norms,
            param,
            modelDesc,
            typeName,
            unit,
            material,//材质
            level,
            prodStatus,
            remark,
            id
          } = this.tableConfig.currentSelectArr[0];
          this.$refs["ToastBody"].ruleForm = {
            prodName,
            prodNo,
            factoryName,//生产场地
            norms,
            param,
            modelDesc,
            typeName,
            unit,
            material,//材质
            level,
            prodStatus,
            remark,
            id
          };
        }, 0);
      }
    },
    save() {
      if (this.toastType == "edit") {
        //编辑\
        this.$refs['ToastBody'].submitForm(this.eidtOperation.bind(this,true))
      } else {
        //新增
        this.$refs['ToastBody'].submitForm(this.addOperation.bind(this,true))
      }
    },
    saveAgain() {
      this.$refs['ToastBody'].submitForm(this.addOperation.bind(this))
    },
    eidtOperation() {
      //编辑实际操作
      let ToastBody = this.$refs["ToastBody"];
      let params = ToastBody.ruleForm;
      editProductMsg({ Vue: this, params: this.setAttr(params) }).then(data => {
        this.$message({
          message: data.message,
          type: "success"
        });
        ToastBody.resetForm();
        this.toastData.dialogVisible = false;
        this.getDate(this.search.searchData);
      });
    },
    addOperation(flag) {
      //新增实际操作
      let ToastBody = this.$refs["ToastBody"];
      let params = ToastBody.ruleForm;
      delete params["id"];
      addProduct({ Vue: this, params: this.setAttr(params) }).then(data => {
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
    infoClose() {
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
          removeProduct({
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
      productStoreCrmPage({
        params: this.setAttr(data),
        Vue: this
      }).then(data => {
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
    pLToastBody
  }
};
</script>
