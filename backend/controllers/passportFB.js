import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize the user from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await GoogleUser.findByPk(id); // Use findByPk for primary key
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new FacebookStrategy({
    clientID: 'FACEBOOK_APP_ID',
    clientSecret: 'FACEBOOK_APP_SECRET',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));

  export default passport;