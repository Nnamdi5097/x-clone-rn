 
import { getAuth } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;

    // DEBUG LOGGING
    console.log("--- Request Received ---");
    console.log("Authorization Header:", req.headers.authorization ? "YES" : "NO");
    console.log("UserID Found:", userId || "NONE");

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized - No Session Found" });
    }

    req.auth = { userId };
    next();
  } catch (error) {
    console.error("Clerk Middleware Error:", error.message);
    res.status(401).json({ error: "Unauthorized - Invalid Token" });
  }
};


 
 
 
 
 
 //export const protectRoute = async (req, res, next) => {
  // // if (!req.auth().isAuthenticated)  {
  //      return res.status(401).json({ message: "Unauthorizeed - you must be logged in"});
  //  }
 //   next()
 //};