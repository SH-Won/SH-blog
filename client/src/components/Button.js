
export default function Button({$target,initialState,onClick = null}){
    this.state = {
        ...initialState,
    }
    this.onClick = onClick ;
    const $button = document.createElement('button');
    if(this.state.style !==undefined){
    for(let key of Object.keys(this.state.style)){
        const value = this.state.style[key];
        $button.style[key] = value;
    }
}
    $button.innerHTML = `${this.state.name}`
    $button.className = `${this.state.className}`
    
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        if(this.state.visible !==undefined){
        $button.style.display = this.state.visible ? 'block' : 'none'
        }
        $target.appendChild($button);
    }
    this.render();
    $button.addEventListener('click',this.onClick);
}