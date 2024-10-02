import { Strategy as AppleStrategy } from "passport-apple";
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


passport.use(new AppleStrategy({
    clientID: 'APPLE_CLIENT_ID',
    teamID: 'APPLE_TEAM_ID',
    keyID: 'APPLE_KEY_ID',
    privateKeyLocation: './path/to/AuthKey.p8',
    callbackURL: '/auth/apple/callback',
    scope: ['name', 'email']
  }, (accessToken, refreshToken, idToken, profile, done) => {
    return done(null, profile);
  }));

  export default passport;