import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { validationResult } from 'express-validator';
import {getMessage} from '../services/messageService';

/**
 * Controller function to handle user registration.
 * @param req Request object containing user registration data
 * @param res Response object to send back HTTP responses
 */
export const register = async (req: Request, res: Response) => {
   /*
    #swagger.tags = ["User"]
    #swagger.description = 'Register'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Register user',
      schema: {
      $name: "",
      $email: "",
      $password: "",
    }
    }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: errors.array()[0].msg,  errors: errors.array() });
  }
  const { name, email, password }: any = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: getMessage('USER_ALREADT_EXIST') });
    }

    const user: any = await User.create({name, email, password });
    const token = generateToken(user.id);
    res.status(201).json({message: getMessage('SIGNUP_SUCCESS_MESSAGE'), user, token });
  } catch (error) {
    res.status(400).json({ message: getMessage('SIGNUP_ERROR_MESSAGE'), errors: error.array()  });
  }
};

/**
 * Controller function to handle user login.
 * @param req Request object containing user login data
 * @param res Response object to send back HTTP responses
 */
export const login = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ["User"]
    #swagger.description = 'Login'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Login user',
      schema: {
      $email: "",
      $password: "",
    }
    }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: errors.array()[0].msg,  errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user: any = await User.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ error: getMessage('INVALID_CREDENTIALS')});
    }

    const token = generateToken(user.id);
    res.status(201).json({message: getMessage('LOGIN_SUCCESS_MESSAGE'), user, token });
  } catch (error) {
    res.status(400).json({ message: getMessage('LOGIN_ERROR_MESSAGE'), errors: error.array()  });
  }
};

/**
 * Controller function to handle logged in user data.
 * @param req Request object containing user token
 * @param res Response object to send back HTTP responses
 */
export const getProfile = async (req: any, res: any) => {
  /*
      #swagger.tags = ["User"]
      #swagger.description = 'profile'
    */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: errors.array()[0].msg,  errors: errors.array() });
  }
  const {user, token}: any = req;
  if (!user) {
    return res.status(404).json({ error: getMessage('USER_NOT_FOUND') });
  }
  const id = user.id;
  try {
    const userData: any = await User.findOne({ where: {id} });
    const userProfile = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      created_at: userData.created_at,
      updated_at: userData.updated_at
    };

    res.status(201).json({message: getMessage('SUCCESS'), user: userProfile, token});
  } catch (error) {
    res.status(500).json({ error: getMessage('SOMETHING_WENT_WRONG') });
  }
};
