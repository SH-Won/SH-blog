import { init } from './utills/router.js';
import NavBar from './components/NavBar.js';
import { selector } from './utills/selector.js';
import { destoryImage } from './utills/api.js';
import './styles/page.css'
import Tab from './components/Tab.js';
import './styles/highlight.css';

export default async function App($target){
    const cache = new Map();
    const issueCache = new Map();
    const Auth = await import('./Auth').then(({default:Auth}) => Auth);
    const LoginPage = await import('./page/LoginPage').then(({default:page}) => page);
    const RegisterPage = await import('./page/RegisterPage').then(({default:page}) => page);
    const LandingPage = await import('./page/LandingPage').then(({default : page}) => page);
    const PostDetailPage = await import('./page/PostDetailPage').then(({default : page}) => page);
    const ArticleDetailPage = await import('./page/ArticleDetailPage').then(({default : page}) => page);
    const EditPage = await import('./page/EditPage').then(({default : page}) => page);
    
    this.removeChild = (parent) =>{
        while(parent.children.length > 1){
            parent.removeChild(parent.lastElementChild);
        }
    }

    const navBar = new NavBar({
        $target,
    });
    
    const tab = new Tab({
        $target,
        initialState:{
            prev:0,
            current:0,
        }
    });
    navBar.render();
    tab.render();

    this.route = (params = {}) =>{
        const {pathname} = location;
        
        this.removeChild($target);

        navBar.checkLoginState();
        
        
        if(pathname === '/'){
            
            if(params?.deleteArticleId){
                const cacheState = cache.get('pre');
                const deleteIdx = cacheState.posts.findIndex(post => post._id === params.deleteArticleId );
                cacheState.posts.splice(deleteIdx,1);
                cacheState.skip--;
                cache.set('pre',cacheState);
            }
            if(params?.upload){
                cache.delete('pre');
            }
            const initialState = cache.has('pre') ? cache.get('pre') : {
                posts:[],
                skip:0,
                limit:8,
                tab:'article'
            };
            $target.appendChild(tab.$tab);
            tab.setState({
                prev: tab.state.current,
                current:0,
                
            })

            // import('./page/LandingPage').then(({default:page}) => new page({
            //     $target,
            //     initialState,
            //     cache,
            // }))
            new LandingPage({
                $target,
                initialState,
                cache,
            })

        }
        else if(pathname === '/issue'){
            

            const initialState = issueCache.has('pre') ? issueCache.get('pre') : {
                posts:[],
                skip:0,
                limit:8,
                tab:''
            }
            $target.appendChild(tab.$tab);
            tab.setState({
                prev:tab.state.current,
                current:1,
            })
            // import('./page/LandingPage').then(({default:page}) => new page({
            //     $target,
            //     initialState,
            //     cache :issueCache,
            // }))
            new LandingPage({
                $target,
                initialState,
                cache:issueCache,
            })
        }
        
        else if(pathname ==='/register'){
        
            // import('./Auth.js').then(async ({default:Auth}) =>{
            //     const registerPage = await import('./page/RegisterPage')
            //                         .then(({default: page}) => page);
            //     Auth(registerPage,false)({
            //         $target,
                    
            //     })
            // })
            Auth(RegisterPage,false)({
                $target,
            })
        }
        else if(pathname ==='/login'){
            const connect = params !==null && params.hasOwnProperty('route') ?  params.route : '/'; 
            
            // import('./Auth.js').then(async ({default:Auth}) =>{
            //     const loginPage = await import('./page/LoginPage')
            //                         .then(({default: page}) => page);
            //     Auth(loginPage,false)({
            //         $target,
            //         connect
            //     })
            // })
            Auth(LoginPage,false)({
                $target,
                connect,
            })
        }
        else if(pathname.split('/')[1] === 'post'){
            const [ , ,postId] = pathname.split('/');
            // import('./Auth.js').then(async ({default:Auth}) =>{
            //     const postDetailPage = await import('./page/PostDetailPage')
            //                         .then(({default: page}) => page);
            //     Auth(postDetailPage,false)({
            //         $target,
            //         postId,
            //     })
            // })
            Auth(PostDetailPage,false)({
                $target,
                postId,
            })

        }
        
        else if(pathname ==='/edit'){
            const isModify = params !== null && params.hasOwnProperty('article') ? true : false;
            const prevRoute = params !== null && params.hasOwnProperty('route') ? params.route : pathname;
            
            // import('./Auth.js').then(async ({default:Auth}) =>{
            //     const editPage = await import('./page/EditPage')
            //                         .then(({default: page}) => page);
            //     Auth(editPage,true,prevRoute)({
            //         $target,
            //         isModify,
            //         initialState : isModify ? params.article : null,
            //     })
            // })
            Auth(EditPage,true,prevRoute)({
                $target,
                isModify,
                initialState : isModify ? params.article : null,
            })
        }
        else if(pathname.split('/')[1] === 'article'){
            const [ , ,articleId] = pathname.split('/');

            // import('./Auth.js').then(async ({default:Auth}) =>{
            //     const articleDetailPage = await import('./page/ArticleDetailPage')
            //                         .then(({default: page}) => page);
            //     Auth(articleDetailPage,false)({
            //         $target,
            //         articleId
            //     })
            // })
            Auth(ArticleDetailPage,false)({
                $target,
                articleId,
            })
        }
    }
    init(this.route);
    this.route();
    window.addEventListener('popstate',(e) =>{
        if(e.state && e.state.from === '/edit'){
            const loginSuccess = selector(state => state?.loginSuccess);
            if(loginSuccess)
            destoryImage()
        }
        this.route();
    });

}