//人员识别码库
<template>
  <div class="productLibrary">
        <el-tabs type="border-card">
      <el-tab-pane label="人员识别码库">
        <!-- 搜索 -->
        <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
        <!--  表格 -->
       <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add"
          @remove="remove" @edit="edit" @buttonFunction="buttonFunction">  
          </mes-table> 
        </el-tab-pane>
    </el-tabs>
    <!-- 仓储设置or修改 -->
    <mes-toast :config="toastData" @close="close" @save="save" @saveAgain="saveAgain" @handleClose="close" >
      <!-- 弹窗内容 -->
      <p-l-toast-body ref="ToastBody" :type="toastType"></p-l-toast-body>
    </mes-toast>
    <!-- 查看详情 -->
    <mes-toast :config="toastInfoData" @infoClose="infoClose" @print="print" >
      <!-- 弹窗内容 -->
      <!-- <look-info  :config="lookInfoData"></look-info> -->
      <print ref="ToastBody" :config="lookInfoData"></print>
      <div class="xh-toast-body1" v-show="false"></div>
    </mes-toast>
       </div>
       
</template>
<script>
import {PRINT} from '../utils/commonWay.js'
import {
  staffCrmPage,
  editBarCode,
  addStaff,
  removeBarCode,
  queryPrintInformation
} from "../api/StaffMessage";
import pLToastBody from "../components/StaffIdentificationLibraryCode/pLToastBody";
import print from "../components/StaffIdentificationLibraryCode/print"; 
export default {
  data() {
    return {
      toastType: "",
      lookInfoData: {},
      printInfoData:{},
      toastData: {
        title: "新增人员识别码", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "400px", //弹窗宽
        btnData: []
      },
      toastInfoData: {
        title: "打印设备信息", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "400px", //弹窗宽
        btnData: [
          {
            name: "关闭", //按钮名
            method: "infoClose", //回调函数
            bgColor: "dialog-white" //按钮背景
          },
                  {
            name: "确认打印", //按钮名
            method: "print", //回调函数
            bgColor: "dialog-deep-blue" //按钮背景
          }
        ]
      },
            config:{
            imgUrl:'src="config.imgUrl',
            companyName:'公司名称',
            orgName:'产品名称',
            empNo:'员工编码',
            empName:'员工姓名',
            barcode:"src='data:image/png;base64,'+config.barcode"
          },
            attrObj:{
            imgUrl:'员工头像',
            companyName:'公司名称',
            orgName:'产品名称',
            empNo:'员工编码',
            empName:'员工姓名',  
            barcode:"条形码"
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
              type: "input"
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
            field: "createBy",
            label: "员工信息",
            type: "text"
          }, 
          {
            field: "barcode",
            label: "条形编码",
            type: "text"
          },
          {  
            field: "打印", 
            label: "操作", 
            type: "btnText" 
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
        companyName: "公司名称",
        orgName: "部门",
        empNo:"员工工号",
        empName:"员工姓名",
        barcode:"条形码"
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
      this.toastData.title = "新增人员识别码";
      this.toastData.btnData = this.toastSettingBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "add";
        setTimeout(()=>{
         this.$refs["ToastBody"].isAmount = false;
      },0)
    },
    edit() {
      //编辑
      this.toastData.title = "编辑人员";
      this.toastData.btnData = this.toastEditBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "edit";
      if (this.toastType == "edit") {
        setTimeout(() => {
          let {
            empNo,//员工工号
            staffName,//员工姓名
            barcode,//条形码
            id
          } = this.tableConfig.currentSelectArr[0];
          this.$refs["ToastBody"].ruleForm = {
            empNo,//员工工号
            staffName,//员工姓名
            barcode,//条形码
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
      let params = ToastBody.ruleForm;
      editBarCode({ Vue: this, params: this.setAttr(params) }).then(data => {
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
      addStaff({ Vue: this, params: this.setAttr(params) }).then(data => {
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
      domRender() {
        var  element = '<div class="print-content">',obj=this.lookInfoData;
        for (var attr in this.attrObj) {
            if(attr==="imgUrl"){
            element +='<div class="toast-body-item">' + '<span>' + this.attrObj[attr] + '：</span><img src="'+ obj[attr]+'"/></div>'
            }
            else if(attr==="barcode"){
            element +='<div class="toast-body-item">' + '<span>' + this.attrObj[attr] + '：</span><img src="data:image/png;base64,'+ obj[attr]+'"/></div>'
            }
            else{
             element += '<div class="toast-body-item">' + '<span>' + this.attrObj[attr] + '：</span>' + obj[attr] + '</div>'
            }  
        }
        element +='</div>'
        return element;
      },
   print(){
     let form=document.getElementsByClassName('xh-toast-body1')[0];
         form.innerHTML=this.domRender();
      PRINT.EXCEL('<style>.print-content{padding-left:20px}.xh-toast-body{margin:0px auto; .toast-body-item{padding-left:12px; }img{margin:-10px 0 0 -20px}}</style>',form);
      
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
          removeBarCode({
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
      staffCrmPage({
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
    print
  }
};
</script>
