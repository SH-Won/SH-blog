import {request} from '../utills/api'

export default function ArticlePage({$target,initialState}){
    
    const $page = document.createElement('div');
    this.state = initialState;
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        const {articles} = this.state;
        console.log(articles);
        if(articles.length === 0){

        }
    }
    this.fetchArticle = async () =>{
        try{
            const articles = await request('/article');
            this.setState({
                articles,
            })

        }catch(e){

        }
    }
}