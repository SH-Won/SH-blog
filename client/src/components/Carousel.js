import Button from './Button.js';
import style from '../styles/Carousel.module.css';

export default function Carousel({$target,initialState}){
    this.state ={
        images:initialState,
        direction:null,
        changeDirection:null,
    }
    let init = false;
    const $wrap = document.createElement('div');
    const $container = document.createElement('div');
    const $carousel = document.createElement('div');
    const $slider = document.createElement('div');
    $wrap.className = `${style.wrap}`
    $container.className = `${style.container}`;
    $carousel.className = `${style.carousel}`;
    $slider.className = `${style.slider}`;
    $slider.style.width = `${100 * this.state.images.length}%`

    $carousel.appendChild($slider);
    $container.appendChild($carousel);
    $wrap.appendChild($container);
    $target.appendChild($wrap);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = () =>{
        const {images} = this.state;
        const template = `
        ${images.map(image => `
        <div class="${style.item}">
          <img src="${image}"/>
        </div>
        `).join('')}
        `
        $slider.innerHTML = template;
        // $slider.insertAdjacentHTML('beforeend',templete);
       
        for(let i=0; i<this.state.images.length; i++){
        $slider.children[i].style.paddingTop = `${68 / this.state.images.length}%`;
        }
        
      

    }

    const prev = new Button({
        $target:$carousel,
        initialState:{
            className:style.prev,
            name:"prev",
            // style:{
            //     "position":"absolute",
            //     "left":"0",
            //     "top":"50%",
            //     "cursor": "pointer"
            // }
        },
        onClick:() =>{
            const {direction} = this.state;
            $slider.parentNode.style.justifyContent='flex-end';
            if(direction === null || direction===1){
                $slider.appendChild($slider.children[0]);
                this.state.changeDirection = true;
           }
            $slider.style.transform =`translateX(${100 /this.state.images.length}%)`
            $slider.style.transition ='transform 1s cubic-bezier(0.6, 0.35, 0, 1.04)'
            this.state.direction = 0;
        }
    })
    const next = new Button({
        $target:$carousel,
        initialState:{
            className:style.next,
            name:"next",
        },
        onClick: () =>{
           const {direction} =this.state;
           $slider.parentNode.style.justifyContent='flex-start';
           if(direction === 0){
            $slider.prepend($slider.children[$slider.children.length-1]);
             this.state.changeDirection = true;
           }
           $slider.style.transform =`translateX(-${100 /this.state.images.length}%)`
           $slider.style.transition ='transform 1s cubic-bezier(0.6, 0.35, 0, 1.04)';

        this.state.direction = 1;
        }
        
    })
    this.render();


    $slider.addEventListener('transitionend',()=>{
        const {direction,changeDirection} = this.state;
        $slider.style.transition='none';
        $slider.style.transform=''
        if(changeDirection){
            console.log(changeDirection);
            this.setState({
                ...this.state,
                changeDirection:false,
            })
            return;
        }
        let images = [...this.state.images];
        if(direction === 1){
            // 2 3 4 5 1 => 1 2 3 4 5
            images = images.slice(1,images.length).concat([images[0]]);
            this.setState({
                ...this.state,
                images,
                
            })
        }
        else{
            // 2 3 4 5 1 =>  3 4 5 1 2
            images = [images[images.length-1]].concat(images.slice(0,images.length-1));
            this.setState({
                ...this.state,
                images,
            })
        }

    })
}