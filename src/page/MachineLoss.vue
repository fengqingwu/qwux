//损耗记录
<template>
<div class="root_view">
  <el-tabs type="border-card">
      <el-tab-pane label="损耗查询"></el-tab-pane>
      <mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
      <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange"  @pageChange="pageChange"></mes-table>
  </el-tabs> 
</div>
</template>
<script>
import {
	pageForMachine,//获取设备信息
	productStorePlm,//获取产品信息
	EmpMacRecordMes//损耗记录
} from "../api/MachineLoss"
export default{
	name: 'MachineLoss',
	data(){
		return {
			search: {
	        searchData: {},
	        searchConfig: [
	          [

	            {
	              label: "设备信息",
	              field: "macNo",
	              filterable: true,
	              type: "select",
	              pageNo: 1,
	              pageSize: 20,
	              childrens:[]
	            },
	            {
	              label: "产品信息",
	              field: "prodNo",
	              type: "select",
	              filterable: true,
	              maxHeight: '200',
	              pageNo: 1,
	              pageSize: 20,
	              childrens:[]
	            }
	          ]
	        ],	        
		    //机器信息下拉数据
	        MacList:[],
	        //产品信息下拉列表
	        ProList:[]
	      },
	      tableConfig: {
		    	toolbarConfig:[],
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
		    colConfigOne: [
		    	{
						field: "prod",
						label: "产品信息",
						type: "text"
			        },
			        {
						field: "midProdNo",
						label: "半成品编码",
						type: "text"
			        },
			        {
						field: "makeDate",
						label: "生产日期",
						type: "text"
			        },
			        {
						field: "mac",
						label: "设备信息",
						type: "text"
			        },
			        {
						field: "amount",
						label: "数量",
						type: "text"
			        },
			        {
						field: "unit",
						label: "单位",
						type: "text"
			        },
			        {
						field: "doEmp",
						label: "生产人",
						type: "text"
			        },
			        {
						field: "descr",
						label: "描述",
						type: "text"
			        }
		    ],
		    tableData:[]
		}
	},
	created(){		
		this.tableConfig.colConfig=this.colConfigOne;
	},
	mounted(){
		this.listMac();
		this.listPro();
		this.getData();
	},
	// watch:
	methods: {
		searchList(data) {
			this.getData();
		},
		//获取设备信息列表
		listMac(data = {} ){
			let that=this;
			if( !data ) data = {'pageNo': that.search.searchConfig[0][0].pageNo,'pageSize': that.search.searchConfig[0][0].pageSize };
			 pageForMachine({ vue: this,params: data }).then(data=>{
			 	that.MacList=[];
			 	let i=0;
			 	for(let o in data.model.items){
			 		i++;
			 		that.MacList.push({'label': data.model.items[o].macName,'value': data.model.items[o].macNo});
			 	}
			 	that.search.searchConfig[0][0].childrens=that.MacList;
			 })

		},
		//获取产品信息列表
		listPro(data = {}){
			let that=this;
			if( !data ) data = {'pageNo': that.search.searchConfig[0][1].pageNo,'pageSize': that.search.searchConfig[0][1].pageSize };
			 productStorePlm({ vue: this,params: data }).then(data=>{
			 	that.ProList=[];
			 	let i=0;
			 	for(let o in data.model.items){
			 		i++;
			 		that.ProList.push({'label': data.model.items[o].prodName,'value': data.model.items[o].prodNo});
			 	}
			 	that.search.searchConfig[0][1].childrens=that.ProList;
			 })

		},
		//分页size变化
		sizeChange(){
      		this.getData(this.search.searchData);
		},
		pageChange(){
			this.getData(this.search.searchData);
		},
		fillData(row){
			let arr={};
			for(let a in this.colConfigOne){
				if(!row[this.colConfigOne[a].field])row[this.colConfigOne[a].field]='-';
			}
			return row;

		},
		getData(data = {}){
			let that=this;
			console.log(that.tableConfig);		
			if(this.search.searchData.macNo) data.macNo = this.search.searchData.macNo;
			if(this.search.searchData.prodNo) data.prodNo = this.search.searchData.prodNo;
			//获取分页数据
			data.pageNo = that.tableConfig.pageNo;
			data.pageSize = that.tableConfig.pageSize;
			EmpMacRecordMes({vue:that,params: data}).then(data=>{
				for(let b in data.model.items){
					that.fillData(data.model.items[b]);
				}
				that.tableConfig.total = data.model.numRows;
				that.tableData = data.model.items;
		        that.tableConfig.loadShow = false;
			})
			// console.log(JSON.stringify(data));
		}
	}
}	
</script>