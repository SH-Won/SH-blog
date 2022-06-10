import {auth} from './utills/api';
import {changeRoute} from './utills/router';
import { selector } from './utills/selector';
export default function (page,option,prevRoute = null ,admin = null){
    // option ( true = need login , false = not to need)
    async function Authentication(arg){
        const userInfo = selector((state) => state.user);
        if(userInfo && userInfo.isAuth) return new page({
            ...arg,
            user:userInfo,
        })
        
        const user = await auth();
        selector(null,'user',user);
        console.log(page,user);
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