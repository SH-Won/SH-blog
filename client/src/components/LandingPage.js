import {request} from '../utills/api.js';
import Posts from './Posts.js';
import Button from './Button.js';
import Loading from './Loading.js';
import  {InfinityScroll}  from '../utills/InfinityScroll.js';

export default function LandingPage({$target,initialState,cache}){

    const $page = document.createElement('div');
    $page.className = 'landingPage';
    $target.appendChild($page);
    
    this.state = {
        ...initialState,
        isLoading:true,
    };
    this.setState = (nextState) =>{
        this.state = nextState;
        posts.setState({
            ...this.state,
            posts: this.state.posts,
        })
        loading.setState(this.state.isLoading);
        loadMoreBtn.setState({
            ...loadMoreBtn.state,
            visible: this.state.postSize < this.state.limit ? false : true,
        })
        this.init();
    }
    this.init = () =>{
        console.log(this.state);
       const hasMore = this.state.postSize >= this.state.limit;
       const loading = this.state.isLoading;
       const element = $page.firstElementChild.lastElementChild;
       const loadMore = InfinityScroll(this.fetchPosts,hasMore,loading);
       loadMore(element);
    }
    
    this.fetchPosts = async () =>{
        try{
        const params = {
            skip:this.state.skip,
            limit:this.state.limit,
        }
        this.setState({
            ...this.state,
            isLoading:true,
        })
        const {posts,postSize} = await request("",params);
        this.setState({
            ...this.state,
            posts : [...this.state.posts,...posts],
            skip : this.state.skip + this.state.limit,
            postSize,
            isLoading:false,
        })
        }catch(e){

        }finally{
            cache.root = this.state;
        }
        
    }
    const posts = new Posts({
        $target : $page,
        initialState:this.state,
    })
    const loading = new Loading({
        $target:$page,
        initialState: true,
    })
    const loadMoreBtn = new Button({ 
        $target : $page,
        initialState:{
            name:"더 보기",
            className:"loadMore-btn",
            visible : this.state.postSize < this.state.limit ? false : true,
            style:{
                width:'10%',
                textAlign:'center',
                border:'none',
                background:'whitesmoke',
                borderRadius:'4px',
                boxShadow:'0 0 2px #2c87f0',
                outline:'transparent',
                color:'#4a96ee',
                margin:'auto'
            }
        },
    })
    if(!cache.root){
        this.fetchPosts();
    }

    $page.addEventListener('click',e=>{
        if(e.target.className !=='loadMore-btn') return;
        this.fetchPosts();
    })
}