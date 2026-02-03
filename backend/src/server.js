import "dotenv/config"; 
import express from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationsRoutes from "./routes/notification.route.js";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

// --- HARDCODED TEST ---
// We are putting the key directly here to bypass Vercel variable issues.
// Replace the text inside the quotes below with your actual pk_test_... key.
const CLERK_PUB_KEY = "pk_test_dXNhYmxlLXNwb25nZS0xOS5jbGVyay5hY2NvdW50cy5kZXYk"; 
const CLERK_SEC_KEY = process.env.CLERK_SECRET_KEY;

app.use(cors({
  origin: "*", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Passing the hardcoded key directly
app.use(clerkMiddleware({
  publishableKey: CLERK_PUB_KEY,
  secretKey: CLERK_SEC_KEY,
}));

// DEBUGGING ROUTE
app.get("/api/debug-auth", (req, res) => {
  const auth = getAuth(req);
  res.json({ 
    message: "Debugging Auth", 
    hasUserId: !!auth.userId,
    keyDetected: !!CLERK_PUB_KEY,
    keyLength: CLERK_PUB_KEY ? CLERK_PUB_KEY.length : 0
  });
});

app.use((req, res, next) => {
  console.log(`--- ${req.method} ${req.url} ---`);
  next();
});

app.get("/", (req, res) => res.send("Hello from server (Hardcode Test)"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationsRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5001; 
    
    app.listen(PORT, () => {
      console.log("✅ Server running on PORT:", PORT);
      console.log("🔑 Running Hardcode Test for Clerk Key");
    });
    
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

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









