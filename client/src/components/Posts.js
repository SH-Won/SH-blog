import { changeRoute } from '../utills/router.js';
import style from '../styles/Posts.module.css'
import Button from '../components/Button.js';
export default function Posts({$target,initialState,loadMore}){
    this.state = initialState;
    const $postContainer = document.createElement('article');
    $postContainer.className = `${style.postContainer}`;
    $target.appendChild($postContainer);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        const {posts} = this.state;
        console.log(this.state);
        if(!posts.length) return;
        const templete = posts.map(post => `
        <div class="${style.post}" data-post-id="${post._id}">
        <div class="${style.imageContainer}">
        <img src="${post.imageUrl}" />
        </div>
        <ul class="${style.info}">
        <li>${post.title}</li>
        </ul>
        </div>
        `).join('');
        $postContainer.innerHTML = templete;
        new Button({
            $target : $postContainer,
            initialState:{
               name:"더 보기",
            },
        })
    }
    this.render();
    $postContainer.addEventListener('click',e=>{
        const $post = e.target.closest('article > div'); 
        if($post){
            const {postId} = $post.dataset;
            if(postId){
            changeRoute(`/post/${postId}`);
            }
        }
        const $button = e.target.closest('button');
        if($button){
            loadMore()
        }
        
    })
}