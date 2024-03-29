import { changeRoute } from '../utills/router.js';
import style from '../styles/NavBar.module.css';
import { logoutUser } from '../utills/api.js';
import { selector } from '../utills/selector.js';
import { getItem, removeItem } from '../utills/storage.js';
export default function NavBar({ $target, initialState = {} }) {
    this.state = initialState;
    this.setState = nextState => {
        this.state = nextState;
    };
    this.$navBar = document.createElement('nav');
    this.$navBar.className = `${style.navBar}`;
    $target.appendChild(this.$navBar);

    const loginFailTemplate = `
    <ul class="${style.userList}">
    <li data-route="/login">로그인</li>
    <li data-route="/register">회원가입</li>
    </ul>
    `;
    const loginSuccessTemplate = `
    <ul class="${style.userList}">
    <li data-route="/logout">로그아웃</li>
    </ul>
    `;

    this.checkLoginState = () => {
        const loginSuccess = getItem('loginSuccess');
        if (this.state.loginSuccess === loginSuccess) return;
        this.$navBar.removeChild(this.$navBar.lastElementChild);
        this.$navBar.insertAdjacentHTML('beforeend', loginSuccess ? loginSuccessTemplate : loginFailTemplate);
    };
    this.render = () => {
        const { loginSuccess } = this.state;
        const template = `
        <ul class="${style.list}">
        <li data-route="/">sh blog</li>
        </ul>
        ${!loginSuccess ? loginFailTemplate : loginSuccessTemplate}
        `;
        this.$navBar.innerHTML = template;
        // $navBar.insertAdjacentHTML('beforeend',template);
    };

    this.$navBar.addEventListener('click', e => {
        const $li = e.target.closest('li');
        e.preventDefault();
        if ($li) {
            const { route } = $li.dataset;
            if (route === '/logout') {
                logoutUser().then(response => {
                    if (!response.success) {
                        alert('로그아웃에 실패했습니다');
                    } else {
                        alert('안전하게 로그아웃 했습니다');
                        selector(null, 'loginSuccess', false);
                        removeItem('loginSuccess');
                        removeItem('authorization');
                        removeItem('refreshToken');
                        return changeRoute('/');
                    }
                });
            } else if (route === '/login')
                return changeRoute(route, {
                    detail: { route: location.pathname },
                });
            changeRoute(route);
        }
    });
}
//  articlePage -> edit 클릭 -> editPage 이동 auth 에 걸림
