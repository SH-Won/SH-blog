import LandingPage from './components/LandingPage.js';
import NavBar from './components/NavBar.js';
import PostDetailPage from './components/PostDetailPage.js';
import BestPage  from './components/BestPage.js'
import { init } from './utills/router.js';
import EditPage from './components/EditPage.js';


export default function App($target){
    const cache = {

    }
    const testCache = new Map();
    this.route = () =>{
        const {pathname} = location;

        $target.innerHTML = '';
        new NavBar({$target}).render();
        if(pathname === '/'){
            new LandingPage({
                $target,
                initialState : testCache.has('root') ? testCache.get('root') : {
                    posts:[],
                    skip:0,
                    limit:2,
                },
                cache,
                testCache,
            })
        }
        else if(pathname.split('/')[1] === 'post'){
            const [ , ,postId] = pathname.split('/');
            new PostDetailPage({$target,postId});
        }
        else if(pathname ==='/best'){
            new BestPage({
                $target,
                cache
            }).render();
        }
        else if(pathname ==='/edit'){
            new EditPage({
                $target,
            })
        }
        
    }
    init(this.route);
    this.route();
    window.addEventListener('popstate',this.route);
    
}