import style from'../styles/Loading.module.css';
export default function Loading ({$target,initialState}){
    this.state = initialState;
    const $loading = document.createElement('div');
    $loading.className = `${style.loadingContainer}`
    $loading.innerHTML = `
            <div class="${style.loadingItem}"></div>
        `.repeat(4);
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = () =>{
        if(!this.state){
            $target.removeChild($loading);
            return;
        }
        $target.appendChild($loading);
        
    }
}