import {request} from '../utills/api'
import '../styles/style_ck.css';
import Posts from './Posts';
import Loading from './Loading';
import { languages } from '../utills/languages';
import ListView from './ListView';
import { changeRoute } from '../utills/router';
export default function ArticlePage({$target,initialState}){
    
    const $page = document.createElement('div');
    $page.className = 'ArticlePage';
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
    const listView = new ListView({
        $target:$page,
        maxSize:4,
    })
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