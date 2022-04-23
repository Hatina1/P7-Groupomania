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
router.post("/", auth, multer, postCtrl.createPost);
router.get("/comments", auth, postCtrl.getAllComments);
router.post("/:postId/comments", auth, postCtrl.createComment);
router.get("/:postId", auth, postCtrl.getOnePost);
router.put("/:postId", auth, multer, postCtrl.modifyPost);
router.delete("/:postId", auth, postCtrl.deletePost);
router.put("/:postId/like", auth, postCtrl.likePost);

// Export module used in other files
module.exports = router;
