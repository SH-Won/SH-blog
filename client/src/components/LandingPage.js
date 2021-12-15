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
            posts: this.state.posts,
        })
        this.render();
    }
    this.render = () =>{
        const {posts} = this.state;

    }
    const posts = new Posts({
        $target : $page,
        initialState:{
            posts: this.state.posts,
        }
    })

    const fetchPosts = async () =>{
        const posts = await request();
        this.setState({
            posts,
        })
        cache.root = posts;
    }
    if(!cache.root){
        console.log(cache);
        fetchPosts();
    }
}