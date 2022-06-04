const ENDPOINT = `${window.origin}/api/posts/uploadfiles`;

class UploadAdapter{
    constructor(loader){
        this.loader = loader;
    }
    upload = () =>{
        return this.loader.file.then(async file => {
           let formData = new FormData();
           formData.append('file',file);
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
export default function CustomUploadAdapterPlugin(editor){
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new UploadAdapter(loader);
}

