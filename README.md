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
## ⚠️이슈 ##
### <span style="color:red"> ***CK Editor5 duplicated modules error*** </span>
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
<br/>

### <span style="color:red"> **CK Editor5 --> Quill Editor**</span>
> 간단한 글, 코드블럭 작성, 이미지 업로드를 하기 위해 **WYSIWYG 에디터** 를 사용하였지만, **webpack bundle** 사이즈에서 **CK Editor5** 가 차지하는 용량이 <span style="color:red">**약 3.5MB**</span> 로 프로젝트엔 적합 하지 않다고 판단하여 비교적 가벼운 **Quill Editor** 로 바꾸기로 결정

<br/>

### <span style="color:red">**Quill Editor Toolbar icons are not rendered**</span>

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

### <span style="color:red">**CORS**</span>
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

// origin 을 반드시 Client origin 주소를 명시 해야 한다.
app.use(cors({origin,
  credentials:true,
}));

```  
### <span style="color:red">**JWT 토큰**</span>
<u>토큰을 어디에 저장 해야 좋은 것일까?</u> 라는 생각을 계속하게 되면서, 관련 글을 많이 읽게 되었다.  
만약 **Cookie**를 사용한다고 하면, **CSRF** 공격을 당할 수도 있다.   
**Cookie**는 자동으로 요청헤더에 담겨서 전송되므로, 사용자가 의도하지 않았지만, 공격자의 의도대로 행동하게 될 수 있다.  
**Local Storage** 를 사용 하게 된다면, 공격자가 스크립트 한줄 만으로도 저장되어있는 토큰을 탈취해서 마치, 사용자인 마냥 행동 할 수 있다.  
**Local Storage** 는 **XSS** 공격에 매우 취약하다.  

사용자의 정보가 탈취 당할 수 있으므로, 이부분에 대해서 더 깊은 생각과 공부가 필요하다.

- **Cookie**
- **Local Storage**

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