export default function SelectOptions({$target,className,initialState,callback}){
    this.state = initialState;
    const component = document.createElement('select');
    component.className = className;
    $target.appendChild(component);

    this.render = () =>{
        const {options,selected} = this.state;
        const template = `
        <option value="0">선택</option>
        ${options.map(option =>`
        <option value="${option._id}">
        ${option.name}
        </option>
        `).join('')}
        `;
        component.innerHTML = template;
        // component.insertAdjacentHTML('beforeend',template);

        component.children[selected].selected = true;
    }
    this.render();

    component.addEventListener('change', e =>{
        if(e.target.tagName !=='SELECT') return;
        console.log(e.target.value);
        const id = parseInt(e.target.value);
        if(id !== null){
            callback(id)
        }
    })
}