import http from './public'

//分页查询半成品
export const selectMidPage = (data)=>{
    return http.fetchPost('/midProduct/selectMidPage',data)
}
//新增半成品
export const insertMid = (data)=>{
    return http.fetchPost('/midProduct/insertMid',data)
}

//编辑半成品
export const editMid = (data)=>{
    return http.fetchPost('/midProduct/editMid',data)
}
//半产品删除  
export const removeMidProduct = (data)=>{
    return http.fetchPost('/midProduct/removeMidProduct',data)
}
//半产品下拉  
export const listMidProduct = (data)=>{
    return http.fetchPost('/midProduct/listMidProduct',data)
}
//生产场地下拉 
export const pageForFactory = (data)=>{
    return http.fetchPost('/FactorySetMes/pageForFactory',data)
}
//所属工艺下拉
export const findByPM = (data)=>{
    return http.fetchPost('/ProdCrafworkPath/findByPM',data)
}