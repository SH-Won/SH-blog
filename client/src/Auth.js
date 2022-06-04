import {auth} from './utills/api';
import {changeRoute} from './utills/router';
export default function (page,option,pre= null ,admin = null){
    // option ( true = need login , false = not to need)
    async function Authentication(arg){
        
        const user = await auth();
        if(!user.isAuth){
            if(option){
                changeRoute('/login',{detail : pre });
            }
            else{
                return new page({
                    ...arg,
                    user,
                })
            }
        }
        else{
            console.log('user login');
            return new page({
                ...arg,
                user,
            })
            
        }
    }

    return Authentication;
}