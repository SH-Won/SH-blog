import style from "../styles/Posts.module.css";

export default function Posts({ $target, initialState, callback = null }) {
  this.state = initialState;
  this.$postContainer = document.createElement('div');
  this.$postContainer.className = `${style.postContainer}`;
  // $postContainer.className = 'page--article';
  $target.appendChild(this.$postContainer);
  
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.removeAllChild = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  this.render = () => {
    const { posts, isLoading } = this.state;
    // const {posts,isLoading,end=0,checkToggle=false,postSize} = this.state;
    // console.log(checkToggle,postSize);
    // console.log(checkToggle,postSize);
    // if(!posts.length || isLoading || postSize === 0) return;
    // if(checkToggle) this.removeAllChild($postContainer);

    // const template = posts.slice(checkToggle ? 0 : end).map((post,index) => `
    // <div class="${style.post}" data-post-id="${post._id}">
    // <div class="${style.imageContainer}">
    // <img src="${post.imageUrls ? post.imageUrls[0] : post.thumbnail}" />
    // </div>
    // <ul class="${style.info}">
    // <li>${post.title}</li>
    // </ul>
    // </div>
    // `).join('');

    // // this.removeAllChild($postContainer);
    // console.time('post render');
    // $postContainer.insertAdjacentHTML('beforeend',template);
    // console.timeEnd('post render');

    // const template = posts
    //   .map(
    //     (post, index) => `
    //     <div class="${style.post}" data-post-id="${post._id}">
    //     <div class="${style.imageContainer}">
    //     <img src="${post.imageUrls ? post.imageUrls[0] : post.thumbnail}" />
    //     </div>
    //     <ul class="${style.info}">
    //     <li>${post.title}</li>
    //     </ul>
    //     </div>
    //     `
    //   )
    //   .join("");
    // console.time("posts render");
    // $postContainer.innerHTML = template;
    // console.timeEnd("posts render");
    this.$postContainer.innerHTML = '';
    posts.forEach((post,index) =>{
        const postDiv = document.createElement('article');
        postDiv.setAttribute('data-post-id',`${post._id}`);
        postDiv.className = `${style.post}`
        const postImg = document.createElement('figure');
        postImg.className = `${style.imageContainer}`;
        const img = document.createElement('img');
        img.src = `${post.imageUrls ? post.imageUrls[0] : post.thumbnail}`;
        postImg.insertAdjacentElement('beforeend',img);
        const infoSection = document.createElement('section');
        infoSection.className = `${style.info}`;
        const title = document.createElement('h3');
        title.innerText = `${post.title}`;
        infoSection.insertAdjacentElement('beforeend',title);
        postDiv.insertAdjacentElement('beforeend',postImg);
        postDiv.insertAdjacentElement('beforeend',infoSection);
        this.$postContainer.insertAdjacentElement('beforeend',postDiv);
    })
  };
  this.render();

  this.$postContainer.addEventListener("click", (e) => {
    const $post = e.target.closest("article");
    if ($post) {
      const { postId } = $post.dataset;
      if (postId) {
        callback(postId);
      }
    }
  });
}
