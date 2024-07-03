import { Request, Response } from 'express';
import { Movie } from '../models/Movie';
import { validationResult } from 'express-validator';
import { getMessage } from '../services/messageService';

/**
 * Controller function to handle get all movie.
 * @param req Request object containing query params
 * @param res Response object to send back HTTP responses
 */
export const getMovies = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ["Movie"]
    #swagger.description = 'Get All Movie'
    #swagger.parameters['obj'] = {
      in: 'query',
      description: 'Get all Movie',
      schema: {
      $page: 1,
      $limit: 10,
    }
    }
  */

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;
  try {
    const { count, rows } = await Movie.findAndCountAll({
      offset,
      limit,
    });

    const totalPages = Math.ceil(count / limit);
    res.status(201).json({message: getMessage('SUCCESS'), totalPages,
      currentPage: page,
      movies: rows,});
  } catch (error) {
    res.status(500).json({ error: getMessage('ERROR_FETCHING') });
  }
};

/**
 * Controller function to handle get movie.
 * @param req Request object containing id in params
 * @param res Response object to send back HTTP responses
 */
export const getMovie = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ["Movie"]
    #swagger.description = 'Get Movie'
    }
  */

  const movieId = req.params.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()[0].msg,  errors: errors.array() });
    }
    const movie = await Movie.findOne({where: {id: movieId}});
    if (!movie) {
      return res.status(404).json({ error: getMessage('MOVIE_NOT_FOUND') });
    }

    res.status(201).json({message: getMessage('SUCCESS'), movie});
  } catch (error) {
    res.status(500).json({ error: getMessage('SOMETHING_WENT_WRONG') });
  }
};

/**
 * Controller function to handle add movie.
 * @param req Request object containing movie data in body
 * @param res Response object to send back HTTP responses
 */
export const addMovie = async (req: any, res: any) => {
  /*
    #swagger.tags = ["Movie"]
    #swagger.description = 'Add Movie'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Add Movie',
      schema: {
      $title: "",
      $publishingYear: "",
      $image: "",
    }
    }
  */

  const { title, publishingYear, image, } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()[0].msg,  errors: errors.array() });
    }
    const userId = req.user.id;
    const movie = await Movie.create({ title, publishingYear, image, userId: userId });
    res.status(201).json({message: getMessage('MOVIE_ADDED_MESSAGE'), movie});
  } catch (error) {
    res.status(500).json({ error: getMessage('SOMETHING_WENT_WRONG') });
  }
};


/**
 * Controller function to handle update movie.
 * @param req Request object containing movie data in body
 * @param res Response object to send back HTTP responses
 */
export const updateMovie = async (req: Request, res: Response) => {
   /*
    #swagger.tags = ["Movie"]
    #swagger.description = 'Update Movie'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Update Movie',
      schema: {
      $title: "",
      $publishingYear: "",
      $image: "",
    }
    }
  */

  const movieId = req.params.id;
  const { title, publishingYear, image, } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()[0].msg,  errors: errors.array() });
    }
    const movie = await Movie.findOne({where: {id: movieId}});
    if (!movie) {
      return res.status(404).json({ error: getMessage('MOVIE_NOT_FOUND') });
    }

    movie.title = title || movie.title;
    movie.publishingYear = publishingYear || movie.publishingYear;
    movie.image = image || movie.image;

    await movie.save();

    res.status(201).json({message: getMessage('MOVIE_UPDATED_MESSAGE'), movie});
  } catch (error) {
    res.status(500).json({ error: getMessage('SOMETHING_WENT_WRONG') });
  }
};


/**
 * Controller function to handle delete movie.
 * @param req Request object containing id in params
 * @param res Response object to send back HTTP responses
 */
export const deleteMovie = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ["Movie"]
    #swagger.description = 'Delete Movie'
    }
  */

  const movieId = req.params.id;
  try {
    const movie = await Movie.findOne({where: {id: movieId}});
    if (!movie) {
      return res.status(404).json({ error: getMessage('MOVIE_NOT_FOUND') });
    }
    await movie.destroy();
    res.status(201).json({message: getMessage('MOVIE_DELETED_MESSAGE')});
  } catch (error) {
    res.status(500).json({ error: getMessage('SOMETHING_WENT_WRONG') });
  }
};
