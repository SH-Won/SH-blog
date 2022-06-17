import { changeRoute } from '../utills/router.js';
import { getItem,removeItem } from '../utills/storage.js';
import style from '../styles/NavBar.module.css';
import { logoutUser } from '../utills/api.js';
import { selector } from '../utills/selector.js';
export default function NavBar({$target,initialState={}}){
    this.state = initialState;
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    const $navBar = document.createElement('nav');
    $navBar.className = `${style.navBar}`;
    $target.appendChild($navBar);
    const user = selector((state) => state?.loginSuccess);
    
    this.render = () =>{
        
        console.log(user);
        const template = `
        <ul class="${style.list}">
        <li data-route="/">BLOG</li>
        <li data-route="/article">게시글</li>
        </ul>
        ${!user ? `
        <ul class="${style.list}">
        <li data-route="/login">로그인</li>
        <li data-route="/register">회원가입</li>
        </ul>
        ` :
        `<ul class="${style.list}">
        <li data-route="/logout">로그아웃</li>
        </ul>
        `
        }
        `;
        // $navBar.innerHTML = template;
        $navBar.insertAdjacentHTML('beforeend',template); 
    }
    this.render();
    $navBar.addEventListener('click',e=>{
        const $li = e.target.closest('li');
        e.preventDefault();
        if($li){
            const {route} = $li.dataset;
            if(route ==='/logout'){
                logoutUser()
                .then(response =>{
                    if(!response.success){
                        alert("로그아웃에 실패했습니다");
                    }else{
                        selector(null,'loginSuccess',false);
                        return changeRoute('/');
                    }
                })
            }
            else if(route === '/login') return changeRoute(route,{detail:{route: location.pathname}});
            changeRoute(route);
        }
    })
}
//  articlePage -> edit 클릭 -> editPage 이동 auth 에 걸림

