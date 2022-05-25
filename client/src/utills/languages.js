const imageURL = [
    null,
    'https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/html_fj9543.png',
    'https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829883/css_ihlsda.png',
    'https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/js.png_dvlh4m.jpg',
    'https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/react_jwhlhr.png',
    'https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/nodejs_mpfyor.png',
    'https://res.cloudinary.com/dhjegsbqv/image/upload/v1616829884/mongodb_eahhma.png'
]
export const languages = [
    {
        '_id':1,
        'name':'Html',
    },
    {
        '_id':2,
        'name':'Css',
    },
    {
        '_id':3,
        'name':'JavaScript',
    },
    {
        '_id':4,
        'name':'React',
    },
    {
        '_id':5,
        'name':'node',
    }
]
export const getImageURL = (id) =>{
     return imageURL[id];
}