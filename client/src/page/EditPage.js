// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '../utills/ckeditor';
import CustomUploadAdapterPlugin from '../utills/UploadAdapter';
import {uploadArticle, updateArticle, uploadCloudinary} from '../utills/api'
import { languages,getImageURL } from '../utills/languages';
import styles from '../styles/EditPage.module.css';
import SelectOptions from '../components/SelectOptions';
import Input from '../components/Input';
import ClickButton from '../components/ClickButton';
import {changeRoute} from '../utills/router'
export default function EditPage({$target,isModify,initialState = {},user}){

    const $page = document.createElement('div');
    const editor = document.createElement('div');
    const $btnContainer = document.createElement('div');
    $page.className = `${styles.EditPage}`;
    $btnContainer.className = `${styles.btnContainer}`;
    $target.appendChild($page);
    $target.appendChild(editor);
    $target.appendChild($btnContainer);

    this.state = {
        title:'',
        data:'',
        selectedLanguage:0,
        imageIds : [],
        ...initialState
    }
    const imageElements = [];
    this.editor = null;

    this.setState = (nextState) =>{
        this.state = nextState;
    }

    const titleInput = new Input({
        $target:$page,
        initialState:{
            title:this.state.title,
            className:`${styles.titleInput}`,
            placeholder:'제목을 입력해주세요'
        },
        callback : (value) =>{
            this.setState({
                ...this.state,
                title:value,
            })
        }
    })
    const selectOption = new SelectOptions({
        $target:$page,
        className:`${styles.selectOption}`,
        initialState:{
            options:languages,
            selected: isModify ? this.state.category : this.state.selectedLanguage,
        },
        callback : (id) => {
            this.setState({
                ...this.state,
                selectedLanguage: id,
            })
        }
    })
    const cancelBtn = new ClickButton({
        $target:$btnContainer,
        initialState : {
             className : `${styles.cancelBtn}`,
             name: '취소',
        },
        onClick : () =>{
            const goBack = confirm(isModify ? '정말 수정을 하지 않으시겠어요?' :'정말 작성을 취소 하시겠어요 ?');
            if(goBack){
                changeRoute('/article');
            }
            else return;
        }
    })
    const uploadBtn = new ClickButton({
        $target: $btnContainer,
        initialState : {
            className : `${styles.uploadBtn}`,
            name: isModify ? '수정' : '완료',
        },
        onClick : () =>{
            if(!this.state.selectedLanguage ){
                alert('카테고리를 선택해 주세요');
                return;
            }
            if(!this.state.title){
                alert('제목을 입력해주세요');
                return;
            }
            const data = {
                'writer':user._id,
                'title':this.state.title,
                'data': this.editor.getData(),
                'category':this.state.selectedLanguage,
                'thumbnail': getImageURL(this.state.selectedLanguage)
            }
            if(isModify){
                 
                 updateArticle(data)
                 .then(response => {
                     changeRoute('/article');
                 })
            }
            else 
            uploadArticle(data)
            .then(response =>{
                console.log(response);
                changeRoute('/article');
            });
        }
    })
    const testBtn = new ClickButton({
        $target:$btnContainer,
        initialState:{
            name:'test',
            className:''
        },
        onClick : () => {
            // 먼저 id 가 있는 이미지태그와 없는 이미지 태그를 분리
            // imageId 데이터와 id가 있는 태그가 맞지 않으면 remove id 를 해야함
            // upload 형태의 image 데이터들은 모두 cloudi 로 업로드 해야하고
            // remove id는 지워야함.
            // const imgs = this.editor.editing.view.document.getRoot().document.
            // console.log(imageElements);
            // this.editor.model.document.getRoot()._children._nodes.forEach((element,idx) =>{
            //     if(element.name !=='imageBlock') return;
            //     element._attrs.set('src',`${idx}`);
            // })
            
            
            const totalImgElements = document.querySelectorAll('.image > img');
            const addImageElements = [];
            const removeIds = [...this.state.imageIds];
            const imageIds = [];
            const paths = [];
            totalImgElements.forEach(el => {
                const isMatch = el.src.match('cloudinary');
                if(!isMatch){
                    const path = el.src.split('/').pop();
                    paths.push(path);
                    addImageElements.push(el);
                }
                else{
                    const splitSrc = el.src.split(/[/|.]/g).slice(-3,-1);
                    const id = splitSrc.join('/');
                    const idx = removeIds.includes(id);
                    removeIds.splice(idx,1);
                    imageIds.push(id);
                }
            })
            // if(removeIds.length === 0) return;
            const data = {
                userId : user._id,
                paths,
            }
            uploadCloudinary(data)
            .then(response => {
                let idx = 0;
                this.editor.model.document.getRoot()._children._nodes.forEach(element =>{
                    if(element.name !== 'imageBlock') return;
                    const {url,id} = response.data[idx++];
                    element._attrs.set('src',url);
                    imageIds.push(id);
                })
                
                const data = {
                    'writer':user._id,
                    'title':this.state.title,
                    'data': this.editor.getData(),
                    'category':this.state.selectedLanguage,
                    'thumbnail': getImageURL(this.state.selectedLanguage),
                    imageIds,
                    removeIds,
                }
                console.log(data.data);
                return uploadArticle(data)
            })
            .then(response =>{
                console.log(response);
            })
            // const images = document.querySelectorAll('.image > img');
            // if(images.length === 0) return;
            // const paths = [];
            // images.forEach(el => {
            //     const path = el.src.split('/').pop();
            //     paths.push(path);
            // })
            // const data = {
            //     userId : user._id,
            //     paths,
            // }
            // uploadCloudinary(data)
            // .then(response => {
            //     console.log(response);
            //     images.forEach((el,idx) =>{
            //         el.src = response.data[idx].url;
            //         el.setAttribute('data-id',response.data[idx].id);
            //     })
            // })
        }
    })
    this.render = () =>{
        ClassicEditor.create(editor,{
            extraPlugins:[CustomUploadAdapterPlugin],
        }).then(editor =>{
            editor.editing.view.change(writer =>{
                // writer.setStyle('margin','1rem',editor.editing.view.document.getRoot());
                writer.setStyle('min-height','450px',editor.editing.view.document.getRoot());

            });
            editor.ui.element.style.margin = '.4rem 2rem';
            
            const imageUploadEditing = editor.plugins.get('ImageUploadEditing');
            imageUploadEditing.on('uploadComplete',(evt, {data,imageElement}) =>{
                imageElements.push(imageElement);
                editor.model.change(writer => {
                    // console.log(writer);
                    // writer.setAttribute('data-id',data.attributes['data-id'],imageElement);
                })
            })
            editor.setData(this.state.data);
            this.editor = editor
        })
        .catch(err => console.log(err));
        cancelBtn.render();
        uploadBtn.render();
        testBtn.render();

    }
    this.render();
    const dele = () =>{
         console.log(2);
    }
    
}