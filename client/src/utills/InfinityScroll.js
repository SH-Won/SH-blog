export default function InfinityScroll({initialState,loadMore}){
    this.state = initialState;

    this.setState = (nextState) =>{
        this.state = nextState;
        this.init();
    }
    
    const handleScroll = (([entry],ob) =>{
        if(entry.isIntersecting && this.state.hasMore){
            loadMore();
            ob.unobserve(entry.target);
        }

    })
    this.init = () =>{
        if(!this.state.element) return;
        const observer = new IntersectionObserver(handleScroll,{threshold:0.8});
        observer.observe(this.state.element);
    }

}