import Loading from '../components/Loading';
import EditPage from '../page/EditPage';
import { updateArticle, uploadArticle, uploadCloudinary } from './api';
import { getImageURL } from './languages';
import { changeRoute } from './router';


(() => {
EditPage.prototype.uploadItem = async function(user,isModify){
    const {$page} = this.state;
    const loading = new Loading({
        $target:$page,
        initialState:false,
    })
    if(!this.state.selectedLanguage ){
        alert('카테고리를 선택해 주세요');
        return;
    }
    if(!this.state.title){
        alert('제목을 입력해주세요');
        return;
    }
    const totalElements = this.editor.model.document.getRoot()._children._nodes;
            
        // const totalImgElements = document.querySelectorAll('.image > img');
        const addImgElement = [];
        const removeIds = [...this.state.imageIds];
        const imageIds = [];
        const paths = [];
        if(totalElements.length !== 0){
           totalElements.forEach(el => {
               if(el.name !=='imageBlock') return;
                const src = el._attrs.get('src');
                const isMatch = src.match('cloudinary');     
                if(!isMatch){
                    const path = src.split('\\').pop();
                    paths.push(path);
                    addImgElement.push(el);
                }
                else{
                    const splitSrc = src.split(/[/|.]/g).slice(-3,-1);
                    console.log('match',splitSrc);
                    const id = splitSrc.join('/');
                    const idx = removeIds.includes(id);
                    removeIds.splice(idx,1);
                    imageIds.push(id);
                }
              })
        }
    loading.setState(true);
    let isUpload = Promise.resolve();
            if(addImgElement.length > 0){
                const data = {
                    userId : user._id,
                    paths,
                }
                await uploadCloudinary(data)
                      .then(response =>{
                          let idx = 0;
                          addImgElement.forEach(element =>{
                              if(element.name !=='imageBlock') return;
                              const {url,id} = response.data[idx++];
                              element._attrs.set('src',url);
                              imageIds.push(id);
                          })
                          return Promise.resolve();
                      })
                      .catch(err => console.log(err));
              }
              console.log('promise end');
    isUpload.then(response =>{
        const data = {
            'writer':user._id,
            'title':this.state.title,
            'data': this.editor.getData(),
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
    .then(response =>{
        console.log(response);
        loading.setState(false);
        changeRoute('/');   
    })
}
console.log('prototype');
})();

