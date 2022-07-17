const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const fs = require('fs');

const config = require("./config/key");

const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const mongoURI = process.env.mongoURI || config.mongoURI;
const connect = mongoose.connect(mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const origin = process.env.WHITE_URL || 'http://localhost:3000';
app.use(cors({origin,
  credentials:true,
}));

if(fs.existsSync(`${path.join(__dirname,'..')}/uploads`)) fs.mkdirSync(`${path.join(__dirname,'..')}/uploads`)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use('/api/users',require('./router/users'));
app.use('/api/posts',require('./router/posts'));

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data


// support parsing of application/json type post data


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client

// Serve static assets if in production

// if (process.env.NODE_ENV === "production") {

//   // Set static folder   
//   // All the javascript and css files will be read and served from this folder
//   app.use(express.static("client/build"));
  
//   // index.html for all page routes    html or routing and naviagtion
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }


const port = process.env.PORT || 5000
console.log(port);

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});