import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";




 const router = express.Router();

 

// public routes

// public routes
router.get("/", getPosts);          // Plural (get all)
router.get("/:postId", getPost);    // Singular (get one)
router.get("/user/:username", getUserPosts);



//router.get("/", getPosts);          // Gets all posts for the feed
//router.get("/:postId", getPost);    // Gets one specific post
// router.get("/user/:username", getUserPosts);



// router.get("/",getPost );
 //router.get("/:postId", getPosts);
 //router.get("/user/:username", getUserPosts);


 // protected proteced
router.post("/", protectRoute, upload.single("image"), createPost);
router.post("/:postId/like", protectRoute, likePost);
router.delete("/:postId", protectRoute, deletePost);



 export default router;