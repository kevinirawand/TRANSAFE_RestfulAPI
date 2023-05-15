import Joi from 'joi';

export const createTransactionSchema = Joi.object({
   nama_produk: Joi.string().required().min(5).max(50).messages({
      'string.min': 'Username must be at least 5 character',
      'string.max': 'Username must be max 50 character',
   }),
   harga: Joi.number().required(),
   images: Joi.string().required(),
   method: Joi.string().required(),
   ref_to: Joi.string().min(12).max(15).required(),
   fee_responsibility: Joi.string().valid('penjual', 'pembeli').required(),
});
