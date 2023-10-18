import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import createError from '../utils/createError.js'

// register
export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json("user has been created!");
  } catch (error) {
    next(error)
  }
};

// login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user) return next(createError(404, 'User not found!'))

    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated) return next(createError(400, 'Wrong Credentials!'))

    const token = jwt.sign({
      id: user._id,
    }, process.env.JWT_KEY)

    const { password, ...args } = user._doc;
    res.cookie("accessToken", token, {httpOnly: true}).status(200).json(args);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken", 
    {
      sameSite: 'none',
      secure: true
    }.status(200).send("User has been logged out.")
  )
}