const ENDPOINT = `${window.origin}/api/posts/uploadfiles`;

import {selector} from './selector';
class UploadAdapter{
    constructor(loader){
        this.loader = loader;
        this.userId = selector(state => state?.userId);
    }
    upload = () =>{
        return this.loader.file.then(async file => {
           let formData = new FormData();
        //    const user = await auth();
           
           formData.append('id',this.userId)
           formData.append('file',file);
            const res = await fetch(ENDPOINT,{
                method:'POST',
                headers:{
                    // 'Content-Type':'multipart/form-data'
                    // 'Content-Type':'multipart/x-www-form-urlencoded'
                },
                body:formData,
            });
            return await res.json();
        }).then(({data}) => {
            console.log(data);
            return Promise.resolve({
                default:`http://localhost:5000${data.url}`,
                attributes : {
                    'data-id' : 'image',
                }
            }) 
            
        })

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

