import http from './public'
//获取设备信息
export const mesForMachine = (data)=>{
    return http.fetchPost('/machineSetMes/pageForMachine',data)
}
//获取人员信息
export const getMes = (data)=>{
    return http.fetchPost('/empBar/pageEmp',data)
}
//查询上机记录
export const pageForRecord = (data)=>{
    return http.fetchPost('/EmpMacRecordMes/pageForRecord',data)
}
 