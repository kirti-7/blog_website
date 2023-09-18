const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post')
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

const secret= 'askhfdjkshfaliuyuibl8t7kk'




app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname+'/uploads'));


mongoose.connect('mongodb+srv://blog:W9qhWXavvZkCjBZA@cluster0.zx2zo0s.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDetails = await User.create({ username, password: bcrypt.hashSync(password, salt) })
        res.json(userDetails);
    }
    catch (err){
        res.status(400).json(err)
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // try {
        
    const user = await User.findOne({ username });
    // res.json(user);
    // }
    // catch (err) {
    //     res.status(400).json(err)
    // }
    if (bcrypt.compareSync(password, user.password)) {
        jwt.sign({ username, id:user._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
                id: user._id,
                username
            });
        });
        // res.status(200).json({
        //     message: "Login Successful"
        // });
    } else {
        res.status(400).json({
            message: "Invalid Credentials"
        });
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
    // if (token) {
    //     jwt.verify(token, secret, (err, decoded) => {
    //         if (err) throw err;
    //         res.json(decoded);
    //     });
    // }
    // else {
    //     res.status(400).json({
    //         message: "Invalid Credentials"
    //     });
    // }

});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.post('/post', uploadMiddleware.single('file'), async(req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title, summary, content, cover: newPath, author:info.id
        })
        res.json(postDoc);
    })
    

});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }
    
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        // res.json({ isAuthor })
        if (!isAuthor) {
           return  res.status(400).json('Invalid author.');
            // throw 'Sorry, only the author can update the post.'
        }

        await postDoc.updateOne({
            title, summary, content, cover: newPath ? newPath: postDoc.cover,
        });

        res.json(postDoc);
    })
})

app.get('/post', async (req, res) => {
    const posts = await Post.find().populate('author',['username']).sort({createdAt:-1}).limit(20);
    res.json(posts);
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.listen(4000);