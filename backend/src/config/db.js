
import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
      // We use ENV.MONGO_URI because that's how your project is set up
      await mongoose.connect(ENV.MONGO_URI);
      console.log("✅ Connected to DB SUCCESSFULLY");  
    } catch (error) {
       console.log("❌ MONGODB CONNECTION ERROR:");
       console.log("-----------------------------------------");
       console.error(error.message); // THIS IS THE IMPORTANT LINE
       console.log("-----------------------------------------");
       process.exit(1); 
    }
};









// import mongoose from "mongoose";
 //import { ENV } from "./env.js";




//export const connectDB = async () => {
  //  try {
  //    await mongoose.connect(ENV.MONGO_URI)
  //    console.log("Connected to DB SUCCESSFULLY");  
  //  } catch (error) {
    //   console.log("Error connecting to MONGODB");
    //   process.exit(1); 
   // }
//};

