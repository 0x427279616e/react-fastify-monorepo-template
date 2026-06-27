import crypto from 'crypto';
import { processFile } from '../utils/fileProcessor';
import * as upload from '../utils/upload';

export async function uploadToR2(parts: any, pathPrefix: string) {
   const processed = await processFile(parts);
   const urls: { dataURL: string }[] = [];
   for (const file of processed.files) {
      const ext = file.filename.split('.').pop();
      const suffix = crypto.randomBytes(16).toString('hex');
      file.filename = `${pathPrefix}/${suffix}.${ext}`;
      const url = await upload.uploadToR2Bucket(file);
      urls.push({ dataURL: url });
   }
   return { urls: urls, payload: processed.fields };
}
