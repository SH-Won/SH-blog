import { init } from './utills/router.js';
import NavBar from './components/NavBar.js';
import { selector } from './utills/selector.js';
import { destoryImage } from './utills/api.js';
import './utills/prototype';
import './styles/page.css'

export default function App($target){
    const cache = {

    }
    
    const testCache = new Map();
    this.route = (params = {}) =>{
        const {pathname} = location;
        
        // NavBar
        // const page = document.querySelector('nav').nextElementSibling;
        $target.innerHTML = '';
        // if(page)
        // $target.removeChild(page);
        // const loginSuccess = params?.loginSuccess;
        const navBar = new NavBar({
            $target,
        }).render();

        if(pathname === '/'){
            const initialState = testCache.has('pre') ? testCache.get('pre') : {
                posts:[],
                skip:0,
                limit:8,
            };
            
            import('./page/LandingPage').then(({default:page}) => new page({
                $target,
                initialState,
                cache,
                testCache
            }))

        }
        else if(pathname ==='/register'){
        
            import('./Auth.js').then(async ({default:Auth}) =>{
                const registerPage = await import('./page/RegisterPage')
                                    .then(({default: page}) => page);
                Auth(registerPage,false)({
                    $target,
                    
                })
            })
        }
        else if(pathname ==='/login'){
            const connect = params !==null && params.hasOwnProperty('route') ?  params.route : '/'; 
            
            import('./Auth.js').then(async ({default:Auth}) =>{
                const loginPage = await import('./page/LoginPage')
                                    .then(({default: page}) => page);
                Auth(loginPage,false)({
                    $target,
                    connect
                })
            })
        }
        else if(pathname.split('/')[1] === 'post'){
            const [ , ,postId] = pathname.split('/');
            import('./Auth.js').then(async ({default:Auth}) =>{
                const postDetailPage = await import('./page/PostDetailPage')
                                    .then(({default: page}) => page);
                Auth(postDetailPage,false)({
                    $target,
                    postId,
                })
            })
        }
        
        else if(pathname ==='/edit'){
            const isModify = params !== null && params.hasOwnProperty('article') ? true : false;
            const prevRoute = params !== null && params.hasOwnProperty('route') ? params.route : pathname;
            
            import('./Auth.js').then(async ({default:Auth}) =>{
                const editPage = await import('./page/EditPage2')
                                    .then(({default: page}) => page);
                Auth(editPage,true,prevRoute)({
                    $target,
                    isModify,
                    initialState : isModify ? params.article : null,
                })
            })
        }
        else if(pathname === '/article'){
            
            import('./Auth.js').then(async ({default:Auth}) =>{
                const articlePage = await import('./page/ArticlePage.js')
                                    .then(({default: page}) => page);
                Auth(articlePage,false)({
                    $target,
                    initialState:{
                        posts:[],
                    }
                })
            })
        }
        else if(pathname.split('/')[1] === 'article'){
            const [ , ,articleId] = pathname.split('/');

            import('./Auth.js').then(async ({default:Auth}) =>{
                const articleDetailPage = await import('./page/ArticleDetailPage')
                                    .then(({default: page}) => page);
                Auth(articleDetailPage,false)({
                    $target,
                    articleId
                })
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