const ROUTE_EVENT = 'ROUTE_EVENT';

export const init = (onRouteChange) =>{
    window.addEventListener(ROUTE_EVENT,onRouteChange);
}
export const changeRoute = (url,params) =>{
    window.history.pushState(null,null,url);
    // window.history.pushState()
    window.dispatchEvent(new CustomEvent(ROUTE_EVENT,params));
}