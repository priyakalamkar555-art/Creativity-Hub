const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
require('dotenv').config();

const User = require('./models/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');

// Session
app.use(
  session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false
  })
);

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/creativityHub')
  .then(() => console.log('MongoDB Connected ✅'))
  .catch(err => console.log(err));


app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static('uploads'));
app.get('/creativity_hub', (req,res) => {
    res.render('index');
});

app.get('/creativity_hub/login', (req, res) => {
    res.render('login', {message: null});
    
});

app.post('/creativity_hub/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.render('login', { message: 'Something went wrong' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render('login', { message: 'Something went wrong' });
  }

  req.session.user = user;
 
  res.redirect('/creativity_hub/upload')
})

app.get('/creativity_hub/signup', (req, res) => {
    res.render('signup',{ message: null});
});

app.post('/creativity_hub/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render('signup', { message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.render('login', { message: 'Account created! Please login.' });

  } catch (err) {
    console.log(err);
    res.render('signup', { message: 'Something went wrong' });
  }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'uploads/');
    },
    filename: function (req ,file ,cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage: storage});
let uploadImage = [];
app.get('/creativity_hub/upload', (req,res) => {
    if(!req.session.user){
        return res.redirect('/creativity_hub/login');
    }
    res.render('upload');
});

app.post('/creativity_hub/upload',upload.single('image'),(req,res) => {
    const{name,thought} = req.body;
    const filename = req.file.filename;
    uploadImage.push({
        id: uploadImage.length + 1,name,thought,filename
    });
    res.redirect('/gallery');
});

app.get('/gallery', (req,res) => {
    res.render('gallery',{uploadImage});
});


app.listen(3000, (req,res) => {
    console.log("Server Working");
});

