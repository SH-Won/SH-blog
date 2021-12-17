import style from'../styles/Loading.module.css';
export default function Loading ({$target,initialState}){
    this.state = initialState;
    const $loading = document.createElement('div');
    $loading.className = `${style.loadingContainer}`
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    console.log('isLoading',this.state);
    this.render = () =>{
        if(!this.state){
            $loading.innerHTML = '';
            return;
        }
        $loading.innerHTML = `
            <div class="${style.loadingItem}"></div>
        `.repeat(4);
        $target.appendChild($loading);
        
    }
}