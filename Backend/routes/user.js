const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/auth/signup", userCtrl.signup);
router.post("/auth/login", userCtrl.login);
router.get("/users", auth, userCtrl.getAllUsers);
router.get("/users/:id", auth, userCtrl.getOneUser);
router.put("/users/:id", auth, userCtrl.modifyUser);
router.put("/users/:id/delete", auth, userCtrl.deleteUser);
router.put("/users/:id/activate", auth, userCtrl.activeUser);

module.exports = router;
