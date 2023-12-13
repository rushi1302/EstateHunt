import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
export const signup = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 7)
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save();
    res.json({
        message: "Successfully post the data"
    })
}