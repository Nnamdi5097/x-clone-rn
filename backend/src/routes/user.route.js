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

// Public routes
router.get("/profile/:username", getUserprofile);

// Protected routes (Requires Auth)
// Note: These will be prefixed by whatever you set in server.js (usually /api/users)
router.post("/sync", protectRoute, syncUser);
router.get("/me", protectRoute, getCurrentUser);
router.put("/profile", protectRoute, updateprofile);
router.post("/follow/:targetUserId", protectRoute, followUser);

export default router; 