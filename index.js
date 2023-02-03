// type:module in package json
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./MongoDB/connect.js";
import postRoutes from './Routes/postRoutes.js';
import wallRoutes from './Routes/wallRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({extended : true}))

app.use('/api/post', postRoutes);
app.use('/api/wall', wallRoutes);
app.use('/auth', authRoutes)
app.use('/api', userRoutes)

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to WALL AI"
    });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log(`Server is running on port : 8080`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
