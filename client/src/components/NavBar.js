import { changeRoute } from '../utills/router.js';

export default function NavBar({$target}){
    const $navBar = document.createElement('nav');
    $navBar.className = 'navBar';
    $target.appendChild($navBar);

    this.render = () =>{
        $navBar.innerHTML = `
        <ul>
        <li data-route="/favorite">좋아요</li>
        <li data-route="/best">베스트</li>
        </ul>
        `
    }
    this.render();
    $navBar.addEventListener('click',e=>{
        const {route} = e.target.closest('li').dataset
        if(route){
            changeRoute(route);
        }
    })
}