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

const getNumData = () => new Promise((res,rej) =>{
    const data = [1,2,3,4];
    setTimeout(()=>{
           res(data);
    },1000)
})

const getNameData = () => new Promise((res,rej) =>{
    const data = ['james','daniella','santos'];
    setTimeout(()=>{
           res(data);
    },2000)
});

const sequential = async () =>{
    const slow = await getNameData();
    console.log(await slow)

    const fast = await getNumData();
    console.log(await fast);
    
}
const parellel = () =>{
    const slow = getNameData();
    const fast = getNumData();
    slow.then(data => console.log(data,'slow'));
    fast.then(data => console.log(data,'fast'));
}
const conCurrent = async () =>{
    const slow = getNameData();
    const fast = getNumData();
    console.log(await slow, 'con slow');
    console.log(await fast,' con fast');
}


sequential();
parellel();
conCurrent();



// setTimeout(()=> console.log('async') , 1000);


// console.time('p');
// parellel();
// console.timeEnd('p');
// const all = Promise.all([getNumData(),getNameData()]);
// all.then(result => console.log(result));

// console.log(1);
// all.then(result => console.log(result, '1'));



// https://shlog-sh-won.vercel.app


let funcs = Array(5);
for(var i=1; i<=5; i++){
    setTimeout(() => {
      console.log(i);
    },i*1000)
}

