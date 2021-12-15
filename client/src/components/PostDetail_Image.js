export default function PostDetail_Image({$target,initialState}){
    this.state = initialState;
    const $postDetail = document.createElement('div');
    $postDetail.className = 'postDetail';
    $target.appendChild($postDetail);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        const {post} = this.state;
        $postDetail.innerHTML = `
        <div class="postDetail_image">
        <img src="${post.imageUrl}" />
        </div>
        `

    }
    this.render();

}