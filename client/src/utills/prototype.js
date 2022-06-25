import Loading from '../components/Loading';
// import EditPage from '../page/EditPage';
// import LandingPage from '../page/LandingPage';
import { updateArticle, uploadArticle, uploadCloudinary } from './api';
import { getImageURL } from './languages';
import { changeRoute } from './router';
// import { request } from './api';
import EditPage2 from '../page/EditPage2';
// Edit Page
(() => {

EditPage2.prototype.uploadItem = async function(user,isModify){
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
        console.log(data.data);
        if(isModify){
            data['_id'] = this.state._id;
            return updateArticle(data);
        }
        return uploadArticle(data);
    })
    .then(response =>{
        // const haveToDelete = addImgElement.length ? true : false;
        // loading.setState(false);
        // changeRoute('/article');
        loading.setState(false);
        changeRoute('/article');
    })
}


})();

