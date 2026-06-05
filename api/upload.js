import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { imageData, fileName } = req.body;
  const buffer = Buffer.from(imageData.split(',')[1], 'base64');
  const blob = await put(fileName || 'upload.jpg', buffer, {
    access: 'public',
    contentType: 'image/jpeg'
  });
  res.status(200).json({ url: blob.url });
}
