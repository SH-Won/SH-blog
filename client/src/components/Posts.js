import style from "../styles/Posts.module.css";

export default function Posts({ $target, initialState, callback = null }) {
  this.state = initialState;
  const $postContainer = document.createElement("article");
  $postContainer.className = `${style.postContainer}`;
  // $postContainer.className = 'page--article';
  $target.appendChild($postContainer);
  
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

    const template = posts
      .map(
        (post, index) => `
        <div class="${style.post}" data-post-id="${post._id}">
        <div class="${style.imageContainer}">
        <img src="${post.imageUrls ? post.imageUrls[0] : post.thumbnail}" />
        </div>
        <ul class="${style.info}">
        <li>${post.title}</li>
        </ul>
        </div>
        `
      )
      .join("");
    console.time("posts render");
    $postContainer.innerHTML = template;
    console.timeEnd("posts render");

    // posts.forEach((post,index) =>{
    //     const postDiv = document.createElement('div');
    //     postDiv.setAttribute('data-post-id',`${post._id}`);
    //     postDiv.className = `${style.post}`
    //     const postImg = document.createElement('div');
    //     postImg.className = `${style.imageContainer}`;
    //     const img = document.createElement('img');
    //     img.src = `${post.imageUrls ? post.imageUrls[0] : post.thumbnail}`;
    //     postImg.insertAdjacentElement('beforeend',img);
    //     const ulist = document.createElement('ul');
    //     ulist.className = `${style.info}`;
    //     const li = document.createElement('li');
    //     li.innerText = `${post.title}`;
    //     ulist.insertAdjacentElement('beforeend',li);
    //     postDiv.insertAdjacentElement('beforeend',postImg);
    //     postDiv.insertAdjacentElement('beforeend',ulist);
    //     $postContainer.insertAdjacentElement('beforeend',postDiv);
    // })
  };
  this.render();

  $postContainer.addEventListener("click", (e) => {
    const $post = e.target.closest("article > div");
    if ($post) {
      const { postId } = $post.dataset;
      if (postId) {
        callback(postId);
      }
    }
  });
}
