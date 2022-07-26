import { init } from './utills/router.js';
import NavBar from './components/NavBar.js';
import { selector } from './utills/selector.js';
import { destoryImage } from './utills/api.js';
import Tab from './components/Tab.js';
import './styles/highlight.css';

export default async function App($target){
    const cache = new Map();
    const recentCache = new Map();
    const Auth = await import('./Auth').then(({default:Auth}) => Auth);
    // const LoginPage = await import('./page/LoginPage').then(({default:page}) => page);
    // const RegisterPage = await import('./page/RegisterPage').then(({default:page}) => page);
    // const LandingPage = await import('./page/LandingPage').then(({default : page}) => page);
    //const PostDetailPage = await import('./page/PostDetailPage').then(({default : page}) => page);
    // const ArticleDetailPage = await import('./page/ArticleDetailPage').then(({default : page}) => page);
    // const EditPage = await import('./page/EditPage').then(({default : page}) => page);
    
    this.removeChild = (parent) =>{
        while(parent.children.length > 1){
            parent.removeChild(parent.lastElementChild);
        }
    }

    const navBar = new NavBar({
        $target,
    });
    
    navBar.render();

    this.route = async (params = {}) =>{
        const {pathname} = location;

        this.removeChild($target);
        navBar.checkLoginState();

        if(pathname === '/'){
            const LandingPage = await import('./page/LandingPage').then(({default : page}) => page);
            const initialState = cache.has('pre') ? cache.get('pre') : {
                posts:[],
                skip:0,
                limit:8,
                tab:'popular',
            };
            new Tab({
                $target,
                initialState:{
                    prev:history.state?.detail?.prev === 1 ? 1 : 0,
                    current:0,
                }
            })
            
            new LandingPage({
                $target,
                initialState,
                cache,
            })

        }
        else if(pathname === '/recent'){
            const LandingPage = await import('./page/LandingPage').then(({default : page}) => page);
            if(params?.deleteArticleId){
                const cacheState = recentCache.get('pre');
                const deleteIdx = cacheState.posts.findIndex(post => post._id === params.deleteArticleId );
                cacheState.posts.splice(deleteIdx,1);
                cacheState.skip--;
                recentCache.set('pre',cacheState);
            }
            if(params?.upload){
                recentCache.delete('pre');
            }

            const initialState = recentCache.has('pre') ? recentCache.get('pre') : {
                posts:[],
                skip:0,
                limit:8,
                tab:'recent',
            }

            new Tab({
                $target,
                initialState:{
                    prev : history.state?.detail?.prev === 0 ? 0 : 1,
                    current:1,
                }
            })

            new LandingPage({
                $target,
                initialState,
                cache:recentCache,
            })
        }
        
        else if(pathname ==='/register'){
            const RegisterPage = await import('./page/RegisterPage').then(({default:page}) => page);
            Auth(RegisterPage,false)({
                $target,
            })
        }
        else if(pathname ==='/login'){
            const LoginPage = await import('./page/LoginPage').then(({default:page}) => page);
            const connect = params !==null && params.hasOwnProperty('route') ?  params.route : '/'; 

            Auth(LoginPage,false)({
                $target,
                connect,
            })
        }
        else if(pathname.split('/')[1] === 'post'){
            const [ , ,postId] = pathname.split('/');
            const PostDetailPage = await import('./page/PostDetailPage').then(({default : page}) => page);
            Auth(PostDetailPage,false)({
                $target,
                postId,
            })

        }
        
        else if(pathname ==='/edit'){
            const EditPage = await import('./page/EditPage').then(({default : page}) => page);
            const isModify = params !== null && params.hasOwnProperty('article') ? true : false;
            const prevRoute = params !== null && params.hasOwnProperty('route') ? params.route : pathname;

            Auth(EditPage,true,prevRoute)({
                $target,
                isModify,
                initialState : isModify ? params.article : null,
            })
        }
        else if(pathname.split('/')[1] === 'article'){
            const ArticleDetailPage = await import('./page/ArticleDetailPage').then(({default : page}) => page);
            const [ , ,articleId] = pathname.split('/');
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

            // import('./Auth.js').then(async ({default:Auth}) =>{
            //     const articleDetailPage = await import('./page/ArticleDetailPage')
            //                         .then(({default: page}) => page);
            //     Auth(articleDetailPage,false)({
            //         $target,
            //         articleId
            //     })
            // })