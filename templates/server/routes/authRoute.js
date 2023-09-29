const { Router } = require("express");
const router = Router();

const { login, register, logout } = require("../controllers/authController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);

module.exports = router;
