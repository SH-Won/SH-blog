export default function TitleInput({$target,className,callback}){
    const input = document.createElement('input');
    $target.appendChild(input);
    input.placeholder = '제목을 입력해 주세요';
    input.className = className;

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