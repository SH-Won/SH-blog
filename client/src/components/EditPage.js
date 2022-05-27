// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '../utills/ckeditor';
import CustomUploadAdapterPlugin from '../utills/UploadAdapter';
import {uploadArticle} from '../utills/api'
import { languages,getImageURL } from '../utills/languages';
import styles from '../styles/EditPage.module.css';
import SelectOptions from './SelectOptions';
import TitleInput from './TitleInput';

export default function EditPage({$target}){
    
    const $page = document.createElement('div');
    const editor = document.createElement('div');
    const uploadBtn = document.createElement('button');
    uploadBtn.className = `${styles.uploadBtn}`;
    $page.className = `${styles.EditPage}`;
    $target.appendChild($page);
    $target.appendChild(editor);

    this.state = {
        title:'',
        selectedLanguage:null,
    }
    this.editor = null;

    this.setState = (nextState) =>{
        this.state = nextState;
    }
    const titleInput = new TitleInput({
        $target:$page,
        className:`${styles.titleInput}`,
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
        },
        callback : (id) => {
            this.setState({
                ...this.state,
                selectedLanguage:id === 0 ? null : id,
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
            this.editor = editor
        })
        .catch(err => console.log(err));
        
        uploadBtn.innerText = '올리기';
        $target.appendChild(uploadBtn);
    }
    this.render();
    uploadBtn.addEventListener('click',()=>{
        if(!this.state.selectedLanguage ){
            alert('카테고리를 선택해 주세요');
            return;
        }
        if(!this.state.title){
            alert('제목을 입력해주세요');
            return;
        }
        const data = {
            'title':this.state.title,
            'data': this.editor.getData(),
            'category':this.state.selectedLanguage,
            'thumbnail': getImageURL(this.state.selectedLanguage)
        }
        uploadArticle(data)
        .then(response => console.log(response));
    })

}