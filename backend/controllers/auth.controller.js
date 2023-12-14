import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js';

// code for signup
export const signup = async (req, res, next) => {
    console.log(req.body);
    const { username, email, password } = req.body
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
        const { password: pass, ...rest } = validUser_doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
