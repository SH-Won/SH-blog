import style from '../styles/ListView.module.css';
export default function ListView({$target,maxSize}){

    const $ListView = document.createElement('div');
    $ListView.className = `${style.listView}`
    $target.appendChild($ListView);
    this.state = {
        maxSize,
        current:null,
    }
    this.setState = (nextState) =>{
        this.state = nextState;
    }
    this.render = () =>{
         $ListView.innerHTML = `
         <ul class="${style.list}">
         ${Array(maxSize).fill().map((_,i) =>
            `
            <li data-index="${i+1}""><button class="${style.listBtn}">${i+1}x${i+1}</button></li>
            `).join('')}
         </ul>
         ` 
    }
    this.render();
    $ListView.addEventListener('click', e=>{
        if(e.target.tagName !== 'BUTTON') return;
        const index = e.target.parentNode.dataset.index;
        const posts = $target.children[1];
        posts.style.display = 'grid';
        posts.style.gridTemplateColumns = `repeat(${index},1fr)`;
        if(this.state.current){
        $ListView.children[0].children[this.state.current-1].children[0].style = `0.5px gray solid`;
        }
        e.target.style.border = `1px black solid`;
        this.setState({
            ...this.state,
            current:index,
        })
    })
}
