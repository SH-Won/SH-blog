import {auth} from './utills/api';
import {changeRoute} from './utills/router';
import { selector } from './utills/selector';
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
        if(option === false){
            return await new page({
                ...arg,
            })
        }
        const user = await auth();
        // selector(null,'user',user);
        // console.log('after fetch auth');
        if(!user.isAuth){
            if(option){
                changeRoute('/login',{detail : { route : prevRoute} });
            }
            else{
                return new page({
                    ...arg,
                    user,
                })
            }
        }
        else{
            return new page({
                ...arg,
                user,
            })
            
        }
    }

    return Authentication;
}