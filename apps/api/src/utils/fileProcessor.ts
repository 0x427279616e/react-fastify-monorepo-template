import ApiError from '../apiError';
import sharp from 'sharp';

async function processImageStream(stream: any, mimeType: string) {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk as Buffer);
  }
  const buffer = Buffer.concat(chunks);
  if (mimeType === 'image/png') {
    const fixedBuffer = await sharp(buffer).png({ force: true }).toBuffer();
    return await sharp(fixedBuffer)
      .resize({ width: 1920 })
      .jpeg({ quality: 100 })
      .toBuffer();
  }
  return await sharp(buffer).rotate().jpeg({ quality: 100 }).toBuffer();
}

async function streamToBuffer(stream: any) {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks);
}

export async function processFile(parts: any) {
  const fields: Record<string, any> = {};
  const files: { filename: string; file: Buffer; mimetype: string }[] = [];
  for await (const part of parts) {
    if (!part.file) {
      fields[part.fieldname] = part.value;
      continue;
    }
    if (part.file.truncated) throw new ApiError('File too large!', 400);
    if (!/\.(jpe?g|png|pdf|mp4)$/i.test(part.filename))
      throw new ApiError('Invalid file/image format!', 400);
    let fileBuffer: Buffer;
    if (part.mimetype.startsWith('image/')) {
      fileBuffer = await processImageStream(part.file, part.mimetype);
    } else {
      fileBuffer = await streamToBuffer(part.file);
    }
    files.push({ filename: part.filename, file: fileBuffer, mimetype: part.mimetype });
  }
  return { fields, files };
}
