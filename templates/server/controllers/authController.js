const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const {
  createAccessToken,
  createTokenUser,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../utils/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Provide all credentials" });
  }

  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const hashPassword = await bcrypt.compare(password, user.password);

  if (!hashPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Incorrect password" });
  }

  const tokenUser = createTokenUser(user);

  const accessToken = createAccessToken(tokenUser);
  const refreshToken = createRefreshToken(tokenUser);

  tokenUser.accessToken = accessToken;

  sendRefreshToken(res, refreshToken);
  sendAccessToken(res, tokenUser);
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Provide all credentials" });
    }

    const findUser = await prisma.users.findUnique({ where: { email } });

    if (findUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.users.create(
      await prisma.user.create({
        data: { email, password: hashPassword },
      })
    );

    res.status(201).json({ success: true, message: "Register successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshtoken", { path: "/" });
  res.status(200).json({ success: true, message: "User logged out" });
};

module.exports = {
  login,
  register,
  logout,
};
