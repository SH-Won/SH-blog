export default function PostDetail_Info({ $target, initialState }) {
    this.state = initialState;
    const $postDetail_info = document.createElement('div');
    $postDetail_info.className = 'post-detail__information';
    $target.appendChild($postDetail_info);

    this.render = () => {
        $postDetail_info.innerHTML = '정보를 입력하세요';
    };
    this.render();
}
