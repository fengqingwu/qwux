//物料库
<template>
  <div class="productLibrary">
      <el-tabs type="border-card">
      <el-tab-pane label="物料库">
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
      <MSToastBody ref="ToastBody" :options="addOptions" :type="toastType"></MSToastBody>
    </mes-toast>
    <!-- 查看详情 -->
    <mes-toast :config="toastInfoData" @infoClose="infoClose">
      <!-- 弹窗内容 -->
      <look-info  :config="lookInfoData"></look-info>
    </mes-toast>
  </div>
</template>
<script>
import {
  selectMatterType,
  listMatter,
  matterStatus,
  pageForFactory,
  selectMatterPage,
  removeMatter,
  insertMatter,
  editMatter
} from "../api/MaterialStorehouse";
import MSToastBody from "../components/MaterialStorehouse/MSToastBody";
export default {
  components: {
    MSToastBody
  },
  data() {
    return {
      toastType: "",
      lookInfoData: {},
      toastData: {
        title: "新增盘头组", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "1000px", //弹窗宽
        btnData: []
      },
      toastInfoData: {
        title: "查看物料详情", //弹窗标题
        dialogVisible: false, //弹窗显示
        width: "890px", //弹窗宽
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
              label: "分类名称",
              field: "mattersTypeId",
              filterable: false,
              type: "select",
              pageNo: 1,
              pageSize: 20,
              childrens:[]
            },
            {
              label: "物料信息",
              field: "matterNo",
              type: "select",
              filterable: true,
              maxHeight: '200',
              pageNo: 1,
              pageSize: 20,
              childrens:[]
            },
            {
              label: "状态",
              field: "status",
              type: "select",
              filterable: false,
              maxHeight: '200',
              pageNo: 1,
              pageSize: 20,
              childrens:[]
            }
          ]
        ],
        //分类名称下拉
          MarterList:[],
          //物料信息
          MarInfoList:[],
          //状态列表
          MarStatus:[]
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
            field: "mattersNo",
            label: "物料编码",
            type: "text"
          },
          {
            field: "mattersName",
            label: "物料名称",
            type: "text"
          },
          {
            field: "typeName",
            label: "所属分类",
            type: "text"
          },
          {
            field: "norms",
            label: "规格",
            type: "text"
          },
          {
            field: "modelDesc",
            label: "型号",
            type: "text"
          },
          {
            field: "status",
            label: "状态",
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
        mattersNo: "物料编码",
        mattersName: "物料名称",
        typeName: "所属分类",
        //mattersTypeId: "物料分类",
        param: "参数",
        modelDesc: "型号",
        norms: "规格",
        unit: "单位",
        factory:"生产厂商",
        brand: "品牌",
        versions: "版本号",
        material: "材质",
        level: "等级",
        weight: "单位重量",        
        desc: "描述"
        // storeSetId: "仓库id",
        // advAmount: "生产预付数量",
        // purAmount: "采购预进数量",
        // status: "状态",
        // secureStock: "安全库存",
        // befDate:"采购提前期",
        // buliddate:"创建时间",
        // losedate:"废弃时间",
        // companyId:"企业主键"
      },
      //新增物料表单下拉参数
      addOptions:{
        materName: [],//材质分类
        marStatus: [],//材质状态
        // marFactory: []//材质生产厂家
      },
    };
  }, 
  created(){
    let that = this;
    that.getMarterStatusList({},that.getMarterList({},that.getMarterName()));
    this.getData(this.search.searchData);
  },
  methods: {
      //获取物料分类名称
      getMarterName(data = {}, nextFunc = ()=>{}){
          let that=this;
          selectMatterType({vue: that, params: data}).then(res => {
            //处理数据
            if(res.model){
                that.search.searchConfig[0][0].childrens=res.model;
                that.addOptions.materName=res.model;
            }
            //执行下一步
            if(nextFunc && ('function'=== typeof(nextFunc))){
                nextFunc();
            }
          });
       },
       ///////////////////////doing////////////////////////////
       getMarterList( data = {}, nextFunc = () =>{} ){
         let that=this;    
          listMatter({vue: that, params: data}).then(res => {
            //处理数据
            if(res.model){
              for(let o in res.model){
                that.search.MarInfoList.push({'label': res.model[o].mattersName,'value': res.model[o].mattersNo})
              }
              that.search.searchConfig[0][1].childrens=that.search.MarInfoList;
            }
            //执行下一步
            if(nextFunc && ('function'=== typeof(nextFunc))){
                nextFunc();
            }
          });
       },
       getMarterStatusList( data = {}, nextFunc = () =>{} ){
         let that=this;
         matterStatus({vue: that, params: data}).then(res => {
            if(res.model){
              that.search.MarStatus=res.model;
              that.search.searchConfig[0][2].childrens = that.search.MarStatus;
              that.addOptions.marStatus=res.model;
            }
         });
       },
    ////////////////
    buttonFunction(data) {
      //表格单行末尾查看详情
      this.toastInfoData.dialogVisible = true;
      let params = {};
      for (let attr in this.attrTransfrom) {
        let key = this.attrTransfrom[attr];
        let value = data[attr] ? data[attr] : '-';
        params[key] = value;
      }
      setTimeout(() => {
        this.lookInfoData = params;
      }, 0);
    },
    add() {
      //新增
      this.toastData.title = "新增物料";
      this.toastData.btnData = this.toastSettingBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "add";
      setTimeout(()=>{
         this.$refs["ToastBody"].isAmount = false;
      },0)
    },
    edit() {
      //编辑
      this.toastData.title = "编辑物料";
      this.toastData.btnData = this.toastEditBtn;
      this.toastData.dialogVisible = true;
      this.toastType = "edit";
      if (this.toastType == "edit") {
        setTimeout(() => {
          let {
          id,  
          mattersName,
          mattersTypeId,
          param,
          factory,
          modelDesc,
          norms,
          material,
          level,
          brand,
          status,
          versions,
          unit,
          desc
            // mattersTypeId, //所属分类1
            // crafworkStructId, //所属工艺
            // param, //参数
            // modelDesc, //型号
            // norms, //规格
            // amount,//数量
            // unit, //计量单位
            // material, //材质1
            // level, //等级1
            // remark, //备注
            // prodNo, //产品编号
            // prodName, //产品名称
            // midProdNo,
            // id //id
          } = this.tableConfig.currentSelectArr[0];
          this.$refs["ToastBody"].ruleForm = {
            id,
            mattersName,
            mattersTypeId,
            param,
            factory,
            modelDesc,
            norms,
            material,
            level,
            brand,
            status,
            versions,
            unit,
            desc
            // mattersTypeId,
            // midProdNo,
            // crafworkStructId,
            // param,
            // modelDesc,
            // norms,
            // amount,
            // unit,
            // material,
            // level,
            // remark,
            // prodNo,
            // producInfo:prodNo,
            // prodName,
            // id
          };
          for(let o in this.$refs["ToastBody"].ruleForm){
            if(this.$refs["ToastBody"].ruleForm[o] == '-')this.$refs["ToastBody"].ruleForm[o]='';
          }

        }, 0);
        this.$refs["ToastBody"].isAmount = true;
      }
    },
    save() {
      if (this.toastType == "edit") {
        //编辑
        this.$refs["ToastBody"].submitForm(this.eidtOperation.bind(this));
      } else {
        //新增
        this.$refs["ToastBody"].submitForm(this.addOperation.bind(this,true));
      }
    },
    saveAgain() {
       this.$refs["ToastBody"].submitForm(this.addOperation.bind(this));
    },
    eidtOperation() {
      //编辑实际操作
      let ToastBody = this.$refs["ToastBody"];
      let params = ToastBody.ruleForm;
      // console.log(JSON.stringify(params),JSON.stringify(this.setAttr(params)));
      editMatter({ Vue: this, params: this.setAttr(params) }).then(data => {
        this.$message({
          message: data.message,
          type: "success"
        });
        ToastBody.resetForm();
        this.toastData.dialogVisible = false;
        this.getData(this.search.searchData);
      });
    },
    //添加新数据
    addOperation(flag) {
      //新增实际操作
      let ToastBody = this.$refs["ToastBody"];
      let params = ToastBody.ruleForm;
      delete params["id"];
      delete params["producInfo"];
      insertMatter({ Vue: this, params: this.setAttr(params) }).then(data => {
        this.$message({
          message: data.message,
          type: "success"
        });
        ToastBody.resetForm();
        if (flag) {
          this.toastData.dialogVisible = false;
        }
        this.getData(this.search.searchData);
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
      this.tableConfig.pageNo = 1;
      this.getData(params);
    },
    sizeChange() {
      //分页size变化
      this.getData(this.search.searchData);
    },
    pageChange() {
      //分页page变化
      this.getData(this.search.searchData);
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
          removeMatter({
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
            this.getData(this.search.searchData);//刷新数据
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
     fillData(row){
        let arr={};
        for(let a in this.tableConfig.colConfig){
          if(!row[this.tableConfig.colConfig[a].field])row[this.tableConfig.colConfig[a].field]='-';
        }
        return row;
      },
    getData(data = {}) {
      let that = this;
      //获取分页数据
      data.pageNo = that.tableConfig.pageNo;
      data.pageSize = that.tableConfig.pageSize;
      selectMatterPage({
        params: that.setAttr(data),
        Vue: that
      }).then(data => {
        for(let b in data.model.items){
            that.fillData(data.model.items[b]);
          }
        that.tableData = data.model.items;
        that.tableConfig.total = data.model.numRows;
        that.tableConfig.loadShow = false;
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
  }
};
</script>
