import http from './public'
//生产制令单分页查询
export const taskEmpApsPage = (data)=>{
    return http.fetchPost('/taskEmpAps/page',data)
}
//新增指令单
export const insTaskEmp = (data)=>{
    return http.fetchPost('/taskEmpAps/insTaskEmp',data)
}
//生产制令单编辑
export const editTaskEmp = (data)=>{
    return http.fetchPost('/taskEmpAps/editTaskEmp',data)
}
//生产制令单删除
export const removeTaskEmp = (data)=>{
    return http.fetchPost('/taskEmpAps/removeTaskEmp',data)
}
//设备信息查询
export const optionDev = (data)=>{
    return http.fetchPost('/dev/optionDev',data)
}
//工艺信息查询
export const findByPM = (data)=>{
    return http.fetchPost('/ProdCrafworkPath/findByPM',data)
}
//半产品编码查询
export const listMidProduct = (data)=>{
    return http.fetchPost('/midProduct/listMidProduct',data)
}
//工艺信息查询
export const productlist = (data)=>{
    return http.fetchPost('/productStorePlm/productlist',data)
}