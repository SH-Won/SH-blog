// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// // import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// // import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
// // import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
// import CustomUploadAdapterPlugin from './UploadAdapter';


// export default function Editor({$target,self}){
//     ClassicEditor.create($target,{
//         extraPlugins: [CustomUploadAdapterPlugin],
//         // plugins:[CodeBlock],
//         //    plugins:[Image,ImageResizeEditing,ImageResizeHandles],
//            language:'en',
//         //    plugins:[CodeBlock],
//         //    toolbar:['codeBlock'],
//         //    plugins:[CodeBlock]
//         //    codeBlock:{
//         //     languages:[
//         //         {language:'html', label:'HTML'},
//         //         {language:'css',label:'CSS'},
//         //         {language:'javascript',label:'JAVASCRIPT'}
//         //     ],
//         // },
//         //    image:{
//         //     //    styles:{
                   
//         //     //    },
//         //        resizeUnit:'%',
//         //        resizeOptions:[{
//         //            name:'resizeImage:original',
//         //            value:null,
//         //            icon:'original',
//         //        },
//         //        {
//         //            name:'resizeImage:25',
//         //            value:'25',
//         //            icon:'small',
//         //        },
//         //        {
//         //         name:'resizeImage:50',
//         //         value:'50',
//         //         icon:'medium',
//         //        },
//         //        {
//         //         name:'resizeImage:75',
//         //         value:'75',
//         //         icon:'large'
//         //       }
//         //     ],
//         //     toolbar :['resizeImage'],
//         //    }

//         })
//         .then(editor =>{
        
//             editor.editing.view.change(writer =>{
//                 // writer.setStyle('margin','1rem',editor.editing.view.document.getRoot());
//                 writer.setStyle('min-height','450px',editor.editing.view.document.getRoot());

//             });
//             // editor.plugins.get('FileRepository');
//             // editor.plugins.get(CodeBlock);
//             editor.ui.element.style.margin = '2rem';
            
//             // console.log(editor.editing);
//             // editor.ui.view.width = '70%';
//             self = editor;
//         })
//         .catch(err => console.log(err));

// }