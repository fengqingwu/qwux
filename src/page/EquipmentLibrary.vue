<template>
  <div class="equipment-library">
     <el-tabs type="border-card">
          <el-tab-pane label="设备库">
              <mes-search :config="search.searchConfig" :data="search.searchData"></mes-search>
              <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add"
          @remove="remove" @edit="edit" @buttonFunction="buttonFunction"></mes-table>
          </el-tab-pane>
      </el-tabs>
      <mes-toast :config="toastData" @close="close" @save="save" @saveAgain="saveAgain" @handleClose="close">
        <p-l-toast-body ref="ToastBody"  :type="toastType"></p-l-toast-body>
      </mes-toast>
      <!-- 查看详情 -->
      <mes-toast :config="toastInfoData" @infoClose="infoClose" @print="print">
        <!-- 弹窗内容 -->
        <print ref="ToastBody" :config="lookInfoData"></print>
      </mes-toast>
  </div>
</template>

<script>
import {
  EquipmentLibrary,
  EquipmentInformation,
  EquipmentInsert,
  Equipmentstate,
  pageForMachine,
  Equipmentremove,
  Equipmentupdate,
  EquipmentfindById
} from '../api/productLibrary'
import pLToastBody from "../components/EquipmentLibrary/pLToastBody";
import print from "../components/EquipmentLibrary/print";
export default {
  data(){
    return{
      lookInfoData: {},
      toastType:'',
      toastInfoData: {
        title: "查看详情", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "400px", //弹窗宽
        btnData: [
          {
            name: "关闭", //按钮名
            method: "infoClose", //回调函数
            bgColor: "dialog-deep-blue" //按钮背景
          }
        ],
      },
      toastData: {
        title: "新增产品", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "450px", //弹窗宽
        btnData: [
          {
            name: "关闭", //按钮名
            method: "infoClose", //回调函数
            bgColor: "dialog-deep-blue" //按钮背景
          }
        ]
      },
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
      search:{
        searchData:{},
        searchConfig:[
          [
            {
              label: "设备信息",
              field: "information",
              type: "select",
              filterable:true,
              childrens:[]
            },
            {
              label: "设备分类",
              field: "class",
              type: "select",
              filterable:true,
              childrens:[]
            },
            {
              label: "设备状态",
              field: "state",
              type: "select",
              filterable:true,
              childrens:[]
            }
          ]
        ],
      },
      tableConfig:{
        toolbarConfig:[
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
        // 表格字段配置
        colConfig:[
          {
            field: "macName",
            label: "设备信息",
            type: "text"
          },
          {
            field: "macType",
            label: "设备分类",
            type: "text"
          },
          {
            field: "orgName",
            label: "所属部门",
            type: "text"
          },
          {
            field: "spec",
            label: "型号",
            type: "text"
          },
          {
            field: "macStatus",
            label: "设备状态",
            type: "text"
          },
          { field: "查看详情",label: "操作", type: "btnText" }
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
      attrTransfrom: {
        macName: "设备信息",
        macType: "设备分类",
        orgName:"所属部门",
        spec:"型号",
        brand:'品牌',
        macStatus:'设备状态',
        image:"条形编码"
      },
      tableData:[],
    }
  },
  mounted(){
    //获取表格数据
    this.getDate(this.search.searchData);

    EquipmentLibrary({
      Vue:this
    }).then(data=>{
      for(let d of data.model){
        this.search.searchConfig[0][1].childrens.push({
          label:d.modelName,
          value:d.modelName
        })
      }
    }),
    EquipmentInformation({
      Vue:this
    }).then(data=>{
      for(let f of data.model){
        this.search.searchConfig[0][0].childrens.push({
          label:f.devInfo,
          value:f.devInfo
        })
      }
    }),
    Equipmentstate({
      Vue:this
    }).then(data=>{
      for(let g of data.model){
        this.search.searchConfig[0][2].childrens.push({
          label:g.dev,
          value:g.dev
        })
      }
    })
  },
  methods:{
    print(){

      PRINT.EXCEL('<style>.xh-toast-body{margin:0px auto;}</style>',document.getElementsByClassName('xh-toast-body')[0]);
      
    },
    infoClose() {
      this.toastInfoData.dialogVisible = false;
    },
    add() {
      //新增
      this.toastData.title = "新增设备";
      this.toastData.btnData = this.toastSettingBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "add";
      setTimeout(()=>{
         this.$refs["ToastBody"].isAmount = false;
      },0)
    },

    // 查看详情
    buttonFunction(data) {
      //表格单行末尾查看详情
      this.toastInfoData.dialogVisible = true;
      let params = {};
      EquipmentfindById({
        params:{id:data.id},
        Vue:this
      }).then(data=>{
        let result = data.model;
            for (let attr in this.attrTransfrom) {
              params[attr] = result[attr];
            }
            params.imgUrl = result.imgUrl;
            this.lookInfoData = params;
            console.log(params)
           console.log(this.lookInfoData)
      })
      // for (let attr in this.attrTransfrom) {
      //   let key = this.attrTransfrom[attr];
      //   let value = data[attr];
      //   params[key] = value;
      // }
      // setTimeout(() => {
      //   this.lookInfoData = params;
      // }, 0);
    },
    // 删除
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
          Equipmentremove({
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
            this.getDate(this.search.searchData);//刷新数据
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    searchList(data) {
      //查询数据
      this.tableConfig.pageNo = 1;
      let params = this.setAttr(data);
      this.tableConfig.pageNo = 1;
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
    save() {
      if (this.toastType == "edit") {
        //编辑
        this.$refs['ToastBody'].submitForm(this.eidtOperation.bind(this,true));
      } else {
        //新增
        this.$refs['ToastBody'].submitForm(this.addOperation.bind(this,true));
      }
    },
    edit() {
      //编辑
      this.toastData.title = "编辑设备库";
      this.toastData.btnData = this.toastEditBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "edit";
      
      this.$nextTick(()=>{
        if (this.toastType == "edit") {
          let {
            macName, //设备信息
            macStatus,//设备状态
            macType, //设备分类
            orgId, //所属部门
            factoryId, //所属产地
            brand, //品牌
            spec, //型号
            barcode, //条形编码
            id //id
          } = this.tableConfig.currentSelectArr[0];
          this.$refs["ToastBody"].ruleForm = {
            macName, //设备信息
            macStatus,//设备状态
            macType, //设备分类
            orgId, //所属部门
            factoryId, //所属产地
            brand, //品牌
            spec, //型号
            barcode, //条形编码
            id
          };
        this.$refs["ToastBody"].isAmount = true;
      }
      })
      
    },
    saveAgain() {
      this.$refs['ToastBody'].submitForm(this.addOperation.bind(this));
    },
    close() {
      //关闭弹窗
      this.$refs["ToastBody"].resetForm();
      this.toastData.dialogVisible = false;
    },
    infoClose() {
      this.toastInfoData.dialogVisible = false;
    },

    setAttr(data) {
      for (let attr in data) {
        if (null!= data[attr]) {
          delete data[attr];
        }
      }
      return data;
    },
    getDate(data = {}) {
      //获取分页数据
      data.pageNo = this.tableConfig.pageNo;
      data.pageSize = this.tableConfig.pageSize;
      pageForMachine({
        params: this.setAttr(data),
        Vue: this
      }).then(data => {
        this.tableData = data.model.items;
        this.tableConfig.total = data.model.numRows;
        this.tableConfig.loadShow = false;
      });
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
    },
    addOperation(flag) {
      //新增实际操作
      let ToastBody = this.$refs["ToastBody"];
      let params = ToastBody.ruleForm;
      // delete params["id"];
      // delete params["producInfo"];
      EquipmentInsert({ Vue: this, params: this.setAttr(params) }).then(data => {
        console.log(data)
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
    eidtOperation() {
      //编辑实际操作
      let ToastBody = this.$refs["ToastBody"];
      let params = ToastBody.ruleForm;
      console.log(params,this.setAttr(params))
      Equipmentupdate({ Vue: this, params: this.setAttr(params) }).then(data => {
        this.$message({
          message: data.message,
          type: "success"
        });
        ToastBody.resetForm();
        this.toastData.dialogVisible = false;
        this.getDate(this.search.searchData);
      });
    },
  },
  watch:{
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
  components:{
    pLToastBody,
    print
  }
}
</script>


<style>
  
</style>