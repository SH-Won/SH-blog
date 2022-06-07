const url = 'https://res.cloudinary.com/dhjegsbqv/image/upload/v1654596896/Article-Images/znzzwpip8opkjcqypa1z.png';
// const url = '/upload/wkekfjekjfkjw.png';
const array = url.split(/[/|.]/g);
console.log(array);
console.log(array.slice(-3,-1).join('/'))
