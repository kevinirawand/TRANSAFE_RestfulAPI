import Joi from 'joi';

export const registerSchema = Joi.object({
   username: Joi.string().required().min(5).max(20).messages({
      'string.min': 'Username must be at least 5 character',
      'string.max': 'Username must be max 20 character',
   }),

   password: Joi.string()
      .required()
      .min(5)
      .max(15)
      .alphanum()
      .label('Password'),

   passwordConfirmation: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .messages({
         'any.only': 'Password Confirmation does not match',
      }),
});

export const loginSchema = Joi.object({
   username: Joi.string().required().min(5).max(10).label('Username').messages({
      'string.min': 'Username must be at least 5 character',
      'string.max': 'Username must be max 10 character',
   }),

   password: Joi.string().required().min(5).max(15).alphanum(),
});
