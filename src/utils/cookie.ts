// 存储cookie
export function setCookie(name: string, value: string) {
    const hours = 3; //此 cookie 将被保存 3 小时
    const exp = new Date();    //获取当前时间
    exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString(); //escape对字符串编码
}

// 获取cookie
export function getCookie(name: string) {
    const arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr != null) {
        return unescape(arr[2]);
    }
    return null;
}

// 删除cookie
export function deleteCookie(name: string): void {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null) {
        // 设置为一个过去的时间
        document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
    }
}