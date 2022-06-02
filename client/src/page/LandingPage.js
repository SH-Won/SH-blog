import {request} from '../utills/api.js';
import Posts from '../components/Posts.js';
import Button from '../components/Button.js';
import Loading from '../components/Loading.js';
import  {InfinityScroll}  from '../utills/InfinityScroll.js';
import ListView from '../components/ListView.js';
import CheckBox from '../components/CheckBox.js';
import { category } from '../utills/category.js';
import { changeRoute } from '../utills/router.js';

export default function LandingPage({$target,initialState,cache,testCache}){

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
            ...this.state,
            posts: this.state.posts,
        })
        loading.setState(this.state.isLoading);
        loadMoreBtn.setState({
            ...loadMoreBtn.state,
            visible: this.state.postSize < this.state.limit ? false : true,
        })
        this.init();
    }
    this.init = () =>{
       const stateKey = this.state.checked.sort().join(',');
       testCache.set(stateKey,this.state);
       testCache.set('pre',this.state);
       const hasMore = this.state.postSize >= this.state.limit;
       const loading = this.state.isLoading;
       const element = $page.children[2].lastElementChild;
       InfinityScroll(element,this.fetchPosts,hasMore,loading);
    }
    this.fetchPosts = async () =>{
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
        const {posts,postSize} = await request("",params);
        this.setState({
            ...this.state,
            posts : !this.state.skip ? posts : [...this.state.posts,...posts],
            skip : this.state.skip + this.state.limit,
            postSize,
            isLoading:false,
        })
        }catch(e){
            throw new Error("서버가 이상합니다");

        }finally{
            
        }
    }
    const listView = new ListView({
        $target:$page,
        maxSize:4,
    })
    const checkBox = new CheckBox({
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
                this.setState(testCache.get(stateKey));
                return;
            }
            this.setState({
                ...this.state,
                checked,
                skip:0,
            });
            this.fetchPosts();
        }
    })
    const posts = new Posts({
        $target : $page,
        initialState:this.state,
        callback : (id) => {
            changeRoute(`/post/${id}`);
        }
    })
    const loading = new Loading({
        $target:$page,
        initialState: this.state.isLoading,
    })
    const loadMoreBtn = new Button({ 
        $target : $page,
        initialState:{
            name:"더 보기",
            className:"loadMore-btn",
            visible : this.state.postSize < this.state.limit ? false : true,
            style:{
                width:'10%',
                textAlign:'center',
                border:'none',
                background:'whitesmoke',
                borderRadius:'4px',
                boxShadow:'0 0 2px #2c87f0',
                outline:'transparent',
                color:'#4a96ee',
                margin:'auto'
            }
        },
    })
    if(!testCache.has('pre')){
        this.fetchPosts();
    }

    this.init();
    $page.addEventListener('click',e=>{
        if(e.target.className !=='loadMore-btn') return;
        this.fetchPosts();
    })
}