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

// --- CLERK KEY SAFETY CHECK ---
// This ensures that even if Vercel naming is tricky, we grab the right key.
const CLERK_PUB_KEY = process.env.CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const CLERK_SEC_KEY = process.env.CLERK_SECRET_KEY;

app.use(cors({
  origin: "*", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// FIXED: Explicitly passing the keys with the safety variables defined above
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

app.get("/", (req, res) => res.send("Hello from server"));

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
      // This will show in your Vercel Runtime Logs to confirm the fix
      console.log("🔑 Clerk Pub Key Detected:", CLERK_PUB_KEY ? "YES" : "NO");
      if (CLERK_PUB_KEY) console.log("📏 Pub Key Length:", CLERK_PUB_KEY.length);
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









