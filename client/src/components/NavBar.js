import { changeRoute } from '../utills/router.js';
import style from '../styles/NavBar.module.css';

export default function NavBar({$target}){
    const $navBar = document.createElement('nav');
    $navBar.className = `${style.navBar}`;
    $target.appendChild($navBar);

    this.render = () =>{
        $navBar.innerHTML = `
        <ul class="${style.list}">
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