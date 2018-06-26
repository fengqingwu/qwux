//生产制令单
<template>
  <div class="productLibrary">
        <el-tabs type="border-card">
      <el-tab-pane label="生产制令单">
        <!-- 搜索 -->
        <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
        <!--  表格 -->
        <mes-table2 :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add"
          @remove="remove" @edit="edit" @buttonFunction2='buttonFunction2'></mes-table2>
        </el-tab-pane>
    </el-tabs>
    <!-- 仓储设置or修改 -->
    <mes-toast :config="toastData" @close="close" @save="save" @saveAgain="saveAgain" @handleClose="close">
      <!-- 弹窗内容 -->
      <p-l-toast-body ref="ToastBody" :options="[search.searchConfig[0][1].childrens,
                                                 search.searchConfig[0][0].childrens,
                                                 search.searchConfig[0][2].childrens,
                                                 midProdNoSelect]"></p-l-toast-body>
    </mes-toast>
  </div>
</template>
<script>
import {
  taskEmpApsPage,
  insTaskEmp,
  editTaskEmp,
  removeTaskEmp,
  // MacTaskEmp,
  optionDev,
  findByPM,
  listMidProduct, //半产品编码查询
} from "../api/ProdictionOrders";
import {productlist} from '../api/index'
import pLToastBody from "../components/ProductionOrders/pLToastBody";
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
              label: "设备信息",
              field: "equipmentMsg",
              type: "select",
              childrens:[]
            },
            {
              label: "产品信息",
              field: "prodMsg",
              type: "select",
              childrens:[]
            },
            {
              label: "工艺信息",
              field: "craftworkMsg",
              type: "select",
              childrens:[]
            },
            {
              label: "指令状态",
              field: "workStatus",
              type: "select",
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
            field: "taskDate",
            label: "作业日期",
            type: "text"
          },
          {
            field: "starTime",
            label: "开始时间",
            type: "text"
          },
          // {
          //   field: "endTime",
          //   label: "结束时间",
          //   type: "text"
          // },
          {
            field: "equipmentMsg",
            label: "设备信息",
            type: "text"
          },
          {
            field: "prodMsg",
            label: "产品信息",
            type: "text"
          },
           {
            field: "midProdNo",
            label: "半产品编码",
            type: "text"
          },
          {
            field: "craftworkMsg",
            label: "工艺信息",
            type: "text"
          },
          // {
          //   field: "amount",
          //   label: "数量",
          //   type: "text"
          // },
          {
            field: "workStatus",
            label: "指令状态",
            type: "text"
          },
          {
            field: "remark",
            label: "备注",
            type: "text"
          },
          {
            field: '[{"key":"0","field":"开始","enabled":1},{"key":"1","field":"挂起","enabled":0},{"key":"2","field":"取消","enabled":0}]',
            label: "操作",
            type: "btnTextArrStatus"
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
          // this.search.searchConfig[0][1].childrens = data.model;
            var result=[];
          for(var i=0;i<data.model.length;i++){
              var obj=data.model[i];
              result.push({
                  label:obj.prodMsg
              });
          }
          var data = result;
          this.search.searchConfig[0][1].childrens = data.model.prodMsg;
          
      })
      //设备信息查询
      optionDev({Vue:this}).then(data=>{
        // for(let list in data.model){
          // var arr=[{},{}];
          var result=[];
          for(var i=0;i<data.model.length;i++){
              var obj=data.model[i];
              result.push({
                 label:obj.devInfo,
                  value:obj.code,      
              });
          }
          var data = result;
        // }
        // var data = [{
        //   label:11111111,
        //   value:333
        // },{
        //   label:222,
        //   value:333
        // },{
        //   label:222,
        //   value:333
        // }]
          this.search.searchConfig[0][0].childrens =data;
      })
      //工艺信息查询
      findByPM({Vue:this}).then(data=>{
          this.search.searchConfig[0][2].childrens = this.setSelectData(data.model);
        
      })
       //半产品编码查询
      listMidProduct({Vue:this}).then(data=>{
          this.search.searchConfig[0][1].childrens = this.setSelectData(data.model);
        
      })
    //获取表格数据
    this.getDate();
  },
  methods: {
    buttonFunction2(data){
       let row=data.row;
        let index=data.i;
        let that=this;
        let statusArr=[1,2,4];

        editTaskEmp({Vue: that,params: { macNo: row.macNo, workStatus: statusArr[index],id: row.id}}).then(res => {
            if(res.model.workStatus==statusArr[index]){
              that.$notify({
                title: '经编云终端机',
                message: '工单状态修改成功！',
                type: 'success'
              });
              // that.getData(that.formData);
            }
        });
       location.reload(true)
    },
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
          macNo,
          taskDate,
          starTime,
          endTime,
          crafworkId,
          equipmentMsg,//设备信息
          workStatus,//指令状态
          amount,
          require,
          remark,
          prodNo,//产品信息
          craftworkMsg,
            id
          } = this.tableConfig.currentSelectArr[0];
          this.$refs["ToastBody"].ruleForm = {
          macNo,
          taskDate,
          starTime,
          endTime,
          crafworkId:crafworkId+'',
          workStatus,//指令状态
          equipmentMsg:crafworkId+'',//设备信息
          amount,
          require,
          remark,
          prodNo,//产品信息
          craftworkMsg,
            id
          };
        }, 0);
      }
    },
    save() {
      if (this.toastType == "edit") {
        //编辑
        this.eidtOperation();
      } else {
        //新增
        this.addOperation(true);
      }
    },
    saveAgain() {
      this.addOperation();
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
      taskEmpApsPage({
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
</script>>

