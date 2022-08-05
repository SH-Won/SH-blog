import { changeRoute } from '../utills/router';

export default function Tab({ $target, initialState = {} }) {
    this.$tab = document.createElement('section');
    this.$tab.className = 'tab';
    this.state = initialState;
    $target.appendChild(this.$tab);
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    };
    const setStyle = () => {
        const { current, prev } = this.state;
        const underline = this.$tab.lastElementChild;
        this.$tab.children[current].classList.add('tab__link--checked');
        const calcLeft = 100 / (this.$tab.children.length - 1);
        underline.style.width = `${calcLeft}%`;
        underline.style.left = `${prev * calcLeft}%`;
        if (current === prev) return;
        setTimeout(() => {
            underline.style.left = `${current * calcLeft}%`;
        }, 0);
    };
    this.render = () => {
        const template = `
        <li class="tab__link" data-index="0" data-route="/">인기</li>
        <li class ="tab__link" data-index="1" data-route="/recent">최신</li>
        <div class="tab__underline"></div>
        `.trim();

        this.$tab.innerHTML = template;
        setStyle();
    };
    this.render();
    this.$tab.addEventListener('click', e => {
        if (e.target.tagName !== 'LI') return;
        e.preventDefault();
        const { route, index } = e.target.dataset;
        if (route === location.pathname) return;
        if (route) {
            const { current } = this.state;

            this.$tab.children[current].classList.remove('tab__link--checked');
            this.$tab.children[+index].classList.add('tab__link--checked');
            changeRoute(route, { detail: { prev: current } });
        }
    });
}
