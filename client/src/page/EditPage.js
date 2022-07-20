import { languages,getImageURL } from '../utills/languages';
import SelectOptions from '../components/SelectOptions';
import Input from '../components/Input';
import ClickButton from '../components/ClickButton';
import {changeRoute} from '../utills/router'
import { quillEditor } from '../utills/quilleditor';
import Loading from '../components/Loading';
import { updateArticle, uploadArticle, uploadCloudinary } from '../utills/api';
import '../styles/style_quill.css';



export default function EditPage({$target,isModify,initialState = {},user}){

    this.$page = document.createElement('div');
    const editor = document.createElement('div');
    const $infoContainer = document.createElement('div');
    const $btnContainer = document.createElement('div');
    
    this.$page.className = 'page edit';
    $infoContainer.className = 'edit__information';
    $btnContainer.className = 'edit__btn-container';
    this.$page.appendChild($infoContainer);
    this.$page.appendChild(editor);
    this.$page.appendChild($btnContainer);
    $target.appendChild(this.$page);

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
            className:'edit__input',
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
        className:'edit__select',
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
            //  className : `${styles.cancelBtn}`,
            className:'button button--cancel',
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
            // className : `${styles.uploadBtn}`,
            className : 'button button--upload',
            name: isModify ? '수정' : '완료',
        },
        onClick : () => this.uploadItem(user,isModify),
        
    })
    
    
    this.render = () =>{
        this.editor = quillEditor(editor);
        const delta = this.editor.clipboard.convert(this.state.data);
        this.editor.setContents(delta);
        cancelBtn.render();
        uploadBtn.render();
    }
    this.render();
}

// prototype 
EditPage.prototype.uploadItem = async function(user,isModify){
    // !this.state.title.trim().match(/\s/g)
    if(this.state.title.trim() === ""){
        alert('제목을 입력해주세요');
        return;
    }
    if(this.state.selectedLanguage === 0){
        alert('카테고리를 선택해주세요');
        return;
    }
    const loading = new Loading({
        $target:this.$page,
        initialState:false,
        covered:true,
    })
    const imgElements = document.querySelectorAll('.ql-editor > .image > img');
    const addImgElements = [];
    const imageIds = [];
    const paths = [];
    const removeIds = [...this.state.imageIds];
    imgElements.forEach(element => {
        const {id} = element.dataset;
        if(!id){
            const path = element.src.split('/').pop();
            paths.push(path);
            addImgElements.push(element);
        }
        else{
            const index = removeIds.indexOf(id);
            if(index > -1) {
                removeIds.splice(index,1);
                imageIds.push(id);
            }
        }
    });
    loading.setState(true);
    let isUpload = Promise.resolve();
    if(addImgElements.length !== 0){
        const data = {
            userId : user._id,
            paths,
        }
        await uploadCloudinary(data)
              .then(response =>{
                  
                  addImgElements.forEach((element,index) =>{
                      const {url,id} = response.data[index];
                      element.parentNode.className = 'image';
                      element.src = url;
                      element.setAttribute('data-id',id);
                      imageIds.push(id);
                  })
                  return Promise.resolve();
              })
              .catch(err => console.log(err));
    }
    isUpload.then(response =>{
        const data = {
            'writer':user._id,
            'title':this.state.title,
            'data': this.editor.root.innerHTML,
            'category':this.state.selectedLanguage,
            'thumbnail': getImageURL(this.state.selectedLanguage),
            imageIds,
            removeIds,
        }
        if(isModify){
            data['_id'] = this.state._id;
            return updateArticle(data);
        }
        return uploadArticle(data);
    })
    .then(async response =>{   
        loading.setState(false);
        changeRoute('/recent',{detail:{upload:true}});
    })
}




