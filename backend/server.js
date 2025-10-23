import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRouter from "./routes/upload.js";
import getVideoRouter from "./routes/getVideo.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", uploadRouter);
app.use("/", getVideoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is up on ${PORT}`);
});
