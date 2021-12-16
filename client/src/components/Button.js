
export default function Button({$target,initialState,onClick}){
    this.state = initialState;
    this.onClick = onClick;
    const $button = document.createElement('button');
    $button.style ={
        ...this.state.style,
    }
    $button.innerHTML = `${this.state.name}`
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        $target.appendChild($button);
    }
    this.render();

}