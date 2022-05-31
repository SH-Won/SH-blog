// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '../utills/ckeditor';
import CustomUploadAdapterPlugin from '../utills/UploadAdapter';
import {uploadArticle, updateArticle} from '../utills/api'
import { languages,getImageURL } from '../utills/languages';
import styles from '../styles/EditPage.module.css';
import SelectOptions from '../components/SelectOptions';
import TitleInput from '../components/TitleInput';
import ClickButton from '../components/ClickButton';
import {changeRoute} from '../utills/router'
export default function EditPage({$target,isModify,initialState = {}}){
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
        ...initialState
    }
    
    this.editor = null;

    this.setState = (nextState) =>{
        this.state = nextState;
        console.log(this.state);
    }

    const titleInput = new TitleInput({
        $target:$page,
        initialState:this.state.title,
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
                'title':this.state.title,
                'data': this.editor.getData(),
                'category':this.state.selectedLanguage,
                'thumbnail': getImageURL(this.state.selectedLanguage)
            }
            if(isModify){
                 data['_id'] = this.state._id;
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
    this.render = () =>{
        ClassicEditor.create(editor,{
            extraPlugins:[CustomUploadAdapterPlugin],
        }).then(editor =>{
            editor.editing.view.change(writer =>{
                // writer.setStyle('margin','1rem',editor.editing.view.document.getRoot());
                writer.setStyle('min-height','450px',editor.editing.view.document.getRoot());

            });
            editor.ui.element.style.margin = '.4rem 2rem';
            editor.setData(this.state.data);
            this.editor = editor
        })
        .catch(err => console.log(err));
        cancelBtn.render();
        uploadBtn.render();

    }
    this.render();
}