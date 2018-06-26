//首页
<template>
  <page :pageData="pageData"></page>
</template>
<script>
  export default {
    data() {
      return {
        pageData: {
          pocHeaderData: [{
            title: '物控中心'
          },
          {
            title: '排程管理'
          },
          {
            title: '现场管理'
          }],
          sidebarData: [{
            visible: true,
            title: '物控中心',
            path: '/',
            data: [{
                name: '产品库',
                router: '/'
              },
               {
                name: '工艺设置',
                router: '/ProcessSetting'
              },
              {
                name: '产品工艺路线',
                router: '/ProductionProcessRoute'
              },
               {
                name: '设备库',
                router: '/EquipmentLibrary'
              },
               {
                name: '物料分类设置',
                router: '/MaterialClassification'
              },
                {
                name: '产品分类',
                router: '/Taxonomy'//'/ProductCategory'
              },
              {
                name: '物料库',
                router: '/MaterialStorehouse'
              },
                {
                name: '半成品编码',
                router: '/SemifinishedWarehouse'
              },
              {
                name: '产品Bom构成',
                router: '/ProductBomComposition'
              },
          
            ]
          },
          {
            visible: true,
            title: '排程管理',
            path: '/ProductionOrders',
            data:[
             {
                name: '生产制令单',
                router: '/ProductionOrders'
              },
              ]},
              
              {
            visible: true,
            title: '现场管理',
            path: '/StaffIdentificationLibraryCode',
            data:[
                 {
                name: '人员识别库码',
                router: '/StaffIdentificationLibraryCode'
              },
                   {
                name: '空盘编码库',
                router: '/SpaceDiskCode',
           chlid:[
             {
                 name: '空盘编码库',
                router: '/SpaceDiskCode',
             },
                  {
                  name: '人员上机记录',
                router: '/PersonnelEntryRecord'
                  }
                ] 
              },
                  {
                name: '生产场地设置',
                router: '/ProductionSiteSetting'
              },
                     {
                name: '设备产出记录',
                router: '/EquipmentOutputRecord',
                chlid:[    
                  {
                name: '设备产出记录',
                router: '/EquipmentOutputRecord',
                   },
                  {
                    name:'损耗查询',
                     router:'/MachineLoss'
                  }
               
                  
                ]
              },
              ]}         
              
              ]
        }
      }
    }
  }

</script>
<style lang="less">


</style>
