import http from './public'
//分页查询
export const staffCrmPage = (data)=>{
    return http.fetchPost('/empBar/grid',data)
}
//新增人员
export const addStaff = (data)=>{
    return http.fetchPost('/empBar/add',data)
}
//可输可选框
export const writeAndSelect = (data)=>{
    return http.fetchPost('/empBar/pageEmp',data)
}
//编辑识别码
export const editBarCode = (data)=>{
    return http.fetchPost('/empBar/get',data)
}
//删除识别码
export const removeBarCode = (data)=>{
    return http.fetchPost('/empBar/del',data)
}
//打印信息查询
export const queryPrintInformation  = (data)=>{
    return http.fetchPost('/empBar/findEmp',data)
}