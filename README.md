# 💻 SH blog
- 본 프로젝트 SPA 프레임워크/라이브러리 인**React, Angular, Vue** 를 사용하지 않고, **JavaScript** 로 SPA 를 구현 되었습니다.
- **CRUD** 기능을 구현하기 위해 API 서버를 구축하고, 비동기 통신에 대해 학습합니다.
## 💡  프로젝트 스택
☀️ **Client**
- **Webpack**
- **<s>CKEditor5</s> -> Quill**

🌊 **Server**
- **Node.js**
- **Express**
- **mongoose**
- **multer**
- **cloudinary**

👀 **Deploy**
- **Vercel**
- **Heroku**

## 🏃 실행 방법
순서대로 진행해 주세요

**1. 복제**
```
git clone https://github.com/SH-Won/SH-blog.git
```
**2. mongoose, cloudinary 설정**

```js
// dev.js 
module.exports={
    mongoURI:''
    cloud_name:'',
    api_key:'',
    api_secret:''
}
// 자신의 mongoose, cloudinary 정보를 기입해주세요
```
**3. 관련 모듈 설치**

```
-루트 폴더에서
npm install
cd client ( client 폴더 이동)
npm install
```
**4.실행**

```
루트 폴더에서
npm run dev // 개발 모드로 실행
```
## 🚀 개발 흐름 ##
***페이지, 컴포넌트***  
1. 생성자 함수를 이용하여 페이지,컴포넌트를 작성  

2. this.setState 메서드를 만들어서 state 가 변경될 때, 상태에 따른 화면을 렌더링
3. 필요한 컴포넌트를 import 하여 호출하여 사용

```js
import Component from '../components/Component';

export default function Page({$target,initialState}){
   this.state = initialState;
  
   this.setState = (nextState) => {
      this.state = nextState;
      this.render();
   }
   this.render = () =>{
      // do someting
   }
   const component = new Component({
   
   })
}
```  

***SPA 구현***  
1. pathname 에 따라 알맞는 페이지를 렌더링  

2. 주소 이동 시 알맞는 페이지를 렌더링 하기 위해 History API 와 CustomEvent 사용


```js
// router.js
const ROUTE_EVENT = 'ROUTE_EVENT';

export const init = (onRouteChange) =>{
    window.addEventListener(ROUTE_EVENT,(e) =>{
        onRouteChange();
    });
}

export const changeRoute = (url,params=null) => {
    window.history.pushState(params,null,url);
    window.dispatchEvent(new CustomEvent(ROUTE_EVENT,params));
}
```
init 함수는 ROUTE_EVENT 를 감지하면 onRouteChange 를 실행하고 changeRoute 함수는 주소 이동시 history 를 추가한뒤 CustomEvent 를 발생시킨다. 즉 ROUTE_EVENT 가 발생 했으므로, onRouteChange 가 실행된다.

```js
// App.js
import { init } from './utills/router';
export default fuction App(root){
  // 주소 변경, 새로고침시 this.route 실행
  this.route = () =>{
       const { pathname } = location.pathname;
       if(pathname === '/'){
          new Page({})
       }
  }
  this.route();
  init(this.route); // ROUTE_EVENT 등록
  window.addEventListener('popstate', e => {
    this.route();
  })
}
```
뒤로가기, 앞으로가기 를 처리하기위해 popstate 이벤트 발생시 this.route 가 실행 되도록 설정

***사용자 로그인 상태에 따른 페이지 처리***  
1. 사용자의 로그인 상태마다 접근 가능한 페이지가 다름
2. 클로저를 이용한 Higher Order Function 사용

```js
// option (false = 로그인 필요없음 , true = 로그인 필요함 )
export default function Auth(Page,option){
      async function Authentication(arg){
          const user = await auth(); // 서버에서 유저정보 요청
          
          if(!user.isAuth){ // 로그인 상태가 아님
              if(option){  // 로그인이 필요하다면
                   changeRoute('로그인 페이지로 이동')
               }
               else new Page({...arg,user})
            }
           else{ // 로그인 상태이기 때문에 페이지 반환
               return new Page({...arg,user})
          }
      }

     return Authentication
}

```
HOF 를 사용 하지 않으면 로그인된 사용자만 접근 할 수 있는 페이지 마다 사용자의 정보를 요청하고 이에따라 다음을 실행하는 코드를 작성해야 한다. HOF 를 사용함으로서 코드의 중복을 방지 할 수 있다.

## ⚠️이슈 ##
### <span style="color:red"> ***⚡ CK Editor5 duplicated modules error*** </span>
중복된 모듈을 build 시 webpack 에러가 발생
```js
  // ckeditor.js
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  ClassicEditor.create($target,{
        extraPlugins: [],
        })
        .then(editor =>{
        })
        .catch(err => console.log(err));
```
**<span style="color:blue">해결</span>**

```js
// ckeditor.js
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

export default class ClassicEditor extends ClassicEditorBase {}
ClassicEditor.builtinPlugins = ['insert plugins you want'];
ClassicEditor.defaultConfig = {'insert config you want'};

//editor.js
import ClassicEditor from './ckeditor';
export default function Editor({$target,self}){

ClassicEditor.create($target,{
        extraPlugins: [],
        })
        .then(editor =>{
        })
        .catch(err => console.log(err));

}
```
---

### <span style="color:red"> **⚡ CK Editor5 --> Quill Editor**</span>
> 간단한 글, 코드블럭 작성, 이미지 업로드를 하기 위해 **WYSIWYG 에디터** 를 사용하였지만, **webpack bundle** 사이즈에서 **CK Editor5** 가 차지하는 용량이 <span style="color:red">**약 3.5MB**</span> 로 프로젝트엔 적합 하지 않다고 판단하여 비교적 가벼운 **Quill Editor** 로 바꾸기로 결정

---
### <span style="color:red">**⚡ Quill Editor Toolbar icons are not rendered**</span>

Quill Editor 의 Custom Toolbar 의 기능 icon 들이 화면에 표시 되지 않음

**<span style="color:blue">해결</span>**

```js
// webpack.common.js
module.exports ={
     ...
    module:{
        {
           test: /\.svg$/,
           loader: 'svg-inline-loader'
        },
   }
}
// svg-inline-loader 을 webpack 설정에 추가한다.
```

```js
// quill editor 가 svg 를
toolbarUploadBtn.innerHTML = require('quill/asset/image.svg');
// 위와 같은 형식으로 svg 를 가져오기 때문에
// svg-inline-loader 를 통해 webpack 으로 build 해야한다.
```
---
### <span style="color:red">**⚡ CORS**</span>
<u>Client -> Vercel  
Server -> Heroku</u> 로 배포   
Origin 이 다르기 때문에 당연히 교차 출처 리소스 공유 문제가 발생 할것이라고 이전 프로젝트 에서 경험.  

**해결**  

*현재 프로젝트에선 fetch 함수를 사용하고 있으므로, 먼저 fetch 함수의 option 을 수정 하였다.*

```js
const res = await fetch(fullUrl,{
            method:'GET',
            credentials : 'include', // 변경 옵션
        })

```  
*서버 쪽의 express cors 옵션 설정*

```js
const express = require('express');
const app = express();
const cors = require('cors');
const origin = 'your front domain';
// origin 을 반드시 Client origin 주소를 명시 해야 한다.
app.use(cors({origin,
  credentials:true,
}));

```  
---
### <span style="color:red">**⚡ Cookie 설정**</span>
vercel, heroku 배포 이후에 서버 주소로의 요청에 브라우저 쿠키가 안들어가는 문제 발생.  
여러가지 검색 결과 크로스 사이트(Cross-site)로 전송하는 요청의 경우 쿠키의 전송은 제한을 둔다는 사실을 알게됐다.  

```js
router.post('/login',(req,res) => {
         res.cookie('w_auth', user.token, {
                httpOnly:true,
                sameSite:'none',
                secure:true,
         }).json({ sueccess : true });
}
```
서버에서 쿠키 설정을 해줘서 해결 할 수 있었으나, 브라우저의 설정 옵션에 따라 쿠키가 전송이 안되는 문제가 발생. 특히 아이폰의 경우 Safari 옵션으로 크로스 추적방지를 활성화 하면 쿠키가 전송되지않음.

생각할 수 있는 해결책은 도메인을 일치시키는 것이다.
그러나 현재는 차선책으로 LocalStroage 에 저장

---

### <span style="color:red">**⚡ JWT 토큰**</span>
<u>토큰을 어디에 저장 해야 좋은 것일까?</u> 라는 생각을 계속하게 되면서, 관련 글을 많이 읽게 되었다.  
만약 **Cookie**를 사용한다고 하면, **CSRF** 공격을 당할 수도 있다.   
**Cookie**는 자동으로 요청헤더에 담겨서 전송되므로, 사용자가 의도하지 않았지만, 공격자의 의도대로 행동하게 될 수 있다.  
**Local Storage** 를 사용 하게 된다면, 공격자가 스크립트 한줄 만으로도 저장되어있는 토큰을 탈취해서 마치, 사용자인 마냥 행동 할 수 있다.  
**Local Storage** 는 **XSS** 공격에 매우 취약하다.  

사용자의 정보가 탈취 당할 수 있으므로, 이부분에 대해서 더 깊은 생각과 공부가 필요하다.

---
### <span style="color:red">**⚡ css 중복이 너무 많음**</span>

<br/>

## 😎 개선
### *bundle size 줄이기*<br/>
SPA(Single Page Application) 는 처음에만 페이지를 받아오고, 그 이후엔 JavaScript 를 이용하여 동적으로 DOM을 구성하여 화면을 렌더링 한다. 동적으로 DOM 을 구성하여 렌더링 하여 화면을 바꾸는 방식이 CSR(Client Side Rendering) 이다.
즉 SPA 는 CSR 방식을 채택한 것인데,
당연히 초기화면 진입시 모든 리소스를 다운 받기때문에 bundle size 가 커지면 커질수록 초기화면이 렌더링 되는 시간이 늘어 날 수 밖에 없다.

**1. webpack dynamic import**

각각의 route 에서 필요한 module 만 import 한다.


```js
import('./page/LandingPage').then(({default:page}) => new page()
```
**2. 라이브러리 사용시 필요한 모듈만 사용하기**

```js
// 변경 전
import Quill from 'quill'
const page = document.querySelector('.page');
const editor = new Quill(page);
// Quill Editor 의 전체 모듈을 가져와서 사용하기 때문에,
// 사용하지 않는 모듈까지 포함되므로 webpack-bundle-analyzer 로 확인결과 약 600KB 나 차지하는 것을 확인했다.

//변경 후
import Quill from 'quill/core';
Quill.register({
    'insert custom' 
})
const page = document.querySelector('.page');
const editor = new Quill(page);
// 필요한 부분만 Custom 하고나서 webpack-bundle-analyzer 로 확인결과 약 150KB 를 차지하므로 무려 450KB 나 번들 사이즈를 줄일 수 있었다.
```
라이브러리 사용시 필요한 부분만 import 해서 사용하여, bundle size 를 많이 줄일 수 있었다.