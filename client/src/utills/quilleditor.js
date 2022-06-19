
import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Image from 'quill/formats/image';
import Blockquote from 'quill/formats/blockquote';
import Underline from 'quill/formats/underline';
import { AlignClass, AlignStyle } from 'quill/formats/align';
import { DirectionAttribute,DirectionClass,DirectionStyle} from 'quill/formats/direction';
import Icons from 'quill/ui/icons';
import Picker from 'quill/ui/picker';
import IconPicker from 'quill/ui/icon-picker';
import ColorPicker from 'quill/ui/color-picker';
import Tooltip from 'quill/ui/tooltip';
import Link from 'quill/formats/link';
import { IndentClass as Indent } from 'quill/formats/indent';
import SnowTheme from 'quill/themes/snow';
import CodeBlock, {Code as InlineCode} from 'quill/formats/code'
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';

import List,{ListItem} from 'quill/formats/list';
import {FontClass,FontStyle} from 'quill/formats/font';
import {SizeClass,SizeStyle} from 'quill/formats/size';
import Header from 'quill/formats/header';



Quill.register({
    'attributors/attribute/direction': DirectionAttribute,
  
    'attributors/class/align': AlignClass,
    // 'attributors/class/background': BackgroundClass,
    // 'attributors/class/color': ColorClass,
    'attributors/class/direction': DirectionClass,
    'attributors/class/font': FontClass,
    'attributors/class/size': SizeClass,
  
    'attributors/style/align': AlignStyle,
    // 'attributors/style/background': BackgroundStyle,
    // 'attributors/style/color': ColorStyle,
    'attributors/style/direction': DirectionStyle,
    'attributors/style/font': FontStyle,
    'attributors/style/size': SizeStyle
  });
  Quill.register({
    'formats/align': AlignClass,
    'formats/direction': DirectionClass,
    // 'formats/indent': Indent,
  
    // 'formats/background': BackgroundStyle,
    // 'formats/color': ColorStyle,
    'formats/font': FontClass,
    'formats/size': SizeClass,
  
    'formats/blockquote': Blockquote,
    'formats/code-block': CodeBlock,
    'formats/header': Header,
    'formats/list': List,
  
    'formats/bold': Bold,
    'formats/code': InlineCode,
    'formats/italic': Italic,
    'formats/link': Link,
    // 'formats/script': Script,
    // 'formats/strike': Strike,
    'formats/underline': Underline,
  
    'formats/image': Image,
    // 'formats/video': Video,
  
    'formats/list/item': ListItem,
  
    // 'modules/formula': Formula,
    // 'modules/syntax': Syntax,
    'modules/toolbar': Toolbar,
  
    // 'themes/bubble': BubbleTheme,
    'themes/snow': SnowTheme,
  
    // 'ui/icons': Icons,
    'ui/picker': Picker,
    'ui/icon-picker': IconPicker,
    'ui/color-picker': ColorPicker,
    'ui/tooltip': Tooltip
  });



// const ENDPOINT = `${window.origin}`;
const ENDPOINT = 'https://shlog.herokuapp.com';
const options = {
    // debug: 'info',
    theme: 'snow',
    modules: {
        toolbar:{
      container: [
          [{header : [1,2,false]}],
          ['bold','italic','underline'],
          
          ['image','code-block']
      ]
    }
    },
    placeholder: '내용을 입력 하세요',
    // readOnly: true,

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
     
    //  Quill.import('modules/toolbar')
    //  const editor = new Quill(element,options);
    const editor = new Quill(element,options);
    // const buttons = document.querySelectorAll('.ql-toolbar.ql-snow > .ql-formats > button')
    // buttons.forEach(button => {
    //     const className = button.className;
    //     if(className.includes('ql-') === -1) return;
    //     button.innerHTML = Icons[className.slice('ql-'.length)]
    // })
    // const Theme = editor.import('themes/snow');
    // new Theme(editor,editor.options);
    // editor.theme.addModule('toolbar');
    
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

