 import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      default: "", // Changed from required: true
    },
    lastName: {
      type: String,
      default: "", // Changed from required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilepicture: { // Keep this lowercase to match your controller's mapping
      type: String,
      default: "",
    },
    // ... rest of your fields are fine
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;