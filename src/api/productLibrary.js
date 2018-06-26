import http from './public'

//产品分页查询 
export const productStoreCrmPage = (data)=>{
    return http.fetchPost('/productStorePlm/page',data)
}
//产品删除
export const removeProduct = (data)=>{
    return http.fetchPost('/productStorePlm/removeProduct',data)
}
//产品新增 
export const addProduct = (data)=>{
    return http.fetchPost('/productStorePlm/addProduct',data)
}
//产品编辑 
export const editProductMsg = (data)=>{
    return http.fetchPost('/productStorePlm/editProductMsg',data)
}
// 树第一层
export const tree = (data)=>{
    return http.fetchPost('/bom/listProduct',data)
}
// 树第二层
export const tree1 = (data)=>{
    return http.fetchPost('/bom/listProductMid',data)
}
// bom详情
export const bom = (data) =>{
    return http.fetchPost('/bom/getBomInfo',data)
}
export const sel = (data) =>{
    return http.fetchPost('/matterStore/listMatter',data)
}
// 设备库
export const EquipmentLibrary = (data) =>{
    return http.fetchPost('/dev/optionDevType',data)
}
// 设备信息
export const EquipmentInformation = (data) =>{
    return http.fetchPost('/dev/optionDev',data)
}
// 设备状态
export const Equipmentstate = (data) =>{
    return http.fetchPost('/machineSetMes/macStatusType',data)
}
// 设备部门
export const EquipmentFindByOrg = (data) =>{
    return http.fetchPost('/dev/findByOrg',data)
}
// // 所属产地
// export const EquipmentFactory = (data) =>{
//     return http.fetchPost('/FactorySetMes/pageForFactory',data)
// }
// 设备新增
export const  EquipmentInsert = (data)=>{
    return http.fetchPost('/machineSetMes/insert',data)
}
// 分页查询设备库
export const  pageForMachine = (data)=>{
    return http.fetchPost('/machineSetMes/pageForMachine',data)
}
// 设备库删除
export const  Equipmentremove = (data)=>{
    return http.fetchPost('//machineSetMes/remove',data)
}
// 设备库编辑
export const  Equipmentupdate = (data)=>{
    return http.fetchPost('/machineSetMes/update',data)
}
// 查看详情
export const  EquipmentfindById = (data)=>{
    return http.fetchPost('/machineSetMes/findById',data)
}


//产品信息下拉 
export const productlist = (data)=>{
    return http.fetchPost('/productStorePlm/productlist',data)
}
//生产场地下拉 
export const pageForFactory = (data)=>{
    return http.fetchPost('/FactorySetMes/pageForFactory',data)
}
//所属分类产品下拉查询 
export const selectProdType = (data)=>{
    return http.fetchPost('/prodType/selectProdType',data)
}
