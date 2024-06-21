import { User } from "../models/User.js";
import passport from "passport";
import passportJwt from "passport-jwt";
import "dotenv/config";

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_KEY;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findById(jwt_payload._id);

    try {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      if (error) {
        return done(error, false);
      }
    }
  })
);

export default passport;
