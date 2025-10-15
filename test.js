import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({ region: process.env.AWS_REGION });

async function test() {
  const res = await s3.send(new ListBucketsCommand({}));
  console.log("✅ Connected to S3! Buckets:");
  console.log(res.Buckets.map(b => b.Name));
}

test().catch(console.error);

