export default function Input({$target,initialState,callback}){
    const input = document.createElement('input');
    $target.appendChild(input);
    input.placeholder =initialState.placeholder;
    input.className = initialState.className;
    input.value = initialState.title;

    input.addEventListener('change',e =>{
        if(e.target.tagName !== 'INPUT') return;
        let value = e.target.value;
        setTimeout(() =>{
            if(value === e.target.value){
                callback(e.target.value);
            }
        },200)
    })
}