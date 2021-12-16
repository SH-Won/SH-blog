import LandingPage from './components/LandingPage.js';
import NavBar from './components/NavBar.js';
import PostDetailPage from './components/PostDetailPage.js';
import { init } from './utills/router.js';


export default function App($target){
    const cache = {

    }
    this.route = () =>{
        const {pathname} = location;

        $target.innerHTML = '';
        new NavBar({$target}).render();
        if(pathname === '/'){
            new LandingPage({
                $target,
                initialState : cache.root ? cache.root : {
                    posts:[],
                    skip:0,
                    limit:4,
                },
                cache,
            }).render();
        }
        else if(pathname.split('/')[1] === 'post'){
            const [ , ,postId] = pathname.split('/');
            new PostDetailPage({$target,postId});
        }
        
    }
    init(this.route);
    this.route();
    window.addEventListener('popstate',this.route);
    
}