
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
    console.log('checkbox',this.state)
    this.render = () => {
        const {items,checked} = this.state;
        const template = `
        ${items.map(item => `
        <input type="checkbox" value="${item.id}"/>
        <label>
        ${item.name}
        </label>
        &nbsp;
        `).join('')}
        `;
        checkBox.insertAdjacentHTML('beforeend',template);
        // checkBox.innerHTML = template;
        checked.forEach(id => checkBox.children[(+id-1)*2].checked = true);
    }
    this.render();
    checkBox.addEventListener('change',e =>{
        if(e.target.tagName !== 'INPUT') return;
        const id = e.target.value;
        callback(id,e.target.checked);
    })
}