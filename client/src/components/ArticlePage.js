import {request} from '../utills/api'
import '../styles/style_ck.css';
export default function ArticlePage({$target,initialState}){
    
    const $page = document.createElement('div');
    $page.className = 'ArticlePage';
    $target.appendChild($page);
    this.state = initialState;
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        const {articles} = this.state;
        if(articles.length === 0){
            return;
        }
        // console.log(this.state);
        // console.log(articles);
        // $page.innerHTML = '123';
        $page.innerHTML = `
        ${articles.map(article => `
        <div class='ck-content'>
        ${article.data}
        </div>
        `)}
        `
        // $page.innerHTML = `
        // ${articles.map(article => `
        // <div>
        // ${article.data.slice(1,-1)}
        // </div>
        // `).join('')}
        // `
    }
    this.fetchArticle = async () =>{
        try{
            const {articles} = await request('/article');
            this.setState({
                ...this.state,
                articles,
            })

        }catch(e){

        }
    }
    this.fetchArticle();
}