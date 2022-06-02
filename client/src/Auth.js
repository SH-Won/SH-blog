import {auth} from './utills/api';
import {changeRoute} from './utills/router';
export default function (page,option,admin = null){
    // option ( true = need login , false = not to need)
    function Authentication(arg){
        auth().then(response =>{
            if(!response.isAuth){
                if(option){
                    changeRoute('/login');
                }
            }else{
                if(option === false){

                }
            }
        })
        return new page({
            ...arg,
        })
    }

    return Authentication;
}