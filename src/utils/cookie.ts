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