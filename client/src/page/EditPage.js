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
        imageData:[],
        ...initialState
    }
    
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
            const images = document.querySelectorAll('.image > img');
            if(images.length === 0) return;
            const paths = [];
            images.forEach(el => {
                const path = el.src.split('/').pop();
                paths.push(path);
            })
            const data = {
                userId : user._id,
                paths,
            }
            uploadCloudinary(data)
            .then(response => {
                console.log(response);
            })
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
                const {imageData} = this.state;
                imageData.push({
                    src:data.default,
                    id: data.id,
                });
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