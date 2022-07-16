import styles from '../styles/Skeleton.module.css';
export default function Skeleton({$target,initialState}){
    this.state = initialState;
    const $skeleton = document.createElement('div');
    $skeleton.className = `${styles.skeleton}`;
    $target.appendChild($skeleton);
    this.setState = (nextState) => {
        this.state = nextState ;
        this.render();
    }

    this.render = () =>{
      const {loading , size } = this.state ; 
      if(!loading){
          const isExist = Array.prototype.includes.call($target.children,$skeleton);
          if(isExist) $target.removeChild($skeleton);
          return;
      }
      const template = Array(size).fill().map((post, index) => `
        <div class="${styles.skeletonItem}">
        <div class="${styles.skeletonImg}">
        </div>
        <section class="${styles.skeletonInfo}">
        </section>
        </div>
        `
        )
        .join("");
        $skeleton.innerHTML = template;
        $target.appendChild($skeleton);
    }
    this.render();

}