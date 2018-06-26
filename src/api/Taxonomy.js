import http from './public'

//分页查询 
export const findPageProdType = (data)=>{
    return http.fetchPost('/prodType/findPageProdType',data)
}
// //下拉查询 
// export const selectProdType = (data)=>{
//     return http.fetchPost('/prodType/selectProdType',data)
// }
//产品新增 
export const addProdType = (data)=>{
    return http.fetchPost('/prodType/addProdType',data)
}
//产品编辑 
export const editProdType = (data)=>{
    return http.fetchPost('/prodType/editProdType',data)
}
//产品删除
export const removeProdType = (data)=>{
    return http.fetchPost('/prodType/removeProdType',data)
}