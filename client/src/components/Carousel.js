import Button from './Button.js';
import style from '../styles/Carousel.module.css';

export default function Carousel({$target,initialState}){
    this.state ={
        images:initialState,
        direction:null,
    }
    console.log(this.state);
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
        $slider.innerHTML = `
        ${images.map(image => `
        <div class="${style.item}">
          <img src="${image}"/>
        </div>
        `).join('')}
        `

    }

    const prev = new Button({
        $target:$carousel,
        initialState:{
            className:style.prev,
            // style:{
            //     "position":"absolute",
            //     "left":"0",
            //     "top":"50%",
            //     "cursor": "pointer"
            // }
        },
        onClick:() =>{
            const {direction} = this.state;
            console.log(direction);
            
            if(direction === null || direction===1){
                
                console.log($slider.firstElementChild);
                 $slider.appendChild($slider.firstElementChild);
                
            }
            this.state.direction = 0;
            console.log(this.state.images);
            $slider.parentElement.style.justifyContent='flex-end';
            $slider.style.transform =`translateX(${100 /this.state.images.length}%)`
            $slider.style.transition ='transform 1s cubic-bezier(0.6, 0.35, 0, 1.04)'
        }
    })
    const next = new Button({
        $target:$carousel,
        initialState:{
            className:style.next,
        },
        onClick: () =>{
           const {direction} =this.state;
           console.log(direction)
           if(direction === 0){
             $slider.prepend($slider.lastElementChild);
            
           }
           this.state.direction = 1;
        
           $slider.parentElement.style.justifyContent='flex-start';
           $slider.style.transform =`translateX(-${100 /this.state.images.length}%)`
           $slider.style.transition ='transform 1s cubic-bezier(0.6, 0.35, 0, 1.04)'
        }
    })
    this.render();
    console.dir($slider);
    $slider.addEventListener('transitionend',()=>{
        const {direction} = this.state;
        console.log(direction);
        $slider.style.transition='none';
        $slider.style.transform=''
        let images = [...this.state.images];
        if(direction === 1){
            images = images.slice(1,images.length).concat([images[0]]);
            this.setState({
                ...this.state,
                images,
            })
            
        }
        else{
            // 2 3 4 5 1 =>  3 4 5 1 2
            images = [images[images.length-1]].concat(images.slice(0,images.length-1));
            console.log(images);
            this.setState({
                ...this.state,
                images,
            })

        }

    })
}