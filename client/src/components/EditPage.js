// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '../utills/ckeditor';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
// import CustomUploadAdapterPlugin from '../utills/UploadAdapter';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
// import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles';

// import styles from '../styles/EditPage.module.css';

const ENDPOINT = `${window.origin}/api/posts/uploadfiles`;

class UploadAdapter{
    constructor(loader){
        this.loader = loader;
    }
    upload = () =>{
        return this.loader.file.then(async file => {
           let formData = new FormData();
           formData.append('file',file);
           console.log(formData);
            const res = await fetch(ENDPOINT,{
                method:'POST',
                headers:{
                    // 'Content-Type':'multipart/form-data'
                },
                body:formData,
            });
            return await res.json();
        }).then(response => Promise.resolve({default:response.url}))

        // return this.loader.file.then(file =>  new Promise(async (resolve,reject) =>{
        //     let formData = new FormData();
        //     formData.append('file',file);
        //     const res = await fetch(ENDPOINT,{
        //         method:'POST',
        //         header:{

        //         },
        //         body:formData
        //     });
        //     if(res.ok){
        //         const response = await res.json();
        //         resolve({default:response.url});
        //     }
        // }))
    }
}
function CustomUploadAdapterPlugin(editor){
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new UploadAdapter(loader);
}


// ClassicEditor.builtinPlugins = [
//     CustomUploadAdapterPlugin,
// ]
export default function EditPage({$target}){
    
    const $page = document.createElement('div');
    const btn = document.createElement('button');
    $page.className = `EditPage`;
    $target.appendChild($page);
    this.editor = null;
    this.render = () =>{
        
        // ClassicEditor.builtinPlugins = [CodeBlock];
        ClassicEditor.create($page,{
        extraPlugins: [CustomUploadAdapterPlugin],
            //   plugins : [CustomUploadAdapterPlugin],
        //    plugins:[Image,ImageResizeEditing,ImageResizeHandles],
        //    language:'en',
        //    plugins:[CodeBlock],
        //    toolbar:['codeBlock'],
        //    plugins:[CodeBlock]
        //    codeBlock:{
        //     languages:[
        //         {language:'html', label:'HTML'},
        //         {language:'css',label:'CSS'},
        //         {language:'javascript',label:'JAVASCRIPT'}
        //     ],
        // },
        //    image:{
        //     //    styles:{
                   
        //     //    },
        //        resizeUnit:'%',
        //        resizeOptions:[{
        //            name:'resizeImage:original',
        //            value:null,
        //            icon:'original',
        //        },
        //        {
        //            name:'resizeImage:25',
        //            value:'25',
        //            icon:'small',
        //        },
        //        {
        //         name:'resizeImage:50',
        //         value:'50',
        //         icon:'medium',
        //        },
        //        {
        //         name:'resizeImage:75',
        //         value:'75',
        //         icon:'large'
        //       }
        //     ],
        //     toolbar :['resizeImage'],
        //    }

        })
        .then(editor =>{
        
            editor.editing.view.change(writer =>{
                // writer.setStyle('margin','1rem',editor.editing.view.document.getRoot());
                writer.setStyle('min-height','450px',editor.editing.view.document.getRoot());

            });
            // editor.plugins.get('FileRepository');
            // editor.plugins.get(CodeBlock);
            editor.ui.element.style.margin = '2rem';
            
            // console.log(editor.editing);
            // editor.ui.view.width = '70%';
            this.editor = editor;
        })
        .catch(err => console.log(err));
        $target.appendChild(btn);

        // this.editor.config
        
    }
    this.render();
    btn.addEventListener('click',()=> console.log(this.editor.getData()))
}