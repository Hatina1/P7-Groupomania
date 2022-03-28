const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/auth/signup", userCtrl.signup);
router.post("/auth/login", userCtrl.login);
router.delete("/:id", userCtrl.deleteUser);
router.put("/:id", userCtrl.activeUser);

module.exports = router;
