import {auth} from './utills/api';
import {changeRoute} from './utills/router';
export default function (page,option,pre= null ,admin = null){
    // option ( true = need login , false = not to need)
    async function Authentication(arg){
        let needLogin = false;
        // await auth().then(response =>{
        //     if(!response.isAuth){
        //         if(option){
        //             needLogin = true;
        //         }
        //     }else{
        //         if(option === false){
                 
        //         }
        //     }
        // })
        const {isAuth} = await auth();
        if(!isAuth){
            if(option){
                changeRoute('/login',{detail : pre });
            }
            else{
                return new page({
                    ...arg,
                })
            }
        }
        else{
            if(option === false){

            }
            return new page({
                ...arg,
            })
        }
    }

    return Authentication;
}