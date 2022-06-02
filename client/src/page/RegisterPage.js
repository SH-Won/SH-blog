import '../styles/RegisterPage.css';

export default function RegisterPage({$target}){
    const $form = document.createElement('form');
    $form.id = 'register-form';
    $target.appendChild($form);

    this.state = {

    }
    this.setState = (nextState) =>{
        this.state = nextState;
    }
    this.render = () =>{
        $form.innerHTML = `
        <fieldset id="register-field">
        <legend>회원 가입</legend>
        <label for="name">성함</label>
        <input id="name" type="text" placeholder="성함을 입력해주세요"/>
        <label for="email">이메일</label>
        <input id="email" type="text" placeholder="이메일을 입력해주세요"/>
        <label for="password">비밀번호</label>
        <input id="password" type="password" placeholder="비밀번호를 입력해주세요"/>
        <label for="confirmPassword">비밀번호 확인</label>
        <input id="confirmPassword" type="password" placeholder="비밀번호를 다시한번 입력해주세요"/>
        <input id="submit" type="submit" value="회원가입"/>
        </fieldset>
        `
    }
    this.render();
    $form.addEventListener('change', e=>{
        if(!e.target.tagName ==='INPUT') return;

    })
}