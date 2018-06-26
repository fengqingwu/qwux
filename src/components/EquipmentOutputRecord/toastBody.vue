<template>
  <div class="settingToastBody">
    <p>设备信息 {{equipmentMsg}}</p>
    <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange"></mes-table>
  </div>
</template>
<script>
import  {selectMacMSg} from '../../api/EquipmentOutputRecord.js'
  export default {
    props:['typeName'],
    data() {
      return {
        macNo:'',
        equipmentMsg:'',
        tableConfig: {
          //表格字段配置
          colConfig: [],
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
        colConfigTwo: [{
            field: "macNo",
            label: "产品信息",
            type: "text"
          },
          {
            field: "gtotal",
            label: "布长",
            type: "text"
          },
          {
            field: "weigth",
            label: "布重",
            type: "text"
          },
          {
            field: "flagTime",
            label: "时间戳",
            type: "text"
          }
        ],
        colConfigOne: [{
            field: "midProdNo",
            label: "盘头编码",
            type: "text"
          },
          {
            field: "weigth",
            label: "丝重",
            type: "text"
          },
          {
            field: "flagTime",
            label: "时间戳",
            type: "text"
          }
        ]
      }
    },
    methods: {
      sizeChange(){
         this.getData();
      },
      pageChange(){
         this.getData();
      },
      getData(){
        let params = {
            pageNo:this.tableConfig.pageNo,
            pageSize:this.tableConfig.pageSize,
            type:this.typeName,
            macNo:this.macNo
        }
        selectMacMSg({Vue:this,params:params}).then(data=>{
           this.tableData =data.model.items;
           this.tableConfig.total = data.model.numRows;
           this.tableConfig.loadShow = false;
        })
      }
    }
  }

</script>

<style lang="less">
  .settingToastBody {
    padding: 0 20px 10px 20px;
    p{
      word-spacing: 20px;
      color: #565656;
      font-size: 14px;
      padding-bottom: 20px;
      border-bottom: 1px solid #E1E1E1;
      margin-bottom: 20px;
    }
  }

</style>
