//人员上机记录
<template>
  <div class="productLibrary">
        <el-tabs type="border-card">
      <el-tab-pane label="人员上机记录">
        <!-- 搜索 -->
        <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
        <!--  表格 -->
        <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add"
          @remove="remove" @edit="edit"></mes-table>
        </el-tab-pane>
    </el-tabs>
    <!-- 仓储设置or修改 -->
    <mes-toast :config="toastData" @close="close" @save="save" @saveAgain="saveAgain" @handleClose="close">
      <!-- 弹窗内容 -->
      <p-l-toast-body ref="ToastBody" :options="[search.searchConfig[0][0].childrens,
                                                 search.searchConfig[0][1].childrens,
                                                 midProdNoSelect]"></p-l-toast-body>
    </mes-toast>
  </div>
</template>
<script>
import {
 mesForMachine,
  getMes,
 pageForRecord
} from "../api/EnterRecord";
import {productlist} from '../api/index'
export default {
  data() {
    return {
      toastType: "",
      lookInfoData: {},
      midProdNoSelect:[],
      toastData: {
        title: "新增产品", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "1000px", //弹窗宽
        btnData: []
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
              label: "员工信息",
              field: "empNo",
              type: "select",
              filterable:true,
              childrens:[]
            },
            {
              label: "设备信息",
              field: "macNo",
              type: "select",
              filterable:true,
              childrens:[]
            },
          ]
        ]
      },
      tableConfig: {
          toolbarConfig:[],
        //表格字段配置
        colConfig: [
          {
            field: "emp",
            label: "人员信息",
            type: "text"
          },
          {
            field: "mac",
            label: "设备信息",
            type: "text"
          },
          {
            field: "startTime",
            label: "开始时间",
            type: "text"
          },
          {
            field: "endTime",
            label: "结束时间",
            type: "text"
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
      //获取设备信息
      mesForMachine({Vue:this}).then(data=>{
          for(let e of data.model.items){
              this.search.searchConfig[0][1].childrens.push({
                  label:e.macName,
                  value:e.macNo
              })
          }
          console.log(data.model.items)
      })
      //获取人员信息
      getMes({Vue:this}).then(data=>{
          for(let d of data.model.items){
              this.search.searchConfig[0][0].childrens.push({
                  label:d.empName,
                  value:d.empNo
              })
          }
          console.log(data.model.items)
      })
      pageForRecord({Vue:this}).then(data=>{
         this.midProdNoSelect = data.model;
      })
    //获取表格数据
    this.getDate();
  },
  methods: {
    add() {
      //新增
      this.toastData.title = "新增生产制令单";
      this.toastData.btnData = this.toastSettingBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "add";
    },
    edit() {
      //编辑
      this.toastData.title = "生产制令单编辑";
      this.toastData.btnData = this.toastEditBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "edit";
      if (this.toastType == "edit") {
        setTimeout(() => {
          let {
        empNo,
        mac,
        startTime,
        endTime,
            id
          } = this.tableConfig.currentSelectArr[0];
          this.$refs["ToastBody"].ruleForm = {
          empNo,
          mac,
          startTime,
          endTime,
            id
          };
        }, 0);
      }
    },
    save() {
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
      editTaskEmp({ Vue: this, params: this.setAttr(params) }).then(data => {
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
      insTaskEmp({ Vue: this, params: this.setAttr(params) }).then(data => {
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
          removeTaskEmp({
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
      pageForRecord({
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
//   watch: {
//     "tableConfig.currentSelectArr": function() {
//       //按钮控制
//       if (this.tableConfig.currentSelectArr.length == 1) {
//         this.tableConfig.toolbarConfig[1].disabled = false;
//         this.tableConfig.toolbarConfig[2].disabled = false;
//       } else if (this.tableConfig.currentSelectArr.length > 1) {
//         this.tableConfig.toolbarConfig[1].disabled = true;
//         this.tableConfig.toolbarConfig[2].disabled = false;
//       } else {
//         this.tableConfig.toolbarConfig[1].disabled = true;
//         this.tableConfig.toolbarConfig[2].disabled = true;
//       }
//     }
//   },
};
</script>

