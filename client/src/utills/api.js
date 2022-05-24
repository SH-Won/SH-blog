const ENDPOINT = `${window.origin}/api`;

export const request  = async (url ="",params = {}) =>{
    try{
        let query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        const fullUrl = `${ENDPOINT}/posts${url !== "" ? url : ""}${query === '' ? '' : `?${query}`}`;
        // console.log(JSON.stringify(params))
        const res = await fetch(fullUrl);
        if(!res.ok) throw new Error("서버가 이상해요");
        return await res.json();
    }catch(e){
         throw new Error("무언가 이상해~~");
    }
}
export const uploadArticle = async (data = {}) =>{
    try{    
        const fullUrl = `${ENDPOINT}/posts/uploadArticle`;
        
        const res = await fetch(fullUrl,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:JSON.stringify(data)
        })
        const {success} = await res.json();
        if(success) return success;

    }catch(e){
        throw new Error("무언가 이상합니다");
    }
}
