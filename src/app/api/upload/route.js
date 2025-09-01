import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT || undefined,
  forcePathStyle: !!process.env.S3_ENDPOINT, // for MinIO
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const { key, contentType } = await req.json();
    const cmd = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: contentType || "application/octet-stream",
    });
    const url = await getSignedUrl(s3, cmd, { expiresIn: 900 });
    return NextResponse.json({ url, key });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
