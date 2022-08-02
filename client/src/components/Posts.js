import style from "../styles/Posts.module.css";

export default function Posts({ $target, initialState, callback = null }) {
  this.state = initialState;
  this.$postContainer = document.createElement('div');
  this.$postContainer.className = `${style.postContainer}`;
  $target.appendChild(this.$postContainer);
  
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { posts, isLoading, postSize } = this.state;
    if(isLoading) return;
    const willRender = this.$postContainer.children.length !== posts.length;
    if(!willRender) return;
    console.time('post render');
    const itemFragment = new DocumentFragment();
    posts.slice((-1)*postSize).forEach((post,index) =>{
        const article = document.createElement('article');
        article.setAttribute('data-post-id',`${post._id}`);
        article.className = `${style.post}`
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
        article.insertAdjacentElement('beforeend',postImg);
        article.insertAdjacentElement('beforeend',infoSection);
        // this.$postContainer.insertAdjacentElement('beforeend',article);
        itemFragment.appendChild(article);
    })
    
    this.$postContainer.appendChild(itemFragment);
    console.log(itemFragment);
    console.timeEnd('post render');
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
