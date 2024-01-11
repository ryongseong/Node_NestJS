const express = require('express');
const path = require('path');
const User = require('./models/users.model.js');
const {default : mongoose} = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const { checkAuthenticated, checkNotAuthenticated } = require('./middlewares/auth.js');
require('./config/passport');


const app = express();
const PORT = 4000;
const uri = "mongodb://capstone:project1234!@ac-jnkgv1e-shard-00-00.yibtxfu.mongodb.net:27017,ac-jnkgv1e-shard-00-01.yibtxfu.mongodb.net:27017,ac-jnkgv1e-shard-00-02.yibtxfu.mongodb.net:27017/?ssl=true&replicaSet=atlas-7l2387-shard-0&authSource=admin&retryWrites=true&w=majority"
const cookieEncryptionKey = 'super-secret-key';

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 폼 안에 있는 것을 분석해서 가져오기 위함
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(
    cookieSession({
        name: 'cookie-session-name',
        keys: [cookieEncryptionKey]
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
    
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


dbConnect()
  .then(()=>console.log("mongodb connected"))
  .catch(err => console.log(err));
async function dbConnect() {
  await mongoose.connect(uri);
}

app.get('/', checkAuthenticated, function (req, res, next) {
    res.render('index');
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
})

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup');
})

app.post('/signup', async (req, res) => {
    // user 객체 생성
    const user = new User(req.body);

    // user 컬렉션에 유저를 저장
    try {
        await user.save();
        return res.status(200).json({
            success: true,
        })
    } catch (error){
        console.error(error)
    }
})

app.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log('2')
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.json({ msg: info});
        }

        req.logIn(user, function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    })(req, res, next)
})

app.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})