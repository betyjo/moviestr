'use server'

import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

export async function POST(req) {
  try {
    const { filename, contentType } = await req.json()
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: filename,
      ContentType: contentType
    })

    const url = await getSignedUrl(s3, command, { expiresIn: 900 }) // 15 min
    return NextResponse.json({ url })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
