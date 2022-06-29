import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

// app initialization
const app = express();

// app configuration
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// app use configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// database connection
connectDatabase();

// import routes and use them in the app
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/v1", router);

// listening on port process.env.PORT
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
