const bcrypt = require("bcryptjs");
const userModel = require("../../models/user/userModel");
const jwt = require("../../jwt/jwt");
const dotenv = require("dotenv");
dotenv.config();
const SALT_ROUND = process.env.SALT_ROUND;

const register = async (req, res, next) => {
  const userName = req.body.userName;
  // Check user Existed in DB
  let user = await userModel.getUserByUserName(userName);
  if (user)
    res.status(409).json({ status: "warning", msg: "Your UserName have Existed Before!!!!" });
  else {
    const hashPassword = bcrypt.hashSync(
      req.body.passWord,
      bcrypt.genSaltSync(parseInt(SALT_ROUND))
    );
    let user = { ...req.body, passWord: hashPassword };
    let createUser = await userModel.createNewUser(user);
    console.log(createUser);
    if (!createUser) res.status(400).json({ msg: "Register Fail!!!" });
    else {
      res.json({
        status: "success",
        msg: `Register Successfully with username: ${user.userName}`,
      });
    }
  }
};

const login = async (req, res, next) => {
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  // Check user existed in db
  let user = await userModel.getUserByUserName(userName);
  if (!user)
    res.status(401).json({ status: "warning", msg: "User Name not found" });
  else {
    const isPasswordValid = bcrypt.compareSync(passWord, user.passWord);
    if (!isPasswordValid)
      res.status(401).json({ status: "warning", msg: "Wrong Password" });
    else {
      res.json({
        status: "success",
        msg: "Login success",
        accessToken: jwt.generateAccessToken({ userId: user.id, userName: user.userName, role: user.role }),
        user: { userId: user.id, userName: user.userName, role: user.role },
      });
    }
  }
};

module.exports = {
  register,
  login,
};
