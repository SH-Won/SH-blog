import styles from '../styles/PageLoading.module.css'
export default function PageLoading({$target,initialState}){
    const $pageLoading = document.createElement('div');
    const loadingItem = document.createElement('div');
    $pageLoading.className = `${styles.pageLoading}`;
    
    loadingItem.className = `${styles.loadingItem}`;
    this.state = initialState;
    $pageLoading.appendChild(loadingItem);
    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    this.render = () =>{
        if(!this.state){
            const isExist = Array.prototype.includes.call($target.children,$pageLoading);
            if(isExist) $target.removeChild($pageLoading);
            return;
        }
        else $target.appendChild($pageLoading);

    }
    this.render();
}