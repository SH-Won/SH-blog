import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
const ENDPOINT = `${window.origin}/api/posts/uploadfiles`;


class UploadAdapter{
    constructor(loader){
        this.loader = loader;
    }
    upload = () =>{
        return this.loader.file.then(async file => {
           let formData = new FormData();
           const config = 'content-type:multi'
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

export default function EditPage({$target}){
    
    const $page = document.createElement('form');
    const btn = document.createElement('button');
    $page.className = 'EditPage';
    $target.appendChild($page);
    this.editor = null;
    this.render = () =>{
        ClassicEditor.create($page,{
           extraPlugins: [CustomUploadAdapterPlugin]
        }).then(editor => this.editor = editor)
        .catch(err => console.log(err));
        $target.appendChild(btn);
    }
    this.render();
    btn.addEventListener('click',()=> console.log(this.editor.getData()))
}