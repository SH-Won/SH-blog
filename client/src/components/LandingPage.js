import {request} from '../utills/api.js';
import Posts from './Posts.js';

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
        cache.root = this.state.posts;
    }
    const posts = new Posts({
        $target : $page,
        initialState:this.state,
        loadMore : fetchPosts,
    })
    if(!cache.root){
        console.log(cache);
        fetchPosts();
    }
}