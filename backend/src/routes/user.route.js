import express from "express";
import {
  followUser,
  getCurrentUser,
  getUserprofile,
  syncUser,
  updateprofile,
  
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";



 const router = express.Router();


 // public router

router.get("/profile/:username", getUserprofile);

// protected routes
router.post("/sync", protectRoute, syncUser);
router.post("/me", protectRoute, getCurrentUser);
router.put("/profile", protectRoute,  updateprofile);
router.post("/follow/:targetUserId", protectRoute, followUser);



 export default router;