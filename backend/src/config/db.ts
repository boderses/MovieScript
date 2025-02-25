import mongoose, { Connection } from "mongoose";
import { GridFSBucket, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

const conn: Connection = mongoose.createConnection(MONGO_URI);

let gfs: GridFSBucket | null = null;

conn.once("open", () => {
  if (conn.db) {
    gfs = new GridFSBucket(conn.db, { bucketName: "movies" });
    console.log("✅ GridFSBucket is connected!");
  } else {
    console.error("Error");
  }
});

export { conn, gfs };
