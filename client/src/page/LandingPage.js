import {request} from '../utills/api.js';
import Posts from '../components/Posts.js';
import Button from '../components/Button.js';
import Loading from '../components/Loading.js';
import  {InfinityScroll}  from '../utills/InfinityScroll.js';
import ListView from '../components/ListView.js';
import CheckBox from '../components/CheckBox.js';
import { category } from '../utills/category.js';
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
        // loadMoreBtn.setState({
        //     ...loadMoreBtn.state,
        //     visible: this.state.postSize < this.state.limit ? false : true,
        // })
        this.init();
    }
    this.init = () =>{
      
       const stateKey = this.state.checked.sort().join(',');
       testCache.set(stateKey,this.state);
       testCache.set('pre',this.state);
       const hasMore = this.state.postSize >= this.state.limit;
       const loading = this.state.isLoading;
       const posts = document.querySelector('.page > article');
       const length = posts.children.length - Math.floor(this.state.limit * 0.5);
       const element = posts.children[length];
       InfinityScroll(element,this.fetchPosts.bind(this),hasMore,loading);
    }
    
    // const listView = new ListView({
    //     $target:$page,
    //     maxSize:4,
    // })
    let checkBox = null;
    if(this.state.tab === ''){
    checkBox = new CheckBox({
        $target:$page,
        initialState:{
            items:category,
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
            // window.history.replaceState({detail:{ from :'/edit'}},null);
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
            const path = this.state.tab === '' ? '/post' : '/article' 
            changeRoute(`${path}/${id}`);
        }
    })
    const loading = new Loading({
        $target:$page,
        initialState: this.state.isLoading,
    })
    // const loadMoreBtn = new Button({ 
    //     $target : $page,
    //     initialState:{
    //         name:"더 보기",
    //         className:"loadMore-btn",
    //         visible : this.state.postSize < this.state.limit ? false : true,
    //         style:{
    //             width:'10%',
    //             textAlign:'center',
    //             border:'none',
    //             background:'whitesmoke',
    //             borderRadius:'4px',
    //             boxShadow:'0 0 2px #2c87f0',
    //             outline:'transparent',
    //             color:'#4a96ee',
    //             margin:'auto'
    //         }
    //     },
    // })
    console.log('error');
    console.log(testCache);
    if(!testCache.has('pre')){
        
        this.fetchPosts();
    }
    this.init();
    // $page.addEventListener('click',e=>{
    //     if(e.target.className !=='loadMore-btn') return;
    //     this.fetchPosts();
    // })
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
    this.setState({
        ...this.state,
        posts : !this.state.skip ? posts : [...this.state.posts,...posts],
        skip : this.state.skip + this.state.limit,
        postSize,
        isLoading:false,
        checkToggle,
    })
    }catch(e){
        throw new Error("서버가 이상합니다");

    }finally{
        
    }
}



// this.fetchPosts = async () =>{
    //     try{
    //     const params = {
    //         skip:this.state.skip,
    //         limit:this.state.limit,
    //         category:this.state.checked,
    //     }
    //     this.setState({
    //         ...this.state,
    //         isLoading:true,
    //     })
    //     const {posts,postSize} = await request("",params);
    //     this.setState({
    //         ...this.state,
    //         posts : !this.state.skip ? posts : [...this.state.posts,...posts],
    //         skip : this.state.skip + this.state.limit,
    //         postSize,
    //         isLoading:false,
    //     })
    //     }catch(e){
    //         throw new Error("서버가 이상합니다");

    //     }finally{
            
    //     }
    // }