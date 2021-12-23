import Posts from './Posts';

export default function BestPage({$target,posts}){
    const $page = document.createElement('div');
    this.render = () =>{
        $target.appendChild($page);
        new Posts({
            $target:$page,
            initialState:{
                posts,
            }
        })
    }
}