# π» SH blog
- λ³Έ νλ‘μ νΈ SPA νλ μμν¬/λΌμ΄λΈλ¬λ¦¬ μΈ**React, Angular, Vue** λ₯Ό μ¬μ©νμ§ μκ³ , **JavaScript** λ‘ SPA λ₯Ό κ΅¬ν λμμ΅λλ€.
- **CRUD** κΈ°λ₯μ κ΅¬ννκΈ° μν΄ API μλ²λ₯Ό κ΅¬μΆνκ³ , λΉλκΈ° ν΅μ μ λν΄ νμ΅ν©λλ€.
## π‘  νλ‘μ νΈ μ€ν
βοΈ **Client**
- **Webpack**
- **<s>CKEditor5</s> -> Quill**

π **Server**
- **Node.js**
- **Express**
- **mongoose**
- **multer**
- **cloudinary**

π **Deploy**
- **Vercel**
- **Heroku**

## π μ€ν λ°©λ²
μμλλ‘ μ§νν΄ μ£ΌμΈμ

**1. λ³΅μ **
```
git clone https://github.com/SH-Won/SH-blog.git
```
**2. mongoose, cloudinary μ€μ **

```js
// dev.js 
module.exports={
    mongoURI:''
    cloud_name:'',
    api_key:'',
    api_secret:''
}
// μμ μ mongoose, cloudinary μ λ³΄λ₯Ό κΈ°μν΄μ£ΌμΈμ
```
**3. κ΄λ ¨ λͺ¨λ μ€μΉ**

```
-λ£¨νΈ ν΄λμμ
npm install
cd client ( client ν΄λ μ΄λ)
npm install
```
**4.μ€ν**

```
λ£¨νΈ ν΄λμμ
npm run dev // κ°λ° λͺ¨λλ‘ μ€ν
```
## β οΈμ΄μ ##
### <span style="color:red"> ***CK Editor5 duplicated modules error*** </span>
μ€λ³΅λ λͺ¨λμ build μ webpack μλ¬κ° λ°μ
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
**<span style="color:blue">ν΄κ²°</span>**

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

### <span style="color:red"> **CK Editor5 --> Quill Editor**</span>
> κ°λ¨ν κΈ, μ½λλΈλ­ μμ±, μ΄λ―Έμ§ μλ‘λλ₯Ό νκΈ° μν΄ **WYSIWYG μλν°** λ₯Ό μ¬μ©νμμ§λ§, **webpack bundle** μ¬μ΄μ¦μμ **CK Editor5** κ° μ°¨μ§νλ μ©λμ΄ <span style="color:red">**μ½ 3.5MB**</span> λ‘ νλ‘μ νΈμ μ ν© νμ§ μλ€κ³  νλ¨νμ¬ λΉκ΅μ  κ°λ²Όμ΄ **Quill Editor** λ‘ λ°κΎΈκΈ°λ‘ κ²°μ 

---
### <span style="color:red">**Quill Editor Toolbar icons are not rendered**</span>

Quill Editor μ Custom Toolbar μ κΈ°λ₯ icon λ€μ΄ νλ©΄μ νμ λμ§ μμ

**<span style="color:blue">ν΄κ²°</span>**

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
// svg-inline-loader μ webpack μ€μ μ μΆκ°νλ€.
```

```js
// quill editor κ° svg λ₯Ό
toolbarUploadBtn.innerHTML = require('quill/asset/image.svg');
// μμ κ°μ νμμΌλ‘ svg λ₯Ό κ°μ Έμ€κΈ° λλ¬Έμ
// svg-inline-loader λ₯Ό ν΅ν΄ webpack μΌλ‘ build ν΄μΌνλ€.
```
---
### <span style="color:red">**CORS**</span>
<u>Client -> Vercel  
Server -> Heroku</u> λ‘ λ°°ν¬   
Origin μ΄ λ€λ₯΄κΈ° λλ¬Έμ λΉμ°ν κ΅μ°¨ μΆμ² λ¦¬μμ€ κ³΅μ  λ¬Έμ κ° λ°μ ν κ²μ΄λΌκ³  μ΄μ  νλ‘μ νΈ μμ κ²½ν.  

**ν΄κ²°**  

*νμ¬ νλ‘μ νΈμμ  fetch ν¨μλ₯Ό μ¬μ©νκ³  μμΌλ―λ‘, λ¨Όμ  fetch ν¨μμ option μ μμ  νμλ€.*

```js
const res = await fetch(fullUrl,{
            method:'GET',
            credentials : 'include', // λ³κ²½ μ΅μ
        })

```  
*μλ² μͺ½μ express cors μ΅μ μ€μ *

```js
const express = require('express');
const app = express();
const cors = require('cors');
const origin = 'your front domain';
// origin μ λ°λμ Client origin μ£Όμλ₯Ό λͺμ ν΄μΌ νλ€.
app.use(cors({origin,
  credentials:true,
}));

```  
---
### <span style="color:red">**Cookie μ€μ **</span>
vercel, heroku λ°°ν¬ μ΄νμ μλ² μ£Όμλ‘μ μμ²­μ λΈλΌμ°μ  μΏ ν€κ° μλ€μ΄κ°λ λ¬Έμ  λ°μ.  
μ¬λ¬κ°μ§ κ²μ κ²°κ³Ό ν¬λ‘μ€ μ¬μ΄νΈ(Cross-site)λ‘ μ μ‘νλ μμ²­μ κ²½μ° μΏ ν€μ μ μ‘μ μ νμ λλ€λ μ¬μ€μ μκ²λλ€.  

```js
router.post('/login',(req,res) => {
         res.cookie('w_auth', user.token, {
                httpOnly:true,
                sameSite:'none',
                secure:true,
         }).json({ sueccess : true });
}
```
μλ²μμ μΏ ν€ μ€μ μ ν΄μ€μ ν΄κ²° ν  μ μμμΌλ, λΈλΌμ°μ μ μ€μ  μ΅μμ λ°λΌ μΏ ν€κ° μ μ‘μ΄ μλλ λ¬Έμ κ° λ°μ. νΉν μμ΄ν°μ κ²½μ° Safari μ΅μμΌλ‘ ν¬λ‘μ€ μΆμ λ°©μ§λ₯Ό νμ±ν νλ©΄ μΏ ν€κ° μ μ‘λμ§μμ.

μκ°ν  μ μλ ν΄κ²°μ±μ λλ©μΈμ μΌμΉμν€λ κ²μ΄λ€.
κ·Έλ¬λ νμ¬λ μ°¨μ μ±μΌλ‘ LocalStroage μ μ μ₯

---

### <span style="color:red">**JWT ν ν°**</span>
<u>ν ν°μ μ΄λμ μ μ₯ ν΄μΌ μ’μ κ²μΌκΉ?</u> λΌλ μκ°μ κ³μνκ² λλ©΄μ, κ΄λ ¨ κΈμ λ§μ΄ μ½κ² λμλ€.  
λ§μ½ **Cookie**λ₯Ό μ¬μ©νλ€κ³  νλ©΄, **CSRF** κ³΅κ²©μ λΉν  μλ μλ€.   
**Cookie**λ μλμΌλ‘ μμ²­ν€λμ λ΄κ²¨μ μ μ‘λλ―λ‘, μ¬μ©μκ° μλνμ§ μμμ§λ§, κ³΅κ²©μμ μλλλ‘ νλνκ² λ  μ μλ€.  
**Local Storage** λ₯Ό μ¬μ© νκ² λλ€λ©΄, κ³΅κ²©μκ° μ€ν¬λ¦½νΈ νμ€ λ§μΌλ‘λ μ μ₯λμ΄μλ ν ν°μ νμ·¨ν΄μ λ§μΉ, μ¬μ©μμΈ λ§λ₯ νλ ν  μ μλ€.  
**Local Storage** λ **XSS** κ³΅κ²©μ λ§€μ° μ·¨μ½νλ€.  

μ¬μ©μμ μ λ³΄κ° νμ·¨ λΉν  μ μμΌλ―λ‘, μ΄λΆλΆμ λν΄μ λ κΉμ μκ°κ³Ό κ³΅λΆκ° νμνλ€.

---
### <span style="color:red">**css μ€λ³΅μ΄ λλ¬΄ λ§μ**</span>

<br/>

## π κ°μ 
### *bundle size μ€μ΄κΈ°*<br/>
SPA(Single Page Application) λ μ²μμλ§ νμ΄μ§λ₯Ό λ°μμ€κ³ , κ·Έ μ΄νμ JavaScript λ₯Ό μ΄μ©νμ¬ λμ μΌλ‘ DOMμ κ΅¬μ±νμ¬ νλ©΄μ λ λλ§ νλ€. λμ μΌλ‘ DOM μ κ΅¬μ±νμ¬ λ λλ§ νμ¬ νλ©΄μ λ°κΎΈλ λ°©μμ΄ CSR(Client Side Rendering) μ΄λ€.
μ¦ SPA λ CSR λ°©μμ μ±νν κ²μΈλ°,
λΉμ°ν μ΄κΈ°νλ©΄ μ§μμ λͺ¨λ  λ¦¬μμ€λ₯Ό λ€μ΄ λ°κΈ°λλ¬Έμ bundle size κ° μ»€μ§λ©΄ μ»€μ§μλ‘ μ΄κΈ°νλ©΄μ΄ λ λλ§ λλ μκ°μ΄ λμ΄ λ  μ λ°μ μλ€.

**1. webpack dynamic import**

κ°κ°μ route μμ νμν module λ§ import νλ€.


```js
import('./page/LandingPage').then(({default:page}) => new page()
```
**2. λΌμ΄λΈλ¬λ¦¬ μ¬μ©μ νμν λͺ¨λλ§ μ¬μ©νκΈ°**

```js
// λ³κ²½ μ 
import Quill from 'quill'
const page = document.querySelector('.page');
const editor = new Quill(page);
// Quill Editor μ μ μ²΄ λͺ¨λμ κ°μ Έμμ μ¬μ©νκΈ° λλ¬Έμ,
// μ¬μ©νμ§ μλ λͺ¨λκΉμ§ ν¬ν¨λλ―λ‘ webpack-bundle-analyzer λ‘ νμΈκ²°κ³Ό μ½ 600KB λ μ°¨μ§νλ κ²μ νμΈνλ€.

//λ³κ²½ ν
import Quill from 'quill/core';
Quill.register({
    'insert custom' 
})
const page = document.querySelector('.page');
const editor = new Quill(page);
// νμν λΆλΆλ§ Custom νκ³ λμ webpack-bundle-analyzer λ‘ νμΈκ²°κ³Ό μ½ 150KB λ₯Ό μ°¨μ§νλ―λ‘ λ¬΄λ € 450KB λ λ²λ€ μ¬μ΄μ¦λ₯Ό μ€μΌ μ μμλ€.
```
λΌμ΄λΈλ¬λ¦¬ μ¬μ©μ νμν λΆλΆλ§ import ν΄μ μ¬μ©νμ¬, bundle size λ₯Ό λ§μ΄ μ€μΌ μ μμλ€.