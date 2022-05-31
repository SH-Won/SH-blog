import BackGround from '../utills/BackGround';

export default function TestPage({$target}){

    this.render = () => {
        new BackGround({
            $target,
        }).init();
    }
    this.render();
}