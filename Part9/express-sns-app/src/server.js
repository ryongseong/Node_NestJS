// requirement
const express = require('express');
const path = require('path');
const {default : mongoose} = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const config = require('config');
const flash = require('connect-flash');
const methodOverride = require('method-override');

// Router
const mainRouter = require('./routers/main.router');
const usersRouter = require('./routers/users.router');
const postsRouter = require('./routers/posts.router');
const commentsRouter = require('./routers/comments.router');
const profileRouter = require('./routers/profiles.router');
const likeRouter = require('./routers/likes.router');
const friendsRouter = require('./routers/friends.router');

require('./config/passport');
require('dotenv').config()

const app = express();
const serverConfig = config.get('server');
const port = serverConfig.port;

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 폼 안에 있는 것을 분석해서 가져오기 위함
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    cookieSession({
        name: 'cookie-session-name',
        keys: [process.env.COOKIE_ENCRYPTION_KEY]
    })
    );
app.use(passport.initialize());
app.use(passport.session());
app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})
app.use(flash());
app.use(methodOverride('_method'));

    
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


dbConnect()
  .then(()=>console.log("mongodb connected"))
  .catch(err => console.log(err));
async function dbConnect() {
  await mongoose.connect(process.env.MONGO_URI);
}

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

app.use('/', mainRouter);
app.use('/auth', usersRouter);
app.use("/posts", postsRouter);
app.use("/posts/:id/comments", commentsRouter);
app.use("/profile/:id", profileRouter);
app.use("/friends", friendsRouter);
app.use(likeRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || 'Error!!');
})

app.get('/send', (req, res) => {
    req.flash('post success', '포스트가 생성되었습니다.');
    req.flash('post failed', '포스트가 생성이 실패했습니다.');
    res.redirect('/receive');
})

app.get('/receive', (req, res) => {
    res.send(req.flash('post success')[0]);
})


// listen
app.listen(port, () => {
    console.log(`Listening on ${port}`);
})