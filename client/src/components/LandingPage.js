import {request} from '../utills/api.js';
import Posts from './Posts.js';
import Button from './Button.js';

export default function LandingPage({$target,initialState,cache}){
    
    const $page = document.createElement('div');
    $page.className = 'landingPage';
    $target.appendChild($page);

    this.state = initialState;
    this.setState = (nextState) =>{
        this.state = nextState;
        posts.setState({
            ...this.state,
            posts: this.state.posts,
        })
        loadMoreBtn.setState({
            ...loadMoreBtn.state,
            visible: this.state.postSize < this.state.limit ? false : true,
        })
        this.render();
    }
    this.render = () =>{
        const {posts} = this.state;

    }
    
    const fetchPosts = async () =>{
        const params = {
            skip:this.state.skip,
            limit:this.state.limit,
        }
        const {posts,postSize} = await request("",params);
        this.setState({
            ...this.state,
            posts : [...this.state.posts,...posts],
            skip : this.state.skip + this.state.limit,
            postSize,
        })
        cache.root = this.state;
    }
    const posts = new Posts({
        $target : $page,
        initialState:this.state,
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
    console.log(this.state.postSize,this.state.limit)
    if(!cache.root){
        console.log(cache);
        fetchPosts();
    }
    $page.addEventListener('click',e=>{
        if(e.target.className !=='loadMore-btn') return;
        fetchPosts();
    })
}