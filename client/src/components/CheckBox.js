
import style from '../styles/CheckBox.module.css';
export default function CheckBox({$target,initialState,callback = null}){
    this.state = initialState;
    const checkBox = document.createElement('div');
    checkBox.className = `${style.checkBox}`;
    $target.appendChild(checkBox);
    this.setState = (nextState) =>{
        this.state = nextState;
        // this.render();
    }
    this.render = () => {
        const {items,checked} = this.state;
        const template = `
        ${items.map(item => `
        <label>
        <input type="checkbox" value="${item.id}"/>
        ${item.name}
        </label>
        `).join('')}
        `;
        checkBox.insertAdjacentHTML('beforeend',template);
        // checkBox.innerHTML = template;
        checked.forEach(id => checkBox.children[+id-1].children[0].checked = true);
    }
    this.render();
    checkBox.addEventListener('change',e =>{
        if(e.target.tagName !== 'INPUT') return;
        const id = e.target.value;
        callback(id,e.target.checked);
    })
}