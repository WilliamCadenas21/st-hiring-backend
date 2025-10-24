import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

export const validateQuery = (schema: Joi.ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      convert: true, 
      allowUnknown: false,
    });

    if (error) {
      const details = error.details.map((d) => ({ message: d.message, path: d.path }));
      return res.status(400).json({ message: 'Invalid query', details });
    }

    req.query = value as any;
    return next();
  };
};
