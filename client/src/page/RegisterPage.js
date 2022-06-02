import '../styles/RegisterPage.css';
import {registerUser} from '../utills/api';
import {changeRoute} from '../utills/router'
export default function RegisterPage({$target}){
    const $form = document.createElement('form');
    $form.id = 'register-form';
    $target.appendChild($form);

    this.state = {
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    }
    this.setState = (nextState) =>{
        this.state = nextState;
    }
    this.render = () =>{
        $form.innerHTML = `
        <fieldset id="register-field">
        <legend>회원 가입</legend>
        <label for="name">성함</label>
        <input id="name" name="name" type="text" placeholder="성함을 입력해주세요"/>
        <label for="email">이메일</label>
        <input id="email" name="email" type="text" placeholder="이메일을 입력해주세요"/>
        <label for="password">비밀번호</label>
        <input id="password" name="password" type="password" placeholder="비밀번호를 입력해주세요"/>
        <label for="confirmPassword">비밀번호 확인</label>
        <input id="confirmPassword" name="confirmPassword" type="password" placeholder="비밀번호를 다시한번 입력해주세요"/>
        <input id="submit" type="submit" value="회원가입"/>
        </fieldset>
        `
    }
    this.render();
    $form.addEventListener('change', e=>{
        if(!e.target.tagName ==='INPUT') return;
        let {value,name} = e.target;
        setTimeout(() =>{
            if(value === e.target.value){
                const copy = {...this.state};
                copy[name] = e.target.value;
                this.setState(copy);
            }
        },200)
    })
    $form.addEventListener('submit', e =>{
        e.preventDefault();
        const {name,email,password,confirmPassword}  = this.state;
        if(password.trim() !== confirmPassword){
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
            return;
        }
        const data = {
            name,
            email,
            password : password.trim(),
        }
        registerUser(data)
        .then(response => {
            if(!response.success){
                return alert("회원가입을 실패했습니다");
            }
            else{
                console.log('회원가입 완료');
                changeRoute('/login');
            }
        })
    })
}