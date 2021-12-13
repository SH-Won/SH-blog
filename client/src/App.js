import LandingPage from './components/LandingPage.js';
import PostDetailPage from './components/PostDetailPage.js';
import { init } from './utills/router.js';

export default function App($target){

    this.route = () =>{
        const {pathname} = location;

        $target.innerHTML = '';
        if(pathname === '/'){
            new LandingPage({$target}).render();
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