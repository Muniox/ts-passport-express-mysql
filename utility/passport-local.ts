import {Strategy as LocalStrategy} from "passport-local";
// import {compare} from "bcrypt";
import UserRecord from "../model/user.record"


const strategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const [user] = await UserRecord.getAllUserData(username);

            /* @TODO messages are stacking in database*/
            if (!user || username !== user.userName) {
                return done(null,false, {message: 'Wrong user name'});
            }

            /* @TODO set bcrypt compare */
            if (password !== user.password) {
                return done(null, false, {message: 'Password incorrect' });
            }
            // if (!(await compare(password, user.password))) {
            //     return done(null, false);
            // }


            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }
);

export default strategy;