import {request} from '../utills/api.js';
import Posts from '../components/Posts.js';
import Loading from '../components/Loading.js';
import  {InfinityScroll}  from '../utills/InfinityScroll.js';
import CheckBox from '../components/CheckBox.js';
import { languages } from '../utills/languages.js';
import { changeRoute } from '../utills/router.js';
import ClickButton from '../components/ClickButton.js';
import '../styles/page.css';

export default function LandingPage({$target,initialState,cache,testCache,user}){

    const $page = document.createElement('div');
    
    $page.className = 'page landing';
    $target.appendChild($page);
    
    this.state = {
        isLoading:true,
        checked: [],
        ...initialState,
    };
    this.setState = (nextState) =>{
        this.state = nextState;
        posts.setState({
            isLoading:this.state.isLoading,
            posts: this.state.posts,
            end: (-1) * this.state.limit,
            checkToggle:this.state.checkToggle,
            postSize : this.state.postSize,
        })
        loading.setState(this.state.isLoading);
        this.init();
    }
    this.init = () =>{
      
       const stateKey = this.state.checked.sort().join(',');
       testCache.set(stateKey,this.state);
       testCache.set('pre',this.state);
    //    const hasMore = this.state.postSize >= this.state.limit;
       const hasMore = this.state.postSize > 0 ;
       const loading = this.state.isLoading;
       const posts = document.querySelector('.page > article');
       const length = posts.children.length - Math.floor(this.state.limit * 0.5);
       const element = posts.children[length];
       InfinityScroll(element,this.fetchPosts.bind(this),hasMore,loading);
    }

    let checkBox = null;
    if(this.state.tab === 'article'){
    checkBox = new CheckBox({
        $target:$page,
        initialState:{
            items:languages.slice(0,-1),
            checked:this.state.checked,
        },
        callback : (id,selected) => {
            const {checked} = this.state;
            if(selected){
                checked.push(id);
            }else{
                const idx = checked.indexOf(id);
                checked.splice(idx,1);
            }
            const stateKey = checked.sort().join(',');
            // stateKey = stateKey === '' ? 'root' : stateKey;
            if(testCache.has(stateKey)){
                this.setState({
                    ...testCache.get(stateKey),
                    checkToggle:true,
                });
                return;
            }
            this.setState({
                ...this.state,
                checked,
                checkToggle:true,
                skip:0,
            });
            this.fetchPosts(true);
        }
    })
   }
    const writeBtn = new ClickButton({
        $target:$page,
        initialState:{
            name:'글 쓰기',
            className:'button write-post'
        },
        onClick : () => {
            changeRoute('/edit',{detail : {route : location.pathname}})
        }
    }).render();
    
    const posts = new Posts({
        $target : $page,
        initialState:{
            posts:this.state.posts,
            isLoading:this.state.isLoading,
            end : 0,
            checkToggle:false,
        },
        callback : (id) => {
            const path = this.state.tab === 'article' ? '/article' : '/post' 
            changeRoute(`${path}/${id}`);
        }
    })

    const loading = new Loading({
        $target:$page,
        initialState: this.state.isLoading,
    })

    this.fetchPosts();
    this.init();
   
}

LandingPage.prototype.fetchPosts = async function(checkToggle = false){
    try{
    const params = {
        skip:this.state.skip,
        limit:this.state.limit,
        category:this.state.checked,
    }
    
    this.setState({
        ...this.state,
        isLoading:true,
    })
    const {posts,postSize} = await request(this.state.tab,params);
    console.log(posts);
    this.setState({
        ...this.state,
        posts : !this.state.skip ? posts : [...this.state.posts,...posts],
        // skip : postSize === 0 ? this.state.skip : this.state.skip + this.state.limit,
        skip:this.state.skip + postSize,
        postSize,
        isLoading:false,
        checkToggle,
    })
    }catch(e){
        throw new Error("서버가 이상합니다");

    }finally{
        
    }
}