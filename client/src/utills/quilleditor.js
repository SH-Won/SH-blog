
const ENDPOINT = `${window.origin}/api/posts/uploadfiles`;
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
    input.click();
    input.onchange = async function() {
        const formData = new FormData();
        console.log(this.files);
        for(let i=0; i<this.files.length; i++){
            formData.append('file',this.files[i]);
        }
        const res = await fetch(ENDPOINT,{
            method:'POST',
            headers:{
                // 'Content-Type':'multipart/form-data'
                // 'Content-Type':'multipart/x-www-form-urlencoded'
            },
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
                     url :`${window.origin}${url}`,
                     id:'',
                }
                editor.insertEmbed(range.index++,'image',value);                
            })
            editor.setSelection(++range.index,0);
            
        }
    }

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

export const quillEditor = async (element) =>{
     Quill.register(ImageBlot);
    //  const editor = new Quill(element,options);
    const editor = await import('quill').then(({default : Quill}) => new Quill(element,options))
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

