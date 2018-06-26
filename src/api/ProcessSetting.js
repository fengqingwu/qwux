import http from './public'
//工艺设置分页查询
export const pageForCrack = (data)=>{
    return http.fetchPost('/crafworkStructPlm/pageForCrack',data)
}
//工艺设置新增
export const insert = (data)=>{
    return http.fetchPost('/crafworkStructPlm/insert',data)
}
//工艺设置编辑
export const update = (data)=>{
    return http.fetchPost('/crafworkStructPlm/update',data)
}
//工艺设置删除
export const remove = (data)=>{
    return http.fetchPost('/crafworkStructPlm /remove',data)
}
//根据id查询工艺
export const findById = (data)=>{
    return http.fetchPost('/crafworkStructPlm/findById',data)
}
//工艺岗位 
export const findByQuar = (data)=>{
    return http.fetchPost('/dev/findByQuar',data)
}
//获取机联网设备
export const machineType = ()=>{
    return http.fetchQuickSearch('/crafworkStructPlm/machineType')
}
//获取工艺参数
export const findByStructId = (data)=>{
    console.log( "dddddd-" , data )
     return http.fetchPost('/crafworkStructPlm/findByStructId',data)
}
//工艺参数设置
 export const updateParam = (data)=>{
     return http.fetchPost('/crafworkStructPlm/updateParam',data)
}





//分页查询产品编码.........................
export const listMidProduct = (data)=>{
    return http.fetchPost('/midProduct/listMidProduct',data)
}