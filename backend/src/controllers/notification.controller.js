 import asyncHandler from "express-async-handler";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getNotifications = asyncHandler(async (req, res) => {
  // Use req.auth directly to avoid the TypeError crash
  const { userId } = req.auth;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const notifications = await Notification.find({ to: user._id })
    .sort({ createdAt: -1 })
    .populate("from", "username firstName lastName profilepicture") // Ensure 'profilepicture' matches your model casing
    .populate("post", "content image")
    .populate("comment", "content");

  res.status(200).json({ notifications });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  // Use req.auth directly here as well
  const { userId } = req.auth;
  const { notificationId } = req.params;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    to: user._id,
  });

  if (!notification) return res.status(404).json({ error: "Notification not found" });

  res.status(200).json({ message: "Notification deleted successfully" });
});