//产品分类
<template>
  <div class="productLibrary">
        <!--  表格 -->
        <mes-table :tableConfig="tableConfig" :tableData="tableData" @sizeChange="sizeChange" @pageChange="pageChange" @add="add"
          @remove="remove" @edit="edit" ></mes-table>
        <!-- 仓储设置or修改 -->
        <mes-toast :config="toastData" @close="close" @save="save" @saveAgain="saveAgain" @handleClose="close">
            <toast-body ref="ToastBody"></toast-body>
        </mes-toast>
  </div>
</template>
<script>
import { findPageProdType, //分页查询
  // selectProdType,  //下拉查询
  addProdType, //产品新增
  editProdType,//产品编辑
  removeProdType,//产品删除
} from '../../api/Taxonomy'
import {productlist} from '../../api/index';
import ToastBody from './prodToastBody'
export default {
  data(){
    return{
        toastType:'',
        lookInfoData:{},
        toastData: {
          title: '新增半成品', //弹窗标题
          dialogVisible: false, //弹窗显示
          width: '500px', //弹窗宽
          btnData: []
        },
        toastSettingBtn:[{
            name: '取消', //按钮名
            method: 'close', //回调函数
            bgColor: 'dialog-white' //按钮背景
          }, {
            name: '保存',
            method: 'save',
            bgColor: 'dialog-deep-blue'
          }, {
            name: '保存并继续',
            method: 'saveAgain',
            bgColor: 'dialog-bule'
          }],
          toastEditBtn:[{
            name: '取消', //按钮名
            method: 'close', //回调函数
            bgColor: 'dialog-white' //按钮背景
          }, {
            name: '修改',
            method: 'save',
            bgColor: 'dialog-deep-blue'
          }],
        tableConfig: {
          //操作按钮配置
          toolbarConfig: [{
              icon: 'plus',
              disabled: false,
              method: 'add',
               type:'primary',
              name: '新增'
            },
            {
              icon: 'edit-outline',
              disabled: true,
              method: 'edit',
              name: '编辑'
            },
            {
              icon: 'delete',
              disabled: true,
              method: 'remove',
              name: '删除'
            }
          ],
          //表格字段配置
          colConfig: [{
              field: "typeNo",
              label: "分类编码",
              type: "text"
            },{
              field: "typeDesc",
              label: "分类名称",
              type: "text"
            },
            {
              field: "companyId",
              label: "企业表示",
              type: "text"
            }
          ],
          isSelection: true, //是否可选
          isPage: true, //是否分页
          currentSelectArr: [], //当前勾选的数据
          align: 'center', //文本对齐方式
          pageNo: 1,
          pageSize: 20,
          total: 0,
          isHigh: false,
          isLoading: true, //是否开启loading
          loadShow: false, //loading控制
        },
        tableData: []
    }
  },
  mounted () {      
    //获取表格数据
    this.getDate();    
  },
  methods:{
    add(){//新增
        this.toastData.title = "产品分类新增"
        this.toastData.btnData = this.toastSettingBtn;
        this.toastData.dialogVisible = true;
        this.toastType = 'add';
    },
    edit(){//编辑
        this.toastData.title = "产品分类编辑"
        this.toastData.btnData = this.toastEditBtn;
        this.toastData.dialogVisible = true; 
        this.toastType = 'edit';
        if(this.toastType == 'edit'){
          setTimeout(()=>{
            let {
                typeDesc,
                id//id
              } = this.tableConfig.currentSelectArr[0];
            this.$refs['ToastBody'].ruleForm = {typeDesc,id};
          },0)
       }
    },
    save(){
        if(this.toastType=='edit'){
           //编辑
          this.$refs['ToastBody'].submitForm(this.eidtOperation.bind(this));
        }else{
          //新增
          this.$refs['ToastBody'].submitForm(this.addOperation.bind(this,true));
        }
    },
    saveAgain(){
          this.$refs['ToastBody'].submitForm(this.addOperation.bind(this));
    },
    eidtOperation(){//编辑实际操作
      let ToastBody =  this.$refs['ToastBody'];
      let params = ToastBody.ruleForm;
      editProdType({Vue:this,params:this.setAttr(params)}).then(data=>{
             this.$message({
                message: data.message,
                type: 'success'
              });
              ToastBody.resetForm();
              this.toastData.dialogVisible = false;
              this.getDate();
      })    
    },
    addOperation(flag){//新增实际操作
      let ToastBody =  this.$refs['ToastBody'];
      let params = ToastBody.ruleForm;
      delete params['id']
      addProdType({Vue:this,params:this.setAttr(params)}).then(data=>{
             this.$message({
                message: data.message,
                type: 'success'
              });
              ToastBody.resetForm();
              if (flag) {
                this.toastData.dialogVisible = false;
              }
              this.getDate();
      })
    },
    close(){//关闭弹窗
     this.$refs['ToastBody'].resetForm();
     this.toastData.dialogVisible = false;
    },
    sizeChange(){//分页size变化
      this.getDate();
    },
    pageChange(){//分页page变化
      this.getDate();
    },
    remove(){//删除
        let len = this.tableConfig.currentSelectArr.length - 1;
        let ids = '';
        //判断删除的size是否等于当前页的数量
        this.tableConfig.currentSelectArr.forEach((item, index) => {
          ids += len === index ? item.id : item.id + ',';
        })
        let flag = this.tableData.length === this.tableConfig.currentSelectArr.length;
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeProdType({
            Vue: this,
            params: {
              ids
            }
          }).then(data => {
            this.$message({
              message: data.message,
              type: 'success'
            });
            //回到上一页     
            if (flag) {
              this.tableConfig.pageNo += this.tableConfig.pageNo - 1 >= 1 ? -1 : 0;
            }
            this.getDate(); //刷新数据     
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    getDate(data = {}) { //获取分页数据
        data.pageNo = this.tableConfig.pageNo;
        data.pageSize = this.tableConfig.pageSize;
        findPageProdType({
          params: this.setAttr(data),
          Vue: this
        }).then(data => {
          this.tableData = data.model.items;
          this.tableConfig.total = data.model.numRows;
          this.tableConfig.loadShow = false;
        })
      },
      setAttr(data) {
        for (let attr in data) {
          if (!data[attr]&&attr!='remark') {
            delete data[attr]
          }
        }
        return data;
      }
  },
  watch: {
      'tableConfig.currentSelectArr': function () { //按钮控制
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
        ToastBody
    }
}
</script>


