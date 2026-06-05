import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { id } = req.query;
  const products = (await kv.get('chef_products')) || [];
  const index = products.findIndex(p => p.id == id);

  if (index === -1) return res.status(404).json({ error: 'Not found' });

  if (req.method === 'PUT') {
    products[index] = { ...products[index], ...req.body, id: Number(id) };
    await kv.set('chef_products', products);
    return res.json(products[index]);
  }

  if (req.method === 'DELETE') {
    products.splice(index, 1);
    await kv.set('chef_products', products);
    return res.json({ success: true });
  }

  res.status(405).end();
}
