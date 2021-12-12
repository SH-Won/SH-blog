const ENDPOINT = `${window.origin}/api/posts`;

export const request  = async (url) =>{
    try{
        const fullUrl = `${ENDPOINT}${url !== undefined ? url : ""}`
        console.log(fullUrl);
        const res = await fetch(fullUrl);
        if(!res.ok) throw new Error("서버가 이상해요");

        return await res.json();
    }catch(e){
         throw new Error("무언가 이상해~~");
    }
}
