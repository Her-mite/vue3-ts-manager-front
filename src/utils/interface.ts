// 定义用户数据类型
export interface user {
    username: string,
    password: string
}

// 登录结果
export interface signResult {
    isSuccess: boolean,
    errorMessage?: string // errorMessage可选
}

// 导航标签
declare type RouteRecordName = string | symbol
export interface tagItem {
    name: RouteRecordName,
    title: unknown,
    path: string,
}

// todolist数据类型
export interface draggableItem {
    date: string,
    list: {
        optionalList: string[];
        todoList: string[];
        completeList: string[];
    }
}

