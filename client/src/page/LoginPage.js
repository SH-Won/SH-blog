import '../styles/LoginPage.css';
import {setItem} from '../utills/storage';
import { auth, loginUser } from '../utills/api';
import { changeRoute } from '../utills/router';
import { selector } from '../utills/selector';
export default function LoginPage({$target,connect}){
    const $page = document.createElement('div');
    const $form = document.createElement('form');
    $page.id = 'login-page';
    $form.id = 'login-form';
    $page.innerHTML = '<h2>로그인</h2>'
    $page.appendChild($form);
    $target.appendChild($page);

    this.state = {
        email:'',
        password:'',
        isValidEmail : null,
        isValidPassword : null,
    }
    this.setState = (nextState) =>{
        this.state = nextState;
        // this.render();
    } 
    this.render = () =>{
        const template = `
        <label for="email">이메일</label>
        <input class="login" name="email" type="text" placeholder="이메일을 입력해주세요" value=""/>
        <br>
        <label for="password">비밀번호</label>
        <input class="login" name="password" type="password" placeholder="비밀번호를 입력해주세요" value=""/>
        <br>
        <input type="submit" id="login-submit" value="로그인"/> 
        `
        $form.insertAdjacentHTML('beforeend',template);
    }
    this.render();
    let timer = null;
    $form.addEventListener('input', e =>{
        if(e.target.tagName !== 'INPUT') return;
        const {name,value} = e.target;
        if(timer) clearTimeout(timer);
        timer = setTimeout(() =>{
            
            const copy = {...this.state};
                copy[name] = value;
                if(name === 'email'){
                    e.target.className = 'login'
                    if(value === '') copy['isValidEmail'] = null;
                    else{
                        const isValid = copy[name].search(/[@]/g) >= 1 ? true : false;
                        copy['isValidEmail'] = isValid;
                        
                        e.target.classList.add(isValid ? 'valid' : 'invalid');
                        
                    }
                }
                else if(name === 'password'){
                    e.target.className = 'login'
                    if(value === '') copy['isValidPassword'] = null;
                    else{
                        const isValid = copy[name].match(/\s/g) ? false : true;
                        copy['isValidPassword'] = isValid;
                        e.target.classList.add(isValid ? 'valid' : 'invalid');
                        
                    }
                }
                
                this.setState(copy);
                
        },200)
    })
    $form.addEventListener('submit' , e =>{
        e.preventDefault();
        if(!this.state.isValidEmail || !this.state.isValidPassword){
            alert('이메일이나 비밀번호 형식이 잘못됐습니다');
            return;
        }
        const data = {
            email:this.state.email,
            password:this.state.password,
        }
        loginUser(data)
        .then(async response =>{
            if(response.loginSuccess){
                selector(null,'loginSuccess',true);
                // document.cookie('w_auth',response.userToken);
                console.log('response',response);
                setItem('authorization',response.token);
                setItem('refreshToken',response.refreshToken);
                setItem('loginSuccess',true);
                // document.cookie = `w_auth=${response.userToken}`;
                changeRoute(connect,{detail : {loginSuccess:true}});

            }else alert('이메일이나 비밀번호를 확인해주세요')
        })
    })
}