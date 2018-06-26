import http from './public'
// 物料分类下拉 
export const selectMatterType = (data)=>{
    return http.fetchPost('/matterType/selectMatterType',data)
}

//物料下拉
export const listMatter = (data)=>{
    return http.fetchPost('/matterStore/listMatter',data)
}
//生产厂家下拉 要传pageSize
export const pageForFactory = (data)=>{
    return http.fetchPost('/FactorySetMes/pageForFactory',data)
}
//物料状态查询
export const matterStatus = (data)=>{
    return http.fetchPost('/matterStore/matterStatus',data)
}

//分页查询
export const selectMatterPage = (data)=>{
    return http.fetchPost('/matterStore/selectMatterPage',data)
}   
//新增物料
export const insertMatter = (data)=>{
    return http.fetchPost('/matterStore/insertMatter',data)
}  
//物料编辑
export const editMatter = (data)=>{
    return http.fetchPost('/matterStore/editMatter',data)
}  
//物料删除
export const removeMatter = (data)=>{
    return http.fetchPost('/matterStore/removeMatter',data)
}  