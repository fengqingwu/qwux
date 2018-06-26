//设备产出记录
<template>
<div class="macpro">
	<el-tabs type="border-card"  @tab-click="tabClick" v-model="activeName">
      <el-tab-pane label="整经机" name="one">
      	<mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
      	<!-- 表格 -->
      	<mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange"  @pageChange="pageChange" @buttonFunction="buttonFunction"></mes-table>
      </el-tab-pane>
      <el-tab-pane label="经编机" name="two">
      	<mes-search :config="search.searchConfig" :data="search.searchData" @search="searchList"></mes-search>
      	<mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange"  @pageChange="pageChange" @buttonFunction="buttonFunction"></mes-table>
      </el-tab-pane>
  	</el-tabs>
  	<!-- 弹窗 -->
	<!-- 查看详情 -->
	<mes-toast :config="toastInfoData" @infoClose="infoClose">
		<ToastMacPro ref="toastMacPro" :typeName="typeName" :macNo="macNo"></ToastMacPro>
	</mes-toast>
</div>	
</template>
<script>
// import api used get data from server
import { selectMacPage } from "../api/MacPro"
// import components
import ToastMacPro from '../components/MacPro/ToastMacPro'
// init vue
export default{
	name: 'MacPro',
	components:{
		ToastMacPro
	},
	data(){
		return {
			activeName: 'one',
			macNo: '',
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
		        ],

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
		    tableData:[],
		    typeName:'zjj',//判断数据类型
		    //表格列配置
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
		        { field: "查看详情", label: "操作", type: "btnText" }
		    ],
		    colConfigOne: [
		    	{
					field: "equipmentMsg",
					label: "设备信息",
					type: "text"
		    	},
		    	{
					field: "tempStamp",
					label: "日期范围",
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
					field: "spcMac",
					label: "指定经编机",
					type: "text"
		    	},
		    	{
					field: "weigth",
					label: "总重量（丝重）",
					type: "text"
		    	},
		    	{
					field: "unit",
					label: "单位",
					type: "text"
		    	},
		    	{ field: "查看详情", label: "操作", type: "btnText" }
		    ],
	      toastInfoData: {
	        title: "查看详情", //弹窗标题
	        dialogVisible: false, //弹窗显示
	        width: "800px", //弹窗宽
	        btnData: [
	          {
	            name: "关闭", //按钮名
	            method: "infoClose", //回调函数
	            bgColor: "dialog-deep-blue" //按钮背景
	          }
	        ]
	      }

		}
	},
	created(){
		this.typeName = 'zjj';
		this.tableConfig.colConfig = this.colConfigOne;
		this.tableConfig.pageNo = 1;
		this.getData();
	},
	methods: {
		//tab切换
		tabClick(){
			switch(this.activeName){
				case 'one':
				{
					this.typeName = 'zjj';
					this.tableConfig.colConfig = this.colConfigOne;
					this.tableConfig.pageNo = 1;
					this.getData();
				}
				break;
				case 'two':
				{
					this.typeName = 'jbj';
					this.tableConfig.colConfig = this.colConfigTwo;
					this.tableConfig.pageNo = 1;
					this.getData();
				}
				break;
				default:
				console.error("no case done tab activeName...");
			}
		},
		//搜索动作
		searchList(){
			let that=this;
			//searchData==>日期查询参数 null:{"flagTime":null}, notNull:{"flagTime":["2018-06-05","2018-07-19"]}
			that.getData();
		},		
		//分页size变化
		sizeChange(){
      		this.getData(this.search.searchData);
		},
		//过滤请求参数
		setAttr(data= {} ){
			for (let attr in data) {
				if (!data[attr]) {
				  delete data[attr];
				}
			}
			return data;
		},
		//获取数据
		getData(data = {}){
			let that=this;
			//判断请求数据类型
			data.type = that.typeName;
			//时间段
			if(this.search.searchData.flagTime){
				data.tempStampL=that.search.searchData.flagTime
[0];
  				data.tempStampH=that.search.searchData.flagTime
[1]
			}
			//获取分页数据
			data.pageNo = that.tableConfig.pageNo;
			data.pageSize = that.tableConfig.pageSize;
			//请求数据
			selectMacPage({ params: that.setAttr(data),vue: that }).then(data => {				
		        that.tableConfig.total = data.model.numRows;
		        if(data.model.numRows){
		        	for(let o in data.model.items){
		        		if(!data.model.items[o].spcMac){
		        			data.model.items[o].spcMac = '-';
		        		}
		        	}
		        }
		        that.tableData = data.model.items;
		        that.tableConfig.loadShow = false;
			})
		},
		//
		pageChange(){
			this.getData(this.search.searchData);
		},
		buttonFunction( data ){
			let that = this;
			that.toastInfoData.title = '查看详情' + (this.activeName=='one'? '整经机' : '经编机');
			setTimeout(() => {
				let ToastBody=that.$refs.toastMacPro;
				 	ToastBody.macNo = data.macNo;
			        ToastBody.equipmentMsg = data.equipmentMsg;
			        if(this.activeName ==='one'){
			            ToastBody.tableConfig.colConfig = ToastBody.colConfigOne;
			        }else{
			            ToastBody.tableConfig.colConfig = ToastBody.colConfigTwo;
			        }
			        ToastBody.getData();//获取数据
			},0);
			that.toastInfoData.dialogVisible = true;
		},
		//关闭弹窗
		infoClose() {
	      this.toastInfoData.dialogVisible = false;
	    },
	}
}
</script>