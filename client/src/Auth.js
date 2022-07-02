import {auth} from './utills/api';
import {changeRoute} from './utills/router';
import { selector } from './utills/selector';
import { setItem } from './utills/storage';
export default function (page,option,prevRoute = null ,admin = null){
    // option ( true = need login , false = not to need)
    async function Authentication(arg){
        // const userInfo = selector((state) => state.user);
        // if(userInfo && userInfo.isAuth){
        //     console.log('exist user')
        //     return await new page({
        //     ...arg,
        //     user:userInfo,
        // })
        // }
        // console.log('before fetch auth')
        // if(option === false){
        //     return await new page({
        //         ...arg,
        //         user,
        //     })
        // }
        // const loginSuccess = selector(state => state?.loginSuccess);
        // if(option === false){
        //     return await new page({
        //         ...arg,
        //     })
        // }
        console.time('auth');
        const result = await auth();
        console.timeEnd('auth');
        console.log(result);
        
        // selector(null,'user',user);
        // console.log('after fetch auth');
        if(!result.user.isAuth){
            if(option){
                changeRoute('/login',{detail : { route : prevRoute} });
            }
            else{
                return new page({
                    ...arg,
                    user:result.user,
                })
            }
        }
        else{
            const {token,refreshToken} = result;
            setItem('authorization',token);
            setItem('refreshToken',refreshToken);
            return new page({
                ...arg,
                user:result.user,
            })
            
        }
    }

    return Authentication;
}