import LandingPage from './components/LandingPage.js';

export default function App($target){

    this.route = () =>{
        const {pathname} = location;

        $target.innerHTML = '';
        if(pathname === '/'){
            new LandingPage({$target}).render();
        }
        else if(pathname.split('/')[1] === 'posts'){
            const [ , ,postId] = pathname.split('/');
            console.log(postId);
        }
        
    }
    this.route();
}