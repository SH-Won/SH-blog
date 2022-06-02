import { request,deleteArticle } from '../utills/api';
import Loading from '../components/Loading';
import '../styles/style_ck.css';
import styles from '../styles/Detail.module.css';
import ClickButton from '../components/ClickButton';
import { changeRoute } from '../utills/router';
export default function ArticleDetailPage({$target,articleId}){
    const $page = document.createElement('div');
    $page.className = `${styles.page}`;
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
    this.render = () =>{
        if(this.state.isLoading) return;
        const {article} = this.state;
        if(!this.state.createdAt){
            const date = new Date(article.createdAt).toLocaleString('ko-KR').split('. ');
            this.state.createdAt = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]}`
        }
        $page.innerHTML = `
        <div class="${styles.container}">
        <div class="${styles.info}">
        <h2>${article.title}</h2>
        <span class="${styles.writtenTime}">${this.state.createdAt}</span>
        </div>
        <div class="ck-content">
        ${article.data}
        </div>
        </div>
        `;
        const buttonPosition = document.querySelector('.ck-content').previousElementSibling;
        new ClickButton({
            $target : buttonPosition,
            initialState:{
                className : `${styles.editBtn}`,
                name : '수정',
            },
            onClick : () =>{
                const params = {
                    detail : this.state.article,
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
                }
                deleteArticle(data)
                .then(response => {
                    alert('삭제 하였습니다');
                    if(response) changeRoute('/article');
                })
            }
        }).render();
    }
    const loading = new Loading({
        $target:$page,
        initialState:this.state.isLoading,
    })
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