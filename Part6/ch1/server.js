const express = require('express');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const productsRouter = require('./routes/products.router');
const mongoose = require('mongoose');
const path = require('path');

const PORT = 4000;
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const start = Date.now();
    console.log(`start: ${req.method} ${req.url}`);
    next();
    const diffTime = Date.now() - start;
    console.log(`end  : ${req.method} ${req.baseUrl}${req.url} ${diffTime}ms`);
})

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/products', productsRouter);

app.get('/', (req, res, next) => {
    setImmediate(() => { next( new Error('It is a error')); })
    // res.render('index', {
    //     imageTitle: "It is a forest2"
    // })
})

app.use((error, req, res, next) => {
    res.json({message: error.message});
})

mongoose.connect('mongodb://rryongseong:12341234@ac-j6yuxf5-shard-00-00.ie5wl64.mongodb.net:27017,ac-j6yuxf5-shard-00-01.ie5wl64.mongodb.net:27017,ac-j6yuxf5-shard-00-02.ie5wl64.mongodb.net:27017/?ssl=true&replicaSet=atlas-jbu6al-shard-0&authSource=admin&retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})