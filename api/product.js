import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await kv.get('chef_products');
    return res.json(data || []);
  }

  if (req.method === 'POST') {
    const body = req.body;
    const products = (await kv.get('chef_products')) || [];
    body.id = Date.now();
    products.push(body);
    await kv.set('chef_products', products);
    return res.status(201).json(body);
  }

  res.status(405).end();
}
