import http from './public'
// 物料分类分页查询
export const findPageMatterType = (data)=>{
    return http.fetchPost('/matterType/findPageMatterType',data)
}
//物料分类添加

export const addMatterType = (data)=>{
    return http.fetchPost('/matterType/addMatterType',data)
}
//物料分类编辑
export const editMatterType = (data)=>{
    return http.fetchPost('/matterType/editMatterType',data)
}
//物料分类删除
export const removeMatterType = (data)=>{
    return http.fetchPost('/matterType/removeMatterType',data)
}