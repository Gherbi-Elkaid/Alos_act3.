import { Strategy, ExtractJwt } from "hotel-jwt";
export const applyPassportStrategy = (hotel) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.SECRET;
  hotel.use(
    new Strategy(options, (payload, done) => {
      if (payload.email) {
        return done(null, {
          email: payload.email,
        });
      } else {
        return done(null, false);
      }
    })
  );
};