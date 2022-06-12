import { destoryImage } from './api';
import { selector } from './selector';

const ROUTE_EVENT = 'ROUTE_EVENT';

export const init = (onRouteChange) =>{
    window.addEventListener(ROUTE_EVENT,(e) =>{
        const isExist = e.detail !== null && e.detail.hasOwnProperty('haveToDelete');
        if(isExist && e.detail.haveToDelete){
            destoryImage({writer:e.detail.writer});
            return onRouteChange();   
        }
        
        onRouteChange(e.detail);
    });
    
    
}
export const changeRoute = (url,params=null) =>{
    
    window.history.replaceState({from:url},null);
    if(location.pathname === '/edit'){
        const user = selector(state => state.user);
        if(user){
        destoryImage({writer : user._id});
        }
    }
    console.log('url : ',url, 'current :' , location.pathname );
    window.history.pushState(params,null,url);
    window.dispatchEvent(new CustomEvent(ROUTE_EVENT,params));
}