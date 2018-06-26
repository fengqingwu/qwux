import http from './public'
//分页查询空盘
export const EmptyCrmPage = (data)=>{
    return http.fetchPost('/EmptyCoiledMes/pageForEmpty',data)
}
//新增空盘
export const addEmpty = (data)=>{
    return http.fetchPost('/EmptyCoiledMes/insert',data)
}
//编辑空盘 
export const editEmpty = (data)=>{
    return http.fetchPost('/EmptyCoiledMes/update',data)
}
//删除空盘
export const removeempty = (data)=>{
    return http.fetchPost('/EmptyCoiledMes/remove',data)
}
//根据id查询详情 
export const EmptyFindById = (data)=>{
    return http.fetchPost('/EmptyCoiledMes/findById',data)
}
//查询部门下拉
export const findByOrg  = (data)=>{
    return http.fetchPost('/dev/findByOrg',data)
}//查询场地
export const pageForFactory  = (data)=>{
    return http.fetchPost('/FactorySetMes/pageForFactory',data)
}
//查询状态  
export const machineType  = (data)=>{
    return http.fetchPost('/EmptyCoiledMes/machineType',data)
}