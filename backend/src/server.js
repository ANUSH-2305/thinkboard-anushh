import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({
    origin:"http://localhost:5173"
}

));
//middleware
app.use(express.json());
app.use(rateLimiter);

// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`); 
//     next(); 
// })

app.use("/api/notes", notesRoutes)
 

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log("Started on PORT:", PORT);
});
});


