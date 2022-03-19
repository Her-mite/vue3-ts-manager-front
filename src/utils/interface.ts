// 定义用户数据类型
export interface user {
    username: string,
    password: string
}

// 登录结果
export interface loginResult {
    isLogin: boolean,
    errorMessage?: string // errorMessage可不存在
}
