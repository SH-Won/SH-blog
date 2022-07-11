import { changeRoute } from '../utills/router';

export default function Tab({$target,initialState={}}){
    
    this.$tab = document.createElement('section');
    this.$tab.className = 'tab';
    this.state = initialState;
    $target.appendChild(this.$tab);
    this.setState = (nextState) => {
         this.state = nextState;
         this.render();
    }
    this.render = () =>{
        const template = `
        <li class="tab__link" data-index="0" data-route="/">최신</li>
        <li class ="tab__link" data-index="1" data-route="/issue">이슈</li>
        <div class="tab__underline"></div>
        `.trim();
        const {current,prev} = this.state;
        this.$tab.innerHTML = template;
        const underline = this.$tab.lastElementChild;
        this.$tab.children[current].classList.add('tab__link--checked');

        underline.style.left = `${prev*50}%`;
        setTimeout(()=>{
            underline.style.left = `${(current)*50}%`;
        },0)
    }
    this.$tab.addEventListener('click',e =>{
        if(e.target.tagName !== 'LI') return;
        e.preventDefault();
        const {route,index} = e.target.dataset;
        if(route === location.pathname) return ;
        if(route){
            const {current} = this.state;

            this.$tab.children[current].classList.remove('tab__link--checked');
            this.$tab.children[+index].classList.add('tab__link--checked');
            const underline = this.$tab.lastElementChild ;
            changeRoute(route);
        }
    })
    
}