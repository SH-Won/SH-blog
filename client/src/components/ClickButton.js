
export default function ClickButton({$target,initialState,onClick = null}){
    const button = document.createElement('button');
    this.state = initialState;
    
    this.setState = (nextState) =>{

    }
    this.render = () =>{
        const {className,name}  = this.state;
        button.className =className;
        button.innerText = name;
        $target.appendChild(button);
    }
    button.addEventListener('click', onClick);

}