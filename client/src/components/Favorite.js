export default function Favorite({ $target, initialState, onClick }) {
    const $favorite = document.createElement('div');
    $favorite.className = 'favorite';
    this.state = initialState;
    $target.appendChild($favorite);
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const { selected, count } = this.state;
        const template = `
        <span class="favorite__content ${selected ? 'favorite__content--selected' : ''}">★ ${count}</span>
        `.trim();
        // $favorite.insertAdjacentHTML('beforeend',template);
        if (selected) $favorite.classList.add('favorite--selected');
        $favorite.innerHTML = template;
    };
    this.render();
    $favorite.addEventListener('click', e => {
        const { isAuth, selected, count } = this.state;
        if (!isAuth) {
            alert('로그인이 필요해요');
            return;
        }
        if (selected) {
            $favorite.classList.remove('favorite--selected');
            // $favorite.firstElementChild.classList.remove('favorite__content--selected');
            this.setState({
                isAuth: this.state.isAuth,
                selected: false,
                count: count - 1,
            });
            onClick(-1);
        } else {
            $favorite.classList.add('favorite--selected');
            this.setState({
                isAuth: this.state.isAuth,
                selected: true,
                count: count + 1,
            });
            onClick(1);
        }
    });
}
