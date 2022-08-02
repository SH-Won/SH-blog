import {request} from '../utills/api.js';
import Posts from '../components/Posts.js';
import  {InfinityScroll}  from '../utills/InfinityScroll.js';
import CheckBox from '../components/CheckBox.js';
import { languages } from '../utills/languages.js';
import { changeRoute } from '../utills/router.js';
import ClickButton from '../components/ClickButton.js';
import Skeleton from '../components/Skeleton.js';


export default function LandingPage({ $target, initialState , cache }) {
  const $page = document.createElement("div");
  $page.className = "page landing";
  $target.appendChild($page);

  this.state = {
    isLoading : true,
    checked: [],
    ...initialState,
  };
  this.setState = (nextState : object) => {
    this.state = nextState;
    posts.setState({
      isLoading: this.state.isLoading,
      posts: this.state.posts,
      end: -1 * this.state.limit,
      checkToggle: this.state.checkToggle,
      postSize: this.state.postSize,
    });
    skeletonLoading.setState({
      ...skeletonLoading.state,
      loading: this.state.isLoading,
    });
    this.init();
  };
  this.init = () => {
    const stateKey = this.state.checked.sort().join(",");
    cache.set(stateKey, this.state);
    cache.set("pre", this.state);
    const hasMore = this.state.postSize > 0;
    const loading = this.state.isLoading;
    const postContainer = posts.$postContainer;
    const length = postContainer.children.length - 1;
    const element = postContainer.children[length];
    InfinityScroll(element, this.fetchPosts.bind(this), hasMore, loading);
  };

  let checkBox = null;
  if (this.state.tab === "recent") {
    checkBox = new CheckBox({
      $target: $page,
      initialState: {
        items: languages.slice(0, -1),
        checked: this.state.checked,
      },
      callback: (id, selected) =>
        selectCheckBox.call(this, id, selected, cache),
    });
  }
  const writeBtn = new ClickButton({
    $target: $page,
    initialState: {
      name: "글 쓰기",
      className: "button button--end",
    },
    onClick: () => {
      changeRoute("/edit", { detail: { route: location.pathname } });
    },
  }).render();

  const posts = new Posts({
    $target: $page,
    initialState: {
      posts: this.state.posts,
      isLoading: this.state.isLoading,
      end: 0,
      checkToggle: false,
    },
    callback: (id : number) => {
      changeRoute(`/article/${id}`);
    },
  });

  const skeletonLoading = new Skeleton({
    $target: $page,
    initialState: {
      loading: this.state.isLoading,
      size: this.state.limit,
    },
  });

  if (!cache.has("pre")) this.fetchPosts();

  this.init();
}


function selectCheckBox(id : number,selected : boolean, cache){
    const {checked} = this.state;
        if(selected){
            checked.push(id);
        }else{
            const idx = checked.indexOf(id);
            checked.splice(idx,1);
        }

        const stateKey = checked.sort().join(',');

        if(cache.has(stateKey)){
            this.setState({
                ...cache.get(stateKey),
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
LandingPage.prototype.fetchPosts = async function(checkToggle = false){
    try{
    const params = {
        skip:this.state.skip,
        limit:this.state.limit,
        category:this.state.tab === 'recent' ? this.state.checked : this.state.tab,
    }
    
    this.setState({
        ...this.state,
        isLoading:true,
    })
    const {posts,postSize} = await request('article',params);
    this.setState({
        ...this.state,
        posts : !this.state.skip ? posts : [...this.state.posts,...posts],
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
