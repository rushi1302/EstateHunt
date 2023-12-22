import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js';

// code for signup
export const signup = async (req, res, next) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (username.length < 5 && password.length < 5) {
        return res.status(404).json({ message: "username and password must have 5 characters" })
    }
    const hashedPassword = bcrypt.hashSync(password, 7)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save();
        res.json({
            message: "Successfully post the data"
        })

    } catch (error) {
        next(error)
    }

}

// lets code for sign in - with jwt token.
export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User Not Found'))
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'wrong credential'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        // access_cookie is name of token.
    } catch (error) {
        next(error)
    }
}

// lets code for google authentication

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPasword = bcrypt.hashSync(generatedPassword, 10)
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase(),
                email: req.body.email,
                password: hashedPasword,
                photo: req.body.photo
            })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = newUser._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        }
    } catch (error) {
        next(error)
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token')
        res.status(200).json('User has been logged out Successfully')
    } catch (error) {
        next(error)
    }
}