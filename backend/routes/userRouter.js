const router = require("express").Router();

const { loginUser, registerUser, verifyUser } = require("../controllers/userCtrl");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/verify", verifyUser);

module.exports = router;