// 手机号码
export const mobile = /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
// 邮箱
export const email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
// 用户名
export const userid = /^[a-zA-Z0-9_-]{3,12}$/; // 3到12位字母和数字
// 密码
export const password = /^[a-zA-Z0-9_-]{3,12}$/; // 3到12位字母和数字
// 参数名
export const paramKey = /^[a-zA-Z_-]{2,20}$/; // 2到20位字母
// 权限选择菜单为空
export const menuIds = /[^-6666666]/;