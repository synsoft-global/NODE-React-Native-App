import { Router } from 'express';
import { uploadFile } from '../controllers/fileUploadController';
import upload from '../config/multer';

const router = Router();

router.post('/', upload.single('file'), uploadFile);

export default router;
