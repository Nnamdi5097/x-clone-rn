import "dotenv/config"; 
import express from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationsRoutes from "./routes/notification.route.js";

import { connectDB } from "./config/db.js";

const app = express();

// Immediate DB Connection for Vercel stability
connectDB();

app.use(cors({
  origin: "*", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// This will look for the keys you added in the Vercel Settings
app.use(clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}));

// DEBUGGING ROUTE - Visit /api/debug-auth to see if keys are working
app.get("/api/debug-auth", (req, res) => {
  const auth = getAuth(req);
  res.json({ 
    message: "Checking System Environment...", 
    hasUserId: !!auth.userId,
    publishableKeyDetected: !!process.env.CLERK_PUBLISHABLE_KEY,
    secretKeyDetected: !!process.env.CLERK_SECRET_KEY,
  });
});

app.get("/", (req, res) => res.send("Server is live and running!"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error("Internal Error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// For local testing
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`✅ Local server: http://localhost:${PORT}`));
}

export default app;


  //const startServer = async () => {
  //  try {
  //    await connectDB();

    
  //    // listen for local development
 //  if (ENV.NODE_ENV !== "production") {
     // app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));
  // }
      
   // } catch (error) {
    //   console.error("Failed to start server:", error.message);
    //   process.exit(1); 
  // }
//};









