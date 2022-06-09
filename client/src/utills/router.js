import { destoryImage } from './api';

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
    window.history.pushState(params,null,url);
    // window.history.pushState()
    window.dispatchEvent(new CustomEvent(ROUTE_EVENT,params));
}