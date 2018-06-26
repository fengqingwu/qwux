//生产场地设置
<template>
  <div class="productLibrary">
        <el-tabs type="border-card">
      <el-tab-pane label="生产场地设置">
        <!-- 搜索 -->
        <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
        <!--  表格 -->
       <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add"
          @remove="remove" @edit="edit" @buttonFunction="buttonFunction">  
          </mes-table> 
        </el-tab-pane>
    </el-tabs>
    <!-- 仓储设置or修改 -->
    <mes-toast :config="toastData" @close="close" @save="save" @saveAgain="saveAgain" @handleClose="close">
      <!-- 弹窗内容 -->
      <p-l-toast-body ref="ToastBody" :type="toastType"></p-l-toast-body>
    </mes-toast>
    <!-- 查看详情 -->
    <mes-toast :config="toastInfoData" @infoClose="infoClose">
      <!-- 弹窗内容 -->
      <!-- <look-info  :config="lookInfoData"></look-info> -->
    </mes-toast>
       </div>
</template>
<script>
import {
  pageForFactory,
  findById,
 findByEmp,
 addProdectSite,
 removeProdectSite,
 editProdectSite
} from "../api/Settingsite";
import pLToastBody from "../components/SiteSetting/pLToastBody";
export default {
  data() {
    return {
      toastType: "",
      lookInfoData: {},
      printInfoData:{},
      toastData: {
        title: "新增生产场地", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "400px", //弹窗宽
        btnData: []
      },
      /* toastInfoData: {
        title: "打印设备信息", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "400px", //弹窗宽
        btnData: [
          {
            name: "关闭", //按钮名
            method: "infoClose", //回调函数
            bgColor: "dialog-deep-blue" //按钮背景
          }
        ]
      }, */
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
/*        searchConfig: [
          [
            {
              label: "员工信息",
              field: "empNo",
              type: "input"
            }
          ]
        ]  */
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
            field: "factoryName",
            label: "场地名称",
            type: "text"
          }, 
          {
            field: "factoryType",
            label: "场地类型",
            type: "text"
          },
              {
            field: "factoryDesc",
            label: "场地描述",
            type: "text"
          }, 
          {
            field: "manager",
            label: "管理者",
            type: "text"
          },
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
      tableData: [],//调用数据
      attrTransfrom: {
        factoryName: "场地名称",
        factoryType: "场地类型",
        factoryDesc:"场地描述",
        manager:"管理者",
      }
    };
  },
  mounted() {
       /*   staffData({
        Vue: this
      }).then(data => {
        this.producInfoData = data.model.items;
        console.log(this.producInfoData)
      }) */
    //获取表格数据
    this.getDate(this.search.searchData) 
      },
  methods: {
   buttonFunction(data) {
      //表格单行末尾操作
      this.toastInfoData.dialogVisible = true;
      let params = {};
      queryPrintInformation({
          params:{empNo:data.empNo,barcode:data.barcode}
        }).then(data=>{
          let result = data.model;
            for (let attr in this.attrTransfrom) {
              params[attr] = result[attr];
            }
            params.barcode = result.imgCode;
            params.imgUrl = result.imgUrl;
            this.lookInfoData = params;
           console.log(this.lookInfoData)
        })
    },
    add() {
      //新增
      this.toastData.title = "新增生产场地";
      this.toastData.btnData = this.toastSettingBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "add";
        setTimeout(()=>{
         this.$refs["ToastBody"].isAmount = false;
      },0)
    },
    edit() {
      
      //编辑
      this.toastData.title = "编辑生产场地";
      this.toastData.btnData = this.toastEditBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "edit";
      if (this.toastType == "edit") {
        setTimeout(() => {
          let {
            factoryName, 
            factoryType, 
            factoryDesc,
            manager ,
            id
          } = this.tableConfig.currentSelectArr[0];
          this.$refs["ToastBody"].ruleForm = {
           factoryName, 
            factoryType, 
            factoryDesc,
            manager,
            id
          };
        }, 0);
      } 
    },
    save() {
      if (this.toastType == "edit") {
        //编辑
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
      ToastBody.ruleForm.id=this.tableConfig.currentSelectArr[0].id
      console.log(JSON.stringify(this.tableConfig.currentSelectArr))
      let params = ToastBody.ruleForm;
  findById({ Vue: this, params: this.setAttr(params) }).then(data => {
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
      //新增生产场地
      let ToastBody = this.$refs["ToastBody"];
      let params = ToastBody.ruleForm;
      delete params["id"];
      addProdectSite({ Vue: this, params: this.setAttr(params) }).then(data => {
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
         removeProdectSite({
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
     pageForFactory({
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
    pLToastBody,
  }
};
</script>
