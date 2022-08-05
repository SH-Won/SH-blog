import { request } from '../utills/api';
import Loading from '../components/Loading';
import PostDetail_Image from '../components/PostDetail_Image';
import PostDetail_Info from '../components/PostDetail_Info';

export default function PostDetailPage({ $target, postId }) {
    this.state = {
        postId,
        post: null,
    };
    const $page = document.createElement('div');
    const $info = document.createElement('div');
    $page.className = 'page post-detail';
    $target.appendChild($page);

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    };
    const loading = new Loading({
        $target: $page,
        initialState: true,
    });
    this.render = () => {
        const { post } = this.state;
        if (this.state.isLoading) return;
        new PostDetail_Image({
            $target: $page,
            initialState: {
                post: this.state.post[0],
            },
        });
        new PostDetail_Info({
            $target: $page,
        });
    };

    this.fetchPost = async () => {
        try {
            this.setState({
                ...this.state,
                isLoading: true,
            });
            const post = await request(`/detail?postId=${postId}`);
            this.setState({
                ...this.state,
                post,
                isLoading: false,
            });
        } catch (e) {}
    };
    this.fetchPost();
}
