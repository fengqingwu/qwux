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
