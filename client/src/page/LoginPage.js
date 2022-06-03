import '../styles/LoginPage.css';
import {setItem} from '../utills/storage';
import { loginUser } from '../utills/api';
import { changeRoute } from '../utills/router';
export default function LoginPage({$target,connect}){
    const $form = document.createElement('form');
    $form.id = 'login-form';
    $target.appendChild($form);

    this.state = {
        email:'',
        password:'',
        isValidEmail : false,
        isValidPassword : false,
    }
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    } 
    this.render = () =>{
        const {email,password,isValidEmail,isValidPassword} = this.state;
        console.log(isValidPassword);
        $form.innerHTML = `
        <label for="email">이메일</label>
        <input class="${isValidEmail ? 'login valid' : email === "" ? 'login' : 'login invalid'}" name="email" type="text" placeholder="이메일을 입력해주세요" value="${email}"/>
        <br>
        <label for="password">비밀번호</label>
        <input class="${isValidPassword ? 'login valid' : password === "" ? 'login' : 'login invalid'}" name="password" type="password" placeholder="비밀번호를 입력해주세요" value="${password}"/>
        <br>
        <input type="submit" id="login-submit" value="로그인"/> 
        `
    }
    this.render();
    $form.addEventListener('change', e =>{
        if(e.target.tagName !== 'INPUT') return;
        let {name,value} = e.target;
        setTimeout(() =>{
            if(value === e.target.value){
                const copy = {...this.state};
                copy[name] = e.target.value;
                if(name === 'email'){
                    copy['isValidEmail'] = copy[name].search(/[@]/g) >= 1 ? true : false;
                }
                else if(name === 'password'){
                    copy['isValidPassword'] = copy[name].match(/\s/g) ? false : true; 
                    console.log(copy['isValidPassword'])
                }
                console.log(copy);
                this.setState(copy);
            }
        },200)
    })
    $form.addEventListener('submit' , e =>{
        e.preventDefault();
        if(!this.state.isValidEmail || !this.state.isValidPassword){
            alert('이메일이나 비밀번호 형식이 잘못됐습니다');
            return;
        }
        const data = this.state;
        loginUser(data)
        .then(response =>{
            if(response.loginSuccess){
                setItem('userId',response.userId);
                changeRoute(connect);

            }else alert('이메일이나 비밀번호를 확인해주세요')
        })
    })
}