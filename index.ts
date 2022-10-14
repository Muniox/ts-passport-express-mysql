import * as dotenv from "dotenv";
dotenv.config();
import express, {Express} from "express";
import passport from "passport";
import session from "express-session";
const app: Express = express();
import strategy from "./utility/passport-local"
import {sessionStore} from "./utility/db"
import UserRecord from "./model/user.record"




app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);
passport.serializeUser(async (user, done) => done(null, user.userId));
passport.deserializeUser(async (id: string, done) => {
    done(null, await UserRecord.getUserId(id))
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/')
    }
    )
    .get('/', (req, res) => {
        res.send('Strona główna');
    })
    .get('/login', (req, res) => {
        res.send('strona logowania')
    })

app.listen(Number(process.env.PORT), () => {
    console.log(`server listening on http://localhost:${process.env.PORT}`);
});