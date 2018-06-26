//设备产出记录
<template>
  <div class="productLibrary">
        <el-tabs type="border-card" @tab-click="tabClick" v-model="activeName" >
          <el-tab-pane label="整经机" name="one">
              <!-- 搜索 --
              >
              <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
              <!--  表格 -->
              <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @buttonFunction="buttonFunction"></mes-table>
          </el-tab-pane>
          <el-tab-pane label="经编机" name="two">
              <!-- 搜索 -->
              <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
              <!--  表格 -->
              <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @buttonFunction="buttonFunction"></mes-table>
          </el-tab-pane>
    </el-tabs>
      <!-- 查看详情 -->
      <mes-toast :config="toastInfoData" @infoClose="infoClose">
           <toast-body ref="ToastBody" :typeName="typeName" :macNo="macNo"></toast-body>
      </mes-toast>
  </div>
</template>
<script>
import {
  selectMacPage
} from "../api/EquipmentOutputRecord";
import toastBody from "../components/EquipmentOutputRecord/toastBody";
export default {
  data() {
    return {
      activeName:"one",
      typeName:'zjj',
      macNo:'',
      lookInfoData: {},
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
      search: {
        searchData: {},
        searchConfig: [
          [
            {
              label: "时间戳",
              field: "flagTime",
              type: "daterange"
            }
          ]
        ]
      },
      tableConfig: {
        //表格字段配置
        colConfig: [],
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
      colConfigTwo: [
        {
          field: "macNo",
          label: "设备编号",
          type: "text"
        },
        {
          field: "macName",
          label: "设备名称",
          type: "text"
        },
        {
          field: "flagTime",
          label: "日期",
          type: "text"
        },
        {
          field: "gtotal",
          label: "布长",
          type: "text"
        },
        {
          field: "weigth",
          label: "总重量",
          type: "text"
        },
        {
          field: "unit",
          label: "单位",
          type: "text"
        },
        { field: "查看详情", label: "操作", type: "btnText" }
      ],
      colConfigOne: [
        {
          field: "macNo",
          label: "设备编号",
          type: "text"
        },
        {
          field: "macName",
          label: "设备名称",
          type: "text"
        },
        {
          field: "flagTime",
          label: "日期",
          type: "text"
        },
        {
          field: "gtotal",
          label: "盘头组数",
          type: "text"
        },
        {
          field: "total",
          label: "盘头个数",
          type: "text"
        },
        {
          field: "weigth",
          label: "总重量",
          type: "text"
        },
        {
          field: "unit",
          label: "单位",
          type: "text"
        },
        { 
          field: "查看详情",
          label: "操作", 
          type: "btnText" }
      ]
    };
  },
  mounted() {
      this.tableConfig.colConfig = this.colConfigOne;
    //获取表格数据
    this.getDate(this.search.searchData);
  },
  methods: {
    tabClick(){
      if(this.activeName ==='one'){
           this.typeName = 'zjj';
           this.tableConfig.colConfig = this.colConfigOne;
           this.getDate();
      }else{
           this.typeName = 'jbj';
           this.tableConfig.colConfig = this.colConfigTwo;
           this.getDate();
      }
    },
    buttonFunction(data) {
      console.log(data)
      this.toastInfoData.dialogVisible = true;
      setTimeout(()=>{
        let ToastBody = this.$refs['ToastBody'];
        ToastBody.macNo = data.macNo;
        ToastBody.equipmentMsg = data.equipmentMsg;
        if(this.activeName ==='one'){
            ToastBody.tableConfig.colConfig = ToastBody.colConfigOne;
        }else{
            ToastBody.tableConfig.colConfig = ToastBody.colConfigTwo;
        }
            ToastBody.getData();
      },0)

    },
    infoClose() {
      this.toastInfoData.dialogVisible = false;
    },
    searchList(data) {
    //查询数据
      this.tableConfig.pageNo = 1;
      let params = {};
      if(data.flagTime){
        params.tempStampL=data.flagTime[0];
        params.tempStampH=data.flagTime[1]
        params =   this.setAttr(params);
      }
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
    getDate(data = {}) {
      data.type = this.typeName;
      //获取分页数据
      data.pageNo = this.tableConfig.pageNo;
      data.pageSize = this.tableConfig.pageSize;
      selectMacPage({
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
  components: {
    toastBody
  }
};
</script>

