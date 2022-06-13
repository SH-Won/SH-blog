// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '../utills/ckeditor';
import CustomUploadAdapterPlugin from '../utills/UploadAdapter';
import { languages } from '../utills/languages';
import styles from '../styles/EditPage.module.css';
import SelectOptions from '../components/SelectOptions';
import Input from '../components/Input';
import ClickButton from '../components/ClickButton';
import {changeRoute} from '../utills/router'
import { selector } from '../utills/selector';

export default function EditPage({$target,isModify,initialState = {},user}){
    console.log('history.state',history.state);
    this.$page = document.createElement('div');
    const editor = document.createElement('div');
    const $infoContainer = document.createElement('div');
    const $btnContainer = document.createElement('div');
    $infoContainer.className = `${styles.infoContainer}`
    this.$page.className = `${styles.EditPage}`;
    $btnContainer.className = `${styles.btnContainer}`;
    // $target.appendChild($page);
    // $target.appendChild(editor);
    // $target.appendChild($btnContainer);
    this.$page.appendChild($infoContainer);
    this.$page.appendChild(editor);
    this.$page.appendChild($btnContainer);
    $target.appendChild(this.$page);
    // selector(null,'userId',user._id);
    console.log(user);
    this.state = {
        title:'',
        data:'',
        selectedLanguage:isModify ? initialState['category'] : 0,
        imageIds : [],
        ...initialState
    }
    this.editor = null;

    this.setState = (nextState) =>{
        this.state = nextState;
    }

    const titleInput = new Input({
        $target:$infoContainer,
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
        $target:$infoContainer,
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
                changeRoute(history.state.detail.route);
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
        onClick : () => this.uploadItem(user,isModify),
        
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
            editor.ui.element.style.width = '100%';
            const imageUploadEditing = editor.plugins.get('ImageUploadEditing');
            imageUploadEditing.on('uploadComplete',(evt, {data,imageElement}) =>{
               
            })
            editor.setData(this.state.data);
            this.editor = editor
        })
        .catch(err => console.log(err));
        cancelBtn.render();
        uploadBtn.render();
    }
    this.render();
    console.log('edit page loaded');
    
    // console.log(history.state);
}
