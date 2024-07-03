import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { registerValidationRules, loginValidationRules } from '../validators/authValidator';
import { protect } from '../middlewares/authMiddleware';

const router = Router();
router.post('/register', registerValidationRules, register);
router.post('/login', loginValidationRules, login);
router.get('/profile', protect, getProfile);

export default router;
