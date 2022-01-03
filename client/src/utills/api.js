const ENDPOINT = `${window.origin}/api/posts`;

export const request  = async (url ="",params = {}) =>{
    try{
        let query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        const fullUrl = `${ENDPOINT}${url !== "" ? url : ""}${query === '' ? '' : `?${query}`}`;
        const res = await fetch(fullUrl);
        if(!res.ok) throw new Error("서버가 이상해요");

        return await res.json();
    }catch(e){
         throw new Error("무언가 이상해~~");
    }
}
