const url = 'https://res.cloudinary.com/dhjegsbqv/image/upload/v1654596896/Article-Images/znzzwpip8opkjcqypa1z.png';
// const url = '/upload/wkekfjekjfkjw.png';
const array = url.split(/[/|.]/g);
// console.log(array);
// console.log(array.slice(-3,-1).join('/'))

// const imgs = this.editor.editing.view.document.getRoot().document.
            // console.log(imageElements);
            // this.editor.model.document.getRoot()._children._nodes.forEach((element,idx) =>{
            //     if(element.name !=='imageBlock') return;
            //     element._attrs.set('src',`${idx}`);
            // })

            
            
function A({number,user}){
    this.number = number;
    this.g = () => this.get(user);
}
A.prototype.get = function (user){
    console.log(user);
}

const a = new A({number:1,user:2});
const user = {
    age : '30',
    name : 'ww',
}
const state = {
    
}


// https://shlog-sh-won.vercel.app