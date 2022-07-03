import { getItem } from './storage';

// const ENDPOINT =  `${window.origin}`;
const ENDPOINT = 'https://blog-sh.herokuapp.com';
// const ENDPOINT = process.env.API_ENDPOINT;

export const request  = async (url ="",params = {}) =>{
    try{
        let query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        const fullUrl = `${ENDPOINT}/api/posts${url !== "" ? url : ""}${query === '' ? '' : `?${query}`}`;
        const res = await fetch(fullUrl);
        if(!res.ok) throw new Error("서버가 이상해요");
        return await res.json();
    }catch(e){
         throw new Error("무언가 이상해~~");
    }
}
export const uploadArticle = async (data = {} , category ='article') =>{
    try{    
        const fullUrl = `${ENDPOINT}/api/posts/${category === 'article' ? 'uploadArticle' : 'uploadPost'}`;
        
        const res = await fetch(fullUrl,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials : 'include',
            body:JSON.stringify(data)
        })
        const {success} = await res.json();
        if(success) return success;

    }catch(e){
        throw new Error("무언가 이상합니다");
    }
}
export const updateArticle = async (data = {}) =>{
    try{
        const fullUrl = `${ENDPOINT}/api/posts/updateArticle`;
        const res = await fetch(fullUrl,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            credentials:'include',
            body:JSON.stringify(data)
        })
        const {success} = await res.json();
        if(success) return success;

    }catch(e){
        throw new Error("무언가 이상합니다");
    }
}
export const deleteArticle = async (data = {}) =>{
    try{
        const fullUrl = `${ENDPOINT}/api/posts/deleteArticle`;
        const res = await fetch(fullUrl,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials:'include',
            body:JSON.stringify(data),
        })
        const {success} = await res.json();
        if(success) return success;
    }catch(e){

    }
}
export const registerUser = async (data = {}) =>{
    try{
        const fullUrl = `${ENDPOINT}/api/users/register`;
        const res = await fetch(fullUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            credentials:'include',
            body:JSON.stringify(data),
        });
        if(!res.ok) throw new Error("회원가입 실패");
        return await res.json();

    }catch(e){

    }
}
export const loginUser = async (data = {}) =>{
    try{
        const fullUrl = `${ENDPOINT}/api/users/login`;
        const res = await fetch(fullUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            credentials:'include',
            body:JSON.stringify(data),
        });
        console.log(res.headers);
        if(res.ok) return await res.json(); 

    }catch(e){

    }
}
export const auth = async () =>{
    const token = getItem('authorization');
    const refreshToken = getItem('refreshToken');
    try{
        const fullUrl = `${ENDPOINT}/api/users/auth`;
        const res = await fetch(fullUrl,{
            method:'GET',
            headers:{
                'authorization':token,
                'refreshtoken':refreshToken,
            },
            credentials:'include',
        });
        if(res.ok) return await res.json();
    }catch(e){
        
    }
}
export const logoutUser = async () =>{
    const token = getItem('authorization');
    const refreshToken = getItem('refreshToken');
    try{
        const fullUrl =`${ENDPOINT}/api/users/logout`;
        const res = await fetch(fullUrl,{
            headers:{
                'authorization':token,
                'refreshtoken':refreshToken,
            },
            credentials:'include',
        });
        if(res.ok) return await res.json();
    }catch(e){
        
    }
}
export const destoryImage = async (data = {}) =>{
    const token = getItem('authorization');
    const refreshToken = getItem('refreshToken');
    try{
        const fullUrl = `${ENDPOINT}/api/posts/destory`;
        const res = await fetch(fullUrl,{
            headers:{
                'authorization':token,
                'refreshtoken':refreshToken,
            },
            credentials:'include',
        });
        const {success} = await res.json();
        if(success) return success;
           
    }catch(e) {

    }
}
export const uploadCloudinary = async (data = {}) =>{
    try{
        const fullUrl = `${ENDPOINT}/api/posts/upload`;
        const res = await fetch(fullUrl,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                
            },
            credentials:'include',
            body:JSON.stringify(data)
        })
        if(res.ok) return await res.json();

    }catch(e){

    }
}