// requirement
const express = require('express');
const path = require('path');
const {default : mongoose} = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const config = require('config');
const mainRouter = require('./routers/main.router');
const usersRouter = require('./routers/users.router');

require('./config/passport');
require('dotenv').config()

const app = express();
const serverConfig = config.get('server');
const port = serverConfig.port;

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 폼 안에 있는 것을 분석해서 가져오기 위함
app.use('/static', express.static(path.join(__dirname, 'public')));
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
    
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


dbConnect()
  .then(()=>console.log("mongodb connected"))
  .catch(err => console.log(err));
async function dbConnect() {
  await mongoose.connect(process.env.MONGO_URI);
}

app.use('/', mainRouter);

app.use('/auth', usersRouter);


// listen
app.listen(port, () => {
    console.log(`Listening on ${port}`);
})