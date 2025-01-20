import Joi from 'joi';


export const studentSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().min(1).required(),
    grade: Joi.string().required(),
});