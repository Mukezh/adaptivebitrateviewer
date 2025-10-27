import {
  S3Client,
  ListObjectsV2Command,
  paginateListObjectsV2,
} from "@aws-sdk/client-s3";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const getVideoRouter = express.Router();
const client = new S3Client({ region: process.env.AWS_REGION });
// const command = new paginateListObjectsV2({
//   Bucket: process.env.S3_BUCKET_NAME,
//   Prefix: "raw-videos/",
// });

getVideoRouter.get("/getVideo", async (req, res) => {
  //   try {
  //     const response = await client.send(command);
  //     response.Contents.forEach((obj) => {
  //       console.log(obj.Key);
  //       res.json({ success: true, video: obj.Key });
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ success: false, message: "video retrieval failed" });
  //   }
  // });

  // const response = await client.send(command);
  // response.Contents.forEach((obj) => {
  //   console.log(obj.Key);
  // });

  try {
    const paginator = paginateListObjectsV2(
      {
        client: client,
        pageSize: 10,
      },
      { Bucket: process.env.S3_BUCKET_NAME, Prefix: "raw-videos/" },
    );
    const allKeys = [];

    for await (const page of paginator) {
      // page.Contents is an array of { Key, Size, LastModified, ... }
      const keysInPage = page.Contents?.map((obj) => obj.Key) ?? [];
      allKeys.push(...keysInPage);
    }

    res.json({ status: 200, allKeys });
  } catch (err) {
    console.error(err);
  }
});

export default getVideoRouter;
//
