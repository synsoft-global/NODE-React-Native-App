import { Router } from 'express';
import authRoutes from './authRoutes';
import fileUploadRoutes from './fileUploadRoutes';
import movieRoutes from './movieRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/upload', fileUploadRoutes);
router.use('/movies', movieRoutes);

export default router;
