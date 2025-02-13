import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fileUpload from "express-fileupload";

import { Context } from "./types";
import router from "./routes";
import accessTokenMiddleware from "./middlewares/accessToken.middleware";

declare global {
  namespace Express {
    interface Request {
      context?: Context;
    }
  }
}

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use("/api", accessTokenMiddleware, router);
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});
async function main() {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Press CTRL + C to stop");
    });
  } catch (error) {
    console.error(error);
  }
}
main();
