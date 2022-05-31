import { request } from '../utills/api';
import Posts from '../components/Posts';

export default function BestPage({$target,cache}){
    const $page = document.createElement('div');
    this.state = {
        posts:cache.bestPosts ? cache.bestPosts : []
    }
    this.setState =(nextState) =>{
        this.state = nextState;
        this.render()
    }
    this.render = () =>{
        $target.appendChild($page);
        new Posts({
            $target:$page,
            initialState:{
                posts : this.state.posts
            }
        })
    }
    const fetchBestPosts = async () =>{
         try{
             const regex = /최|백|이/g;
             const {posts,postSize} = await request();
             const bestPosts  = posts.filter(post => post.title.match(regex));
             this.setState({
                 ...this.state,
                 posts:bestPosts,
             })
         }catch(e){

         }finally{
             cache.bestPosts = this.state.posts;
         }
    }
    if(!cache.bestPosts){
    fetchBestPosts();
    }
}