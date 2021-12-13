import { changeRoute } from '../utills/router.js';

export default function Posts({$target,initialState}){
    this.state = initialState;
    const $postContainer = document.createElement('div');
    $postContainer.className = 'postContainer';
    $target.appendChild($postContainer);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        const {posts} = this.state;
        if(posts === null) return;
        const templete = posts.map(post => `
        <div class="post" data-post-id="${post._id}">
        <div class="post_image">
        <img src="${post.imageUrl}" />
        </div>
        <ul>
        <li>${post.title}</li>
        </ul>
        </div>
        `).join('');
        $postContainer.innerHTML = templete;
    }
    this.render();
    $postContainer.addEventListener('click',e=>{
        const $post = e.target.closest('.post');
        console.log($post);
        const {postId} = $post.dataset;
        console.log(postId);
        if(postId){
        changeRoute(`/post/${postId}`);
        }
    })
}