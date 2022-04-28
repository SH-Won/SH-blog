import {category} from './category.js';
import style from '../styles/CheckBox.module.css';
export default function CheckBox({$target,checked,callback = null}){
    const checkBox = document.createElement('div');
    checkBox.className = `${style.checkBox}`;
    $target.appendChild(checkBox);
    
    this.render = () => {
        checkBox.innerHTML = `
        ${category.map(el => `
        <label>
        <input type="checkbox" value="${el.id}"/>
        ${el.name}
        </label>
        `).join('')}
        `;
        checked.forEach(id => checkBox.children[id].children[0].checked = true);
    }
    this.render();
    checkBox.addEventListener('change',e =>{
        if(e.target.tagName !== 'INPUT') return;
        // const {checked} = this.state;
        const id = e.target.value;
        !e.target.checked ? callback(id,false) : callback(id,true);
    })
}