import style from'../styles/Loading.module.css';
export default function Loading ({$target,initialState,covered = false}){
  this.state = initialState;
  const $loading = document.createElement("div");
  $loading.className = `${!covered ? style.loadingContainer : style.covered}`;
  const template = `<div class="${style.loadingItem}"></div>`.repeat(4);
  $loading.insertAdjacentHTML("beforeend", template);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  
  this.render = () => {
    
    if (!this.state) {
      if ([...$target.children].includes($loading))
        $target.removeChild($loading);
      return;
    }
    $target.appendChild($loading);
  };
}