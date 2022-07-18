import { request,deleteArticle,updateFavorite } from '../utills/api';
import Loading from '../components/Loading';

import styles from '../styles/Detail.module.css';
import ClickButton from '../components/ClickButton';
import { changeRoute } from '../utills/router';
import Favorite from '../components/Favorite';


export default function ArticleDetailPage({$target,articleId,user}){
    const $page = document.createElement('div');
    $page.className = 'page detail-article';
    $target.appendChild($page);

    this.state = {
        article:null,
        createdAt:null,
        isLoading:true,
    }
    this.setState = (nextState) =>{
        this.state = nextState;
        loading.setState(this.state.isLoading);
        this.render();
    }
    
    const loading = new Loading({
        $target:$page,
        initialState:this.state.isLoading,
    })
    
    this.render = () =>{
        if(this.state.isLoading) return;
        document.documentElement.scrollTop =0;
        const {article} = this.state;
        if(!this.state.createdAt){
            const date = new Date(article.createdAt).toLocaleString('ko-KR').split('. ');
            this.state.createdAt = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]}`
        }
        const template = `
        <article class="${styles.container}">
        <div class="${styles.info}">
        <h2 class="title"></h2>
        <time class="${styles.writtenTime}">${this.state.createdAt}</time>
        </div>
        <section class="ck-content ql-content">
        </section>
        </article>
        `.trim();
        
        

        $page.insertAdjacentHTML('beforeend',template);
        const content = document.querySelector('.ql-content');
        const title = document.querySelector('.title');
        title.textContent = article.title;
        content.insertAdjacentHTML('beforeend',`${article.data}`);
        const buttonPosition = content.previousElementSibling;
        
        new Favorite({
            $target:buttonPosition,
            initialState:{
                isAuth : user.isAuth,
                selected: user.isAuth ? user.favorite.includes(article._id) : false,
                count : article.favoriteCount,
            },
            onClick: (count) =>{
                    const data = {
                      count,
                      userId: user._id,
                      articleId,
                    };
                    updateFavorite(data)
            }
        })
        if(user._id === article.writer._id){
        new ClickButton({
            $target : buttonPosition,
            initialState:{
                className : `${styles.editBtn}`,
                name : '수정',
            },
            onClick : () =>{
                const params = {
                    detail : {
                        article:this.state.article,
                    }
                }
                changeRoute('/edit',params);
            }
        }).render();
        new ClickButton({
            $target : buttonPosition,
            initialState : {
                className:`${styles.deleteBtn}`,
                name: '삭제',
            },
            onClick : () =>{
                const isDelete = confirm("정말 삭제 하시겠어요 ?");
                if(!isDelete) return;
                const data = {
                    _id : this.state.article._id,
                    imageIds:this.state.article.imageIds,
                }
                deleteArticle(data)
                .then(response => {
                    alert('삭제 하였습니다');
                    if(response) changeRoute('/',{
                        detail:{
                            deleteArticleId : data._id,
                            prevRoute:history.state,
                        }
                    });
                })
            }
        }).render();
        }
    }

    const fetchArticle = async () =>{
        try{
            this.setState({
                ...this.state,
                isLoading:true,
            })
            const params = {articleId};
            const [article] = await request('/detailArticle',params);
            this.setState({
                ...this.state,
                isLoading:false,
                article,
            })

        }catch(e){

        }
    }
    
    fetchArticle();
}