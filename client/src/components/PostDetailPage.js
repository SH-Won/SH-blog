import { request } from '../utills/api';
import PostDetail from './PostDetail';

export default function PostDetailPage({$target,postId}){
    this.state = {
        postId,
        post:null,
    }
    const $page = document.createElement('div');
    $page.className = 'postDetailPage';

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        const {post} = this.state;
        if(!post) return;
        $target.appendChild($page);
        new PostDetail({
            $target:$page,
            initialState:{
                post:this.state.post[0],
            }
        }) 
    }
    this.fetchPost = async () =>{
        const post = await request(`/detail?postId=${postId}`);
        this.setState({
            ...this.state,
            post,
        })
    }
    this.fetchPost();
}