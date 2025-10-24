import Joi from 'joi';

export const ClientIdQuerySchema = Joi.object({
  clientId: Joi.alternatives(
    Joi.number().integer().positive(),
    Joi.string().pattern(/^\d+$/)
  )
    .required()
    .messages({
      'any.required': 'clientId is required',
      'string.pattern.base': 'clientId must be a positive integer string',
    }),
});