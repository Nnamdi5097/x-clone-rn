import "dotenv/config"; 
import express from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
//import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationsRoutes from "./routes/notification.route.js";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
// import { arcjetMiddleware } from "./middleware/arcjet.middleware.js"; // Keep disabled for now

const app = express();

app.use(cors({
  origin: "*", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// CHANGE 1: Pass the keys EXPLICITLY to the middleware.
// Clerk sometimes misses process.env when wrapped in custom config files.
app.use(clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}));

   
   // ADD THIS DEBUGGING ROUTE immediately after app.use(clerkMiddleware...
app.get("/api/debug-auth", (req, res) => {
  const auth = getAuth(req);
  console.log("Debug Auth Info:", auth);
  res.json({ 
    message: "Check your server terminal", 
    hasUserId: !!auth.userId,
    raw: auth 
  });
});



// DEBUGGING MIDDLEWARE: This will print to your terminal every time a request hits.
app.use((req, res, next) => {
  console.log(`--- ${req.method} ${req.url} ---`);
  console.log("Auth Header:", req.headers.authorization ? "Present" : "Missing");
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
    // CHANGE 2: Using standard process.env.PORT as fallback
    const PORT = ENV.PORT || 5001; 
    
    app.listen(PORT, () => 
      console.log("✅ Server is up and running on PORT:", PORT)
    );
    
    // CHANGE 3: Verify keys are actually loaded in the terminal
    console.log("🔑 Clerk Secret Key Loaded:", process.env.CLERK_SECRET_KEY ? "YES" : "NO");
    
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









