import { init } from './utills/router.js';
// import LandingPage from './page/LandingPage.js';
import NavBar from './components/NavBar.js';
// import PostDetailPage from './page/PostDetailPage.js';
// import BestPage  from './page/BestPage.js'
// import EditPage from './page/EditPage.js';
// import ArticlePage from './page/ArticlePage.js';
// import ArticleDetailPage from './page/ArticleDetailPage.js';
// import TestPage from './page/TestPage.js';
// import RegisterPage from './page/RegisterPage.js';
// import LoginPage from './page/LoginPage.js';
// import Auth from './Auth.js';
import { selector } from './utills/selector.js';
import { destoryImage, logoutUser } from './utills/api.js';
import './utills/prototype';
import './styles/page.css'

export default function App($target){
    const cache = {

    }
    this.removeAllChild = (parent) =>{
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
    // const navBar = new NavBar({
    //     $target,
    // })
    // const navBar = import('./components/NavBar.js')
    // .then(({default : page}) =>{
    //     return new page({
    //         $target,
    //     })
    // })
    
    const navBar = new NavBar({
        $target,
    })
    const testCache = new Map();
    this.route = (params = {}) =>{
        const {pathname} = location;
        
        // NavBar
        const page = document.querySelector('nav').nextElementSibling;
        // $target.innerHTML = '';
        if(page)
        $target.removeChild(page);
        // console.log('loginSuccess1',params.loginSuccess);
        const loginSuccess = params?.loginSuccess;
        // console.log('loginSuccess2',loginSuccess)
        // if(loginSuccess) navBar.setState({
        //     ...navBar.state,
        //     loginSuccess
        // })
        
        

        if(pathname === '/'){
            const initialState = testCache.has('pre') ? testCache.get('pre') : {
                posts:[],
                skip:0,
                limit:8,
            };
            
            // Auth(LandingPage,false)({
            //     $target,
            //     initialState,
            //     cache,
            //     testCache
            // })

            // import('./Auth.js').then( async ({default: Auth}) =>{
            //     const landingPage = await import('./page/LandingPage.js')
            //                         .then(({default : page}) => page)
            //     Auth(landingPage,false)({
            //         $target,
            //         initialState,
            //         cache,
            //         testCache,
            //     })
            // })
            import('./page/LandingPage').then(({default:page}) => new page({
                $target,
                initialState,
                cache,
                testCache
            }))

        }
        else if(pathname ==='/register'){
            // new RegisterPage({
            //     $target,
            // })
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
            // Auth(LoginPage,false)({
            //     $target,
            //     connect,
            // })
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
            // new PostDetailPage({$target,postId});
            import('./Auth.js').then(async ({default:Auth}) =>{
                const postDetailPage = await import('./page/PostDetailPage')
                                    .then(({default: page}) => page);
                Auth(postDetailPage,false)({
                    $target,
                    postId,
                })
            })
        }
        // else if(pathname ==='/best'){
        //     new BestPage({
        //         $target,
        //         cache
        //     }).render();
        // }
        // else if(pathname === '/test'){
        //     new TestPage({
        //         $target,
        //     })
        // }
        else if(pathname ==='/edit'){
            const isModify = params !== null && params.hasOwnProperty('article') ? true : false;
            const prevRoute = params !== null && params.hasOwnProperty('route') ? params.route : pathname;
            
            // Auth(EditPage,true,prevRoute)({
            //     $target,
            //     isModify,
            //     initialState:isModify ? params.article : null,
            // })

            // import('./Auth.js').then(async ({default:Auth}) =>{
            //     const editPage = await import('./page/EditPage')
            //                         .then(({default: page}) => page);
            //     Auth(editPage,true,prevRoute)({
            //         $target,
            //         isModify,
            //         initialState : isModify ? params.article : null,
            //     })
            // })
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
            // Auth(ArticlePage,false)({
            //     $target,
            //     initialState:{
            //         posts:[],
            //     }
            // })
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
            // Auth(ArticleDetailPage,false)({
            //     $target,
            //     articleId,
            // })
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
        console.log(e.state);
        if(e.state && e.state.from === '/edit'){
            const loginSuccess = selector(state => state?.loginSuccess);
            if(loginSuccess)
            destoryImage()
        }
        this.route();
    });
    
    // window.addEventListener('beforeunload', () =>{
    //     logoutUser()
    //     .then(response =>{
    //         if(response.success){
                
    //         }
    //     })
    // })

}