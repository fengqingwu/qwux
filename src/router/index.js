import Vue from 'vue'
import Router from 'vue-router'
//主路由
const index = () =>
  import ('../page/index.vue'); //首页应用中心
const productLibrary = () =>
  import ('../page/productLibrary');//产品库
const EquipmentOutputRecord = () =>
  import ('../page/EquipmentOutputRecord');//设备产出记录
const ProductionOrders = () =>
  import ('../page/ProductionOrders');//生产制令单
const ProcessSetting = () =>
  import ('../page/ProcessSetting');//工艺设置
const ProductionProcessRoute = () =>
  import ('../page/ProductionProcessRoute');//产品工艺路线
const EquipmentLibrary = () =>
  import ('../page/EquipmentLibrary');//设备库
const MaterialClassification = () =>
  import ('../page/MaterialClassification')//物料分类设置
const MaterialStorehouse = () =>
  import ('../page/MaterialStorehouse')//物料库
const SemifinishedWarehouse = () =>
  import ('../page/SemifinishedWarehouse')//半成品编码
const ProductBomComposition = () =>
  import ('../page/ProductBomComposition')//产品Bom构成
const StaffIdentificationLibraryCode = () =>
  import ('../page/StaffIdentificationLibraryCode')//人员识别库码
  const SpaceDiskCode = () =>
  import ('../page/SpaceDiskCode')//空盘
  const PersonnelEntryRecord = () =>
  import ('../page/PersonnelEntryRecord')//人员上机记录
  const ProductionSiteSetting= () =>
  import ('../page/ProductionSiteSetting')//生产场地设置
  const LossQuery= () =>
  import ('../page/LossQuery')//损耗查询
  const ProductCategory= () =>
  import ('../page/ProductCategory')//损耗查询
  const Taxonomy = () =>    //产品分类
  import ("../page/Taxonomy")
  /**fengqingwu page start**/  
const MacPro = () =>
  import ('../page/MacPro')//设备产出记录  
const MachineLoss = () =>
  import ('../page/MachineLoss')  //设备损耗

Vue.use(Router)
export default new Router({
  routes: [{
    path: "/",
    name: 'index',
    component: index,
    children: [
    {
      path: "/",
      component: productLibrary,
      name: "productLibrary"
    },
    {
      path: "/EquipmentOutputRecord",
      component: EquipmentOutputRecord,
      name: "EquipmentOutputRecord"
    },
    {
      path: "/ProductionOrders",
      component: ProductionOrders,
      name: "ProductionOrders"
    },
    {
      path: "/ProcessSetting",
      component: ProcessSetting,
      name: "ProcessSetting"
    },
     {
      path: "/ProductionProcessRoute",
      component: ProductionProcessRoute,
      name: "ProductionProcessRoute"
    },
    {
      path: "/EquipmentLibrary",
      component: EquipmentLibrary,
      name: "EquipmentLibrary"
    },
    {
      path: "/MaterialClassification",
      component: MaterialClassification,
      name: "MaterialClassification"
    },
     {
      path: "/MaterialStorehouse",
      component: MaterialStorehouse,
      name: "MaterialStorehouse"
    },

     {
      path: "/ProductBomComposition",
      component: ProductBomComposition,
      name: "ProductBomComposition"
    },
     {
      path: "/StaffIdentificationLibraryCode",
      component: StaffIdentificationLibraryCode,
      name: "StaffIdentificationLibraryCode"
    },
    {
      path: "/SpaceDiskCode",
      component:SpaceDiskCode,
      name: "SpaceDiskCode"
    },
  {
      path: "/SemifinishedWarehouse",
      component:SemifinishedWarehouse,
      name: "SemifinishedWarehouse"
    }, 
    {
      path: "/PersonnelEntryRecord",
      component: PersonnelEntryRecord,
      name: "PersonnelEntryRecord"
    }, 
    {
      path: "/ProductionSiteSetting",
      component:ProductionSiteSetting,
      name: "ProductionSiteSetting"
    }, 
    // {
    //   path: "/LossQuery",
    //   component:LossQuery,
    //   name: "LossQuery"
    // }, 
    {
      path: "/Taxonomy",
      component:Taxonomy,
      name: "Taxonomy"
    }, 
    {
      path: "/MachineLoss",
      component:MachineLoss,
      name: "MachineLoss"
    }, 
    {
      path: "/ProductCategory",
      component: ProductCategory,
      name: "ProductCategory"
    }, 
    ]
  
  }]
})
