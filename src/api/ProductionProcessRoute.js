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
export const MacTaskEmp = (data)=>{
    return http.fetchPost('/taskEmpAps/MacTaskEmp',data)
}
//工艺信息查询
export const crafworkTaskEmp = ()=>{
    return http.fetchQuickSearch('/taskEmpAps/crafworkTaskEmp')
}
//盘头组编码
export const listMidProduct = ()=>{
    return http.fetchQuickSearch('/midProduct/listMidProduct')
}
