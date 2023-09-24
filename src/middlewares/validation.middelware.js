const Joi = require("joi");

// const registerSchema = Joi.object({
//     username: Joi.string()
//         .alphanum()
//         .min(3)
//         .max(30)
//         .required(),

//     password: Joi.string()
//         .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//     email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
// })

// schema.validate({ username: 'abc', birth_year: 1994 });
// // -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});

// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { }

const registerValitate = async (req, res, next) => {
  const registerSchema = Joi.object({
    fullname: Joi.string().required().min(6).max(20),

    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  try {
    const value = await registerSchema.validateAsync(req.body);
    console.log(value);
    return next();
  } catch (err) {
    return res.status(400).send({message:err.message});
  }
};
const loginValitate = async (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  try {
    const value = await loginSchema.validateAsync(req.body);
    console.log(value);
    return next();
  } catch (err) {
    return res.status(400).send({message:err.message});
  }
};

module.exports = {
  registerValitate,
  loginValitate,
};
