/**created by fengqingwu 180620**/
import http from "./public"

//get Machine output Records
export const selectMacPage = (data) => {
	return http.fetchPost('/macOutPut/selectMacPage',data)
}
//详情
export const selectMacMSg = (data)=>{
    return http.fetchPost('/macOutPut/selectMacMSg',data)
}
