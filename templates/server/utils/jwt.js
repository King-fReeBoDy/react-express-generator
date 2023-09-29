const jwt = require("jsonwebtoken");

const isTokenValid = (token) => jwt.verify(token, process.env.ACCESSTOKEN);

const createAccessToken = (userId) => {
  return jwt.sign(userId, process.env.ACCESSTOKEN, { expiresIn: "15m" });
};

const createRefreshToken = (userId) => {
  return jwt.sign(userId, process.env.REFRESHTOKEN, { expiresIn: "7d" });
};

const sendAccessToken = (res, user) => {
  res.status(200).json(user);
};

const sendRefreshToken = (res, token) => {
  res.cookie("refreshtoken", token, {
    httpOnly: true,
    path: "/",
  });
};

const createTokenUser = (user) => {
  return {
    id: user.rows[0].user_id,
    email: user.rows[0].email,
  };
};

module.exports = {
  isTokenValid,
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  createTokenUser,
};
