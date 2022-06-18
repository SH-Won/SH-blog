import Quill from 'quill';
// const ENDPOINT = `${window.origin}`;
const ENDPOINT = 'https://shlog.herokuapp.com';
const options = {
    // debug: 'info',
    modules: {
      toolbar: [
          [{header : [1,2,false]}],
          ['bold','italic','underline'],
          ['image','code-block']
      ]
    },
    placeholder: '내용을 입력 하세요',
    // readOnly: true,
    theme: 'snow'
};
function uploadMulter(editor){
    // console.log(editor);
    const input = document.createElement('input');
    input.setAttribute('type','file');
    input.setAttribute('multiple','');
    input.setAttribute('accept','image/*');
    input.style.fontSize = '16px';
    input.style.display = 'none';
    const editorRoot = document.querySelector('.ql-container.ql-snow');
    editorRoot.appendChild(input);
   
    
     // IOS 의 경우 실제 input 이 웹 DOM 어딘가에 존재해야 change가 trigger 됨
    input.addEventListener('change',async () => {
        const formData = new FormData();
        for(let i=0; i<input.files.length; i++){
            formData.append('file',input.files[i]);
        }
        
        const res = await fetch(`${ENDPOINT}/api/posts/uploadfiles`,{
            method:'POST',
            headers:{
                // 'Content-Type':'multipart/form-data'
                // 'Content-Type':'multipart/x-www-form-urlencoded'
            },
            credentials:'include',
            body:formData,
        });
        if(res.ok){
            const {data} = await res.json();
            const range = editor.getSelection();
            data.forEach(({url})=>{
                
                // const delta = {
                //     insert: { image: `${window.origin}${url}` },
                //     attributes: { 'data-upload':'upload' }
                //   }
                const value = {
                     url :`${ENDPOINT}${url}`,
                     id:'',
                }
                editor.insertEmbed(range.index++,'image',value);                
            })
            editor.setSelection(++range.index,0);
            
        }
        editorRoot.removeChild(input);
    }
    )
    input.click();
}
let BlockEmbed = Quill.import('blots/block/embed');
class ImageBlot extends BlockEmbed{
    static create(value){
        let node = super.create();
        node.classList.add('image');
        const img = document.createElement('img');
        img.setAttribute('src',value.url);
        img.setAttribute('data-id',value.id);
        node.appendChild(img);
        return node;
    }
    static value(node){
        return {
            id:node.firstChild.getAttribute('data-id'),
            url:node.firstChild.getAttribute('src'),
        };
    }
    static set(node){

    }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'figure';

export const quillEditor = (element) =>{
     Quill.register(ImageBlot);
    //  const editor = new Quill(element,options);
    const editor = new Quill(element,options);
     editor.getModule('toolbar').addHandler('image',() =>{
        uploadMulter(editor);
    });
    return editor;
}





// export const toolbar = `
// <div id="toolbar">
//   <!-- Add font size dropdown -->
//   <select class="ql-size">
//     <option value="small"></option>
//     <!-- Note a missing, thus falsy value, is used to reset to default -->
//     <option selected></option>
//     <option value="large"></option>
//     <option value="huge"></option>
//   </select>
//   <!-- Add a bold button -->
//   <button class="ql-bold"></button>
//   <!-- Add subscript and superscript buttons -->
//   <button class="ql-script" value="sub"></button>
//   <button class="ql-script" value="super"></button>
// </div>
// `

