import {storage} from '../utills/storage';
import { loginUser } from '../utills/api';
import { changeRoute } from '../utills/router';
export default function LoginPage({$target}){
    const $form = document.createElement('form');
    $target.appendChild($form);

    this.state = {
        email:'',
        password:'',
    }
    this.setState = (nextState) =>{

    } 
    this.render = () =>{
        $form.innerHTML = `
        <label for="email">이메일</label>
        <input id="email" type="text" placeholder="이메일을 입력해주세요"/>
        <br>
        <label for="password">비밀번호</label>
        <input id="password" type="password" placeholder="비밀번호를 입력해주세요"/>
        <br>
        <input type="submit" id="login" value="로그인"/> 
        `
    }
    $form.addEventListener('change', e =>{
        if(e.target.tagName !== 'INPUT') return;
        let {name,value} = e.target;
        setTimeout(() =>{
            if(value === e.target.value){
                const copy = {...this.state};
                copy[name] = value;
                this.setState(copy);
            }
        })
    })
    $form.addEventListener('submit' , () =>{
        const data = this.state;
        loginUser(data)
        .then(response =>{
            if(response.loginSuccess){
                storage.setItem('userId',response.userId);
                changeRoute('/');

            }else alert('이메일이나 비밀번호를 확인해주세요')
        })
    })
}