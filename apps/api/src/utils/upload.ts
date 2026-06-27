import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from './r2Client';

export async function uploadToR2Bucket(data: any) {
   const { filename, file, mimetype } = data;
   await r2Client.send(
      new PutObjectCommand({
         Bucket: process.env.R2_BUCKET_NAME,
         Key: filename,
         Body: file,
         ContentType: mimetype,
      }),
   );

   // return uploaded image url
   return `${process.env.R2_BUCKET_DOMAIN}/${filename}`;
}
