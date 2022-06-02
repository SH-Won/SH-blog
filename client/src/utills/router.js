const ROUTE_EVENT = 'ROUTE_EVENT';

export const init = (onRouteChange) =>{
    window.addEventListener(ROUTE_EVENT,(e) =>{
        onRouteChange(e.detail);
    });
}
export const changeRoute = (url,params=null) =>{
    window.history.pushState(params,null,url);
    // window.history.pushState()
    window.dispatchEvent(new CustomEvent(ROUTE_EVENT,params));
}