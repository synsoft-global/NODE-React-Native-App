import { Request, Response } from 'express';

/**
 * Controller function to handle upload file.
 * @param req Request object containing file data with multipart post type
 * @param res Response object to send back HTTP responses
 */
export const uploadFile = (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Upload']
  #swagger.summary = 'Upload File'
  #swagger.description = 'Upload File'
  #swagger.consumes = ['multipart/form-data']
  #swagger.parameters['file'] = {
        in: 'formData',
        type: 'file',
        required: 'true',
        description: 'File data',
  }
  */
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(201).json({
    message: 'File uploaded successfully',
    filePath: fullUrl
  });
};
