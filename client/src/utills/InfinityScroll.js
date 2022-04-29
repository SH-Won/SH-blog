// export default function InfinityScroll({initialState,loadMore}){
//     this.state = initialState;
    
//     this.setState = (nextState) =>{
//         this.state = nextState;
//         this.init();
//     }
    
//     this.handleScroll = (([entry],ob) =>{
//         if(entry.isIntersecting && this.state.hasMore){
//             loadMore();
//             ob.unobserve(entry.target);
//         }
//     })

//     this.init = () =>{
//         if(!this.state.element) return;
//         if(this.state.loading)  return;
//         const observer = new IntersectionObserver(this.handleScroll,{threshold:0.8});
//         observer.observe(this.state.element);
//     }
//     this.init();

// }
export const InfinityScroll = (element,callback,hasMore,loading) =>{
    let observer = null;
    console.log('hasmore',hasMore,'loading',loading);
    const handleScroll = (([entry],ob) =>{
        if(entry.isIntersecting && hasMore){
            callback();
            ob.unobserve(entry.target);
        }
    })
    // const loadMore = (element) =>{
    //     if(loading) return;
    //     console.log(observer);
    //     // if(observer) observer.disconnect();
    //     observer = new IntersectionObserver(handleScroll,{threshold:0.8});
    //     if(element) observer.observe(element);
    // }
    // return loadMore;
    if(loading) return;
    observer = new IntersectionObserver(handleScroll,{threshold:0.8});
    if(element) observer.observe(element);
}