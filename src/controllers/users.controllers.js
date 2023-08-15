const { Users, Carts, ProductsInCarts, Products } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sendWelcomeEmail } = require("../utils/sendEmail");
const { where } = require("sequelize");


const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);
        const user = await Users.create({ username, email, password: hashed });

        // Create Cart
        await Carts.create({userId: user.id})
        res.status(201).end();

        sendWelcomeEmail(email, { username, email, id: user.id });
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email } });

        // If user exsist retiurns a object
        // if it does not exsist returns null
        // * truthy, un numero, texto, [], {}, true
        // ! falsy, "", 0, false, null, undefined 
        if (!user) {
            return next({
                status: 400,
                errorName: "Invalid Credentials",
                error: "incorrect email / password",
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return next({
                status: 400,
                errorName: "Invalid Credentials",
                error: "incorrect email / password",
            });
        }

        // generate token
        const {
            id,
            username,
            firstname,
            role,
            lastname,
            profileImage,
            validEmail,
            createdAt,
            updatedAt,
        } = user;

        const token = jwt.sign(
            { id, username, email, firstname, lastname, role },
            process.env.JWT_SECRET,
            { algorithm: 'HS512', expiresIn: '10m' }
        );

        res.json({
            id,
            username,
            email,
            firstname,
            lastname,
            profileImage,
            validEmail,
            createdAt,
            updatedAt,
            token,
        });
    } catch (error) {
        next(error);
    }
}

const confirmEmail = async (req, res, next) => {
    try {
      const { token } = req.body;
  
      const decoded = jwt.verify(token, process.env.JWT_CONFIRM_SECRET, {
        algorithms: "HS512"
      });

      await Users.update({validEmail: true}, {where: {id: decoded.id}})
      res.status(204).end();
    } catch(error) {
      next(error)
    }
}

const uploadProfileImage = async (req, res, next) => {
    try {
        const {file, body} = req

        console.log(file);

        const url = process.env.NODE.ENV === 'production'
         ? `${process.env.URL}/public/${file.filename}`
         : `${process.env.URL}:${process.env.PORT}/public/${file.filename}`;

        await Users.update({profileImage: url}, {
            where:{
                id: Number(body.id)
            }
        })
      res.json();
    } catch(error) {
       next(error)
    }
}

const getAllUsersProductsInCart = async (req, res, next) => {
  try {
    const {id} = req.params

    const usersProductsInCart = await ProductsInCarts.findAll({
        where: {
            cartId: id,
        },
        attributes: {exclude: ['cartId', 'productId', 'price', 'purchased', 'createdAt', 'updatedAt']},
        include:[
            {
                model: Carts,
                attributes: {exclude: ['userId']},
                include: [
                    {
                    model: Users,
                    attributes: {exclude: ['firstname', 'lastname', 'rol', 'password', 'profileImage', 'validEmail', 'createdAt', 'updatedAt' ]}
                    }
                ]
            },
            {
                model: Products,
            },
        ]
    })
    res.json(usersProductsInCart);
  } catch(error) {
     next(error)
  }
}

module.exports = {
    createUser,
    loginUser,
    confirmEmail,
    uploadProfileImage,
    getAllUsersProductsInCart
}