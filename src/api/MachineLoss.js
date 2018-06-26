/**created by fengqingwu 180620**/
import http from "./public"

//获取设备信息
export const pageForMachine = (data) => {
	return http.fetchPost('/machineSetMes/pageForMachine',data)
}
//获取产品信息
export const productStorePlm = (data)=>{
    return http.fetchPost('/productStorePlm/page',data)
}
//获取设备损耗
export const EmpMacRecordMes = (data)=>{
    return http.fetchPost('/WasteRecordMidMes/pageForRecord',data)
}