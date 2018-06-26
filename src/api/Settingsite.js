import http from './public'
//分页查询生产场地
export const pageForFactory = (data)=>{
    return http.fetchPost('/FactorySetMes/pageForFactory',data)
}
//根据id查询生产场地
export const findById = (data)=>{
    return http.fetchPost('/FactorySetMes/findById',data)
}
//获取管理员
export const findByEmp = (data)=>{
    return http.fetchPost('/dev/findByEmp',data)
}
//新增场地
export const addProdectSite = (data)=>{
    return http.fetchPost('/FactorySetMes/insert',data)
}
//编辑生产场地
export const editProdectSite = (data)=>{
    return http.fetchPost('/FactorySetMes/update',data)
}
//删除生产场地
export const removeProdectSite = (data)=>{
    return http.fetchPost('/FactorySetMes/remove',data)
}
//下拉框
export const factoryType = (data)=>{
    return http.fetchPost('/FactorySetMes/factoryType',data)
}