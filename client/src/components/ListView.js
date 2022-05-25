import style from '../styles/ListView.module.css';
export default function ListView({$target,maxSize}){

    const $ListView = document.createElement('div');
    $ListView.className = `${style.listView}`
    $target.appendChild($ListView);
    this.state = {
        maxSize,
        currentIndex:null,
    }
    this.setState = (nextState) =>{
        this.state = nextState;
    }
    this.render = () =>{
         $ListView.innerHTML = `
         <ul class="${style.list}">
         ${Array(maxSize).fill().map((_,i) =>
            `
            <li data-index="${i}"><button class="${style.listBtn}">${i+1}EA</button></li>
            `).join('')}
         </ul>
         ` 
    }
    this.render();
    $ListView.addEventListener('click', e=>{
        if(e.target.tagName !== 'BUTTON') return;
        const posts = document.querySelector('.page > article');
        console.log(posts);
        const selectedIndex = +e.target.parentNode.dataset.index;
        const {currentIndex}  = this.state;
        // const posts = $target.children[2];
         if(selectedIndex === currentIndex){
            posts.style.display = 'flex';
            $ListView.children[0].children[currentIndex].children[0].style.border = `0.5px gray solid`; 
            this.setState({
                ...this.state,
                currentIndex:null,
            })
        }
        else{
         posts.style.display = 'grid';
         posts.style.gridTemplateColumns = `repeat(${selectedIndex+1},1fr)`;
         if(currentIndex !== null){
         $ListView.children[0].children[currentIndex].children[0].style.border = `0.5px gray solid`;
         }
         e.target.style.border = `1px black solid`;
         this.setState({
             ...this.state,
             currentIndex:selectedIndex,
         })
       }
    })
}
