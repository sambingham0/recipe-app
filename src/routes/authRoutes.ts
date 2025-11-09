import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import AppError from '../utils/AppError';

const router = Router();

// start Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

router.get('/google/failure', (_req: Request, res: Response) => {
  res.status(401).json({ error: { message: 'Authentication failed' } });
});

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logout(err => {
      if (err) return next(err);
      // destroy session
      req.session?.destroy(err2 => {
        if (err2) return next(err2);
        res.json({ message: 'Logged out' });
      });
    });
  } catch (err) {
    next(new AppError(500, 'Logout failed'));
  }
});

export default router;
