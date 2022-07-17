import {request} from '../utills/api'
import Posts from '../components/Posts';
import Loading from '../components/Loading';
import { changeRoute } from '../utills/router';
import ClickButton from '../components/ClickButton';
import '../styles/page.css';
export default function ArticlePage({$target,initialState}){
    
    const $page = document.createElement('div');
    $page.className = 'page article';
    $target.appendChild($page);
    this.state = {
        isLoading: true,
        checked:[],
        ...initialState,
    }
    this.setState = (nextState) =>{
        this.state = nextState;
        loading.setState(this.state.isLoading)
        articles.setState({
            ...this.state,
            posts:this.state.posts,
        })
    }
   
    const loading = new Loading({
        $target:$page,
        initialState:this.state.isLoading,
    })

    const writeBtn = new ClickButton({
        $target:$page,
        initialState:{
            className:'writeBtn',
            name : '글 쓰기',
        },
        onClick : () => {
            changeRoute('/edit',{detail: {route : location.pathname}});
        }
    }).render();

    const articles = new Posts({
        $target:$page,
        initialState:this.state,
        callback: (id) =>{
            changeRoute(`/article/${id}`);
        }
    })
    this.fetchArticle = async () =>{
        try{
            this.setState({
                ...this.state,
                isLoading:true,
            })
            const {articles} = await request('/article');
            this.setState({
                ...this.state,
                posts:articles,
            })
        }catch(e){

        }finally{
            this.setState({
                ...this.state,
                isLoading:false,
            })
        }
    }
    this.fetchArticle();
}