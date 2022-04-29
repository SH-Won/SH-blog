import {category} from './category.js';
import style from '../styles/CheckBox.module.css';
export default function CheckBox({$target,check,callback = null}){
    this.state = check;
    const checkBox = document.createElement('div');
    checkBox.className = `${style.checkBox}`;
    $target.appendChild(checkBox);
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    console.log(check);
    this.render = () => {
        checkBox.innerHTML = `
        ${category.map(el => `
        <label>
        <input type="checkbox" value="${el.id}"/>
        ${el.name}
        </label>
        `).join('')}
        `;
        this.state.forEach(id => checkBox.children[+id-1].children[0].checked = true);
    }
    this.render();
    checkBox.addEventListener('change',e =>{
        if(e.target.tagName !== 'INPUT') return;
        const id = e.target.value;
        callback(id,e.target.checked);
    })
}