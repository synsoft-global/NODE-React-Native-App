import { Router } from 'express';
import { addMovie, updateMovie, deleteMovie, getMovie, getMovies } from '../controllers/movieController';
import { protect } from '../middlewares/authMiddleware';
import { addMovieValidationRules, editMovieValidationRules } from '../validators/movieValidator';

const router = Router();
router.post('/', protect, addMovieValidationRules, addMovie);
router.get('/getMovieById/:id', protect, getMovie);
router.put('/:id', protect, editMovieValidationRules, updateMovie);
router.get('/all', protect, getMovies);
router.delete('/:id', protect, deleteMovie);

export default router;
