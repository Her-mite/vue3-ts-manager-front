import{ user_data } from '../data/password';
import{ Base64 } from 'js-base64';
import{ PASSWORD_VALIDATE_RESULT } from '../constants/message';
import { loginResult } from './interface';

// 校验用户名和密码
export function validate_password(username: string, password: string): loginResult{
    const password_base64 = Base64.encode(password);
    const user_index = user_data.findIndex(item=>{        
        return item.username === username;
    });    

    if(user_index === -1){
        // 用户不存在
        return {
            isLogin: false,
            errorMessage: PASSWORD_VALIDATE_RESULT.USER_NOT_EXIST
        };
    }else if(user_data[user_index].password === password_base64){
        // 密码校验通过
        return {
            isLogin: true
        };
    }else{
        // 密码错误
        return {
            isLogin: false,
            errorMessage: PASSWORD_VALIDATE_RESULT.PASSWORD_ERROR
        };
    }
}
