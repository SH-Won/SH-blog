import { destoryImage } from './api';
import { selector } from './selector';

const ROUTE_EVENT = 'ROUTE_EVENT';

export const init = (onRouteChange) =>{
    window.addEventListener(ROUTE_EVENT,(e) =>{
        const isExist = e.detail !== null && e.detail.hasOwnProperty('haveToDelete');
        if(isExist && e.detail.haveToDelete){
            destoryImage();
            return onRouteChange();   
        }
        
        onRouteChange(e.detail);
    });
    
    
}
export const changeRoute = (url,params=null) =>{
    
    window.history.replaceState({from:url},null);
    if(location.pathname === '/edit'){
        const loginSuccess = selector(state => state?.loginSuccess);
        if(loginSuccess){
        destoryImage();
        }
    }
    console.log('url : ',url, 'current :' , location.pathname );
    window.history.pushState(params,null,url);
    window.dispatchEvent(new CustomEvent(ROUTE_EVENT,params));
}