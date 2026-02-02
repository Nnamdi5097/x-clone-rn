import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { createClerkClient } from "@clerk/express";

// Initialize Clerk Client
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const getUserprofile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json({ user });
});

export const updateprofile = asyncHandler(async (req, res) => {
  // Use req.auth instead of getAuth(req) to prevent the TypeError crash
  const { userId } = req.auth;

  const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, {
    new: true,
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json({ user });
});

export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = req.auth;

  if (!userId) {
    return res.status(401).json({ error: "No user ID found in token" });
  }

  // Check if user already exists in mongodb
  const existingUser = await User.findOne({ clerkId: userId });
  if (existingUser) {
    return res.status(200).json({ user: existingUser, message: "User already exists" });
  }

  // Fetch data from Clerk
  const clerkUser = await clerk.users.getUser(userId);

  const userData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username: clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split("@")[0],
    profilepicture: clerkUser.imageUrl || "", // Lowercase 'p' to match your model
  };

  const user = await User.create(userData);
  res.status(201).json({ user, message: "User created successfully" });
});


  export const getCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  
  console.log("Searching DB for ClerkID:", userId); // DEBUG LOG

  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    console.log("User not found in MongoDB. Frontend should trigger /sync now.");
    return res.status(404).json({ error: "User not found in database" });
  }

  res.status(200).json({ user });
});


//export const getCurrentUser = asyncHandler(async (req, res) => {
//  const { userId } = req.auth;
  
 // if (!userId) {
 //    return res.status(401).json({ error: "Not authenticated" });
 // }

  //const user = await User.findOne({ clerkId: userId });

  //if (!user) return res.status(404).json({ error: "User not found in database" });

 // res.status(200).json({ user });
//});

export const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const { targetUserId } = req.params;

  if (userId === targetUserId)
    return res.status(400).json({ error: "You cannot follow yourself" });

  const currentUser = await User.findOne({ clerkId: userId });
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser)
    return res.status(404).json({ error: "User not found" });

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    // unfollow
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUser._id },
    });
  } else {
    // follow
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $push: { followers: currentUser._id },
    });

    // create notification
    await Notification.create({
      from: currentUser._id,
      to: targetUserId,
      type: "follow",
    });
  }

  res.status(200).json({
    message: isFollowing
      ? "User unfollowed successfully"
      : "User followed successfully",
  });
});
