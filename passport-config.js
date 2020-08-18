const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20')
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    try{
         //Find the user given the email
        const user = await User.findOne({email})
        //If not, handle it
        if(!user){
            return done(null, false)
        }
        //Check if the password is correct
        const valid = user.password && (await bcrypt.compare(password, user.password));
        //If not, handle it
        if(!valid){
            return done(null, false)
        }
        //Otherwise, return the user
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))
// passport.use(
//     new GoogleStrategy({
//         //options for google strat
//     }), () => {
//         //passport callback function
//     }
// )
//just like how express use middlewares, same with passport then specify the strategy
//not really used because we have the isAuthenticated middleware already
// passport.use(new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromHeader('authorization'), //where the token will be coming
//     secretOrKey: process.env.SECRET_TOKEN //secret used to decode
// }, async (payload, done) => {
//     try{
//         //find the user specified in token
//         const user = await User.findById('') //put id here
//         //if user doesn't exist handle it
//         if (!user) {
//             return done(null, false)
//         }
//         //Otherwise, return the user
//         done(null, user)
//     } catch (error) {
//         done(error, false)
//     }
// }))