import { changeRoute } from '../utills/router';

export default function Tab({$target,initialState={}}){
    
    this.$tab = document.createElement('nav');
    this.$tab.className = 'nav';
    this.state = initialState;
    $target.appendChild(this.$tab);
    this.setState = (nextState) => {
         this.state = nextState;
         this.render();
    }
    this.render = () =>{
        const template = `
        <a class="nav__link" href="/" data-index="0">최신</a>
        <a class ="nav__link" href="/issue" data-index="1">이슈</a>
        <div class="nav__underline"></div>
        `.trim();
        const {current,prev} = this.state;
        this.$tab.innerHTML = template;
        const underline = this.$tab.lastElementChild;
        this.$tab.children[current].classList.add('nav__link--checked');
        
        // if(this.state?.style ){
            
        //     const {transition,left} = this.state.style;
            underline.style.left = `${prev*50}%`;
            setTimeout(()=>{
                // underline.style.transform = transform;
                // underline.style.transition = transition;
                // underline.style.left = left;
                underline.style.left = `${(current)*50}%`;
            },0)
        // }
        // underline.classList.add(`nav__underline--${pos}`);
    }
    this.$tab.addEventListener('click',e =>{
        if(e.target.tagName !== 'A') return;
        e.preventDefault();
        const route = e.target.pathname;
        if(route === location.pathname) return ;
        if(route){
            const {current} = this.state;
            const {index} = e.target.dataset;

            this.$tab.children[current].classList.remove('nav__link--checked');
            this.$tab.children[+index].classList.add('nav__link--checked');
            const underline = this.$tab.lastElementChild ;
            // underline.style.left = `${index*50}%`
            // underline.style.transform = `translateX(${(index-current)*100}%)`;
            // underline.style.transition = 'transform 1s cubic-bezier(0.6, 0.35, 0, 1.04)';

            // const style = {
            //     // transform : `translateX(${(+index-current)*100}%)`,
            //     transition: 'left 1s cubic-bezier(0.6, 0.35, 0, 1.04)',
            //     left : `${current*50}%`,
            // }
            // this.setState({
            //     ...this.state,
            //     style,
            // })
        
            changeRoute(route);
        }
    })
    
}