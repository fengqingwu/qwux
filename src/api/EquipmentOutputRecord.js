import http from './public'
//设备产出记录
export const selectMacPage = (data)=>{
    return http.fetchPost('/macOutPut/selectMacPage',data)
}
//详情
export const selectMacMSg = (data)=>{
    return http.fetchPost('/macOutPut/selectMacMSg',data)
}
