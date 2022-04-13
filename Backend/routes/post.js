// Modules importation
const express = require("express");
const router = express.Router();

// Importation of auth and multer middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Importation of sauce controller
const postCtrl = require("../controllers/post");

// differents routes of the api
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/:post_id/comment", auth, postCtrl.createComment);
//router.post("/:id/like", auth, postCtrl.likePost);

// Export module used in other files
module.exports = router;
