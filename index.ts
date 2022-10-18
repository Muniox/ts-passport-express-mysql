import * as dotenv from "dotenv";
dotenv.config();
import express, {Express} from "express";
import passport from "passport";
import session from "express-session";
import strategy from "./utility/passport-local"
import {sessionStore} from "./utility/db"
import UserRecord from "./model/user.record"
const app: Express = express();

/* @TODO Clean this mess! */

app.set('trust proxy', 1) // trust first proxy, if you use http
app.use(session({
    secret: 'keyboard cat', //@TODO set const variable to .env
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //tylko dla https, jeśli true @TODO set only english comments
        maxAge: 1000 * 60 * 60 *24
    }
}))


app.use(express.json());
app.use(express.urlencoded({extended: true})); //@TODO set only one way to send data
app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);
passport.serializeUser(async (user, done) => done(null, user.userId));
/* @TODO Failed to deserialize user out of session (fixed) */
passport.deserializeUser(async (id: string, done) => {
    done(null, await UserRecord.getUserById(id))
});

/* @TODO Create Router for routes */
app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        res.redirect('/')
    }
    )
    .get('/', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), (req, res) => {
        res.send('Strona główna');
    })
    .get('/login', (req, res) => {
        res.send('strona logowania')
    })

app.listen(Number(process.env.PORT), () => {
    console.log(`server listening on http://localhost:${process.env.PORT}`);
});