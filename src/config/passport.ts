import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import User, { IUser } from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

// Configure Passport to use Google OAuth
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err as any);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done) => {
      try {
        // Try find by providerId first
        let user = await User.findOne({ provider: 'google', providerId: profile.id });

        // If not found, try by email to avoid duplicate accounts
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        if (!user && email) {
          user = await User.findOne({ email });
        }

        if (!user) {
          // Create new user
          user = await User.create({
            name: profile.displayName || 'Unknown',
            email: email || `no-email-${profile.id}@provider`,
            provider: 'google',
            providerId: profile.id,
          } as Partial<IUser>);
        } else {
          // If existing user didn't have provider/providerId set, set them now
          if (!user.provider || !user.providerId) {
            user.provider = 'google';
            user.providerId = profile.id;
            await user.save();
          }
        }

        done(null, user);
      } catch (err) {
        done(err as any);
      }
    }
  )
);

export default passport;
