const Joi = require("joi");

const registerValidation = body => {
  const UserSchema = Joi.object().keys({
    username: Joi.string()
      .min(6)
      .max(50)
      .required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    repeat_password: Joi.ref("password")
  });

  return Joi.validate(body, UserSchema);
};

const loginValidation = body => {
  const LoginSchema = Joi.object().keys({
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });

  return Joi.validate(body, LoginSchema);
};

const movieValidation = body => {
  const MovieSchema = Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2),
    genre: Joi.string()
      .required()
      .min(4),
    release_date: Joi.date().required()
  });

  return Joi.validate(body, MovieSchema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.movieValidation = movieValidation;
