import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateBody = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true,
        convert: true
      });
      
      req.body = validatedBody;
      return next();
    } catch (error: any) {
      res.status(400).json({
        message: 'Validation error',
        details: error.details?.map((detail: any) => ({
          message: detail.message,
          path: detail.path
        }))
      });
      return;
    }
  };
};