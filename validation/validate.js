const Joi = require('@hapi/joi');

const validateRegister = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).max(100).required().email(),
        password: Joi.string().min(6).max(20).required()
    });

    return schema.validate(data);
}

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(100).required().email(),
        password: Joi.string().min(6).max(20).required()
    });

    return schema.validate(data);
}

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;