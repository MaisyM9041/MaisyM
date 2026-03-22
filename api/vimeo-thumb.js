export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const r = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`);
  if (!r.ok) return res.status(502).json({ error: 'Vimeo error' });

  const data = await r.json();
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.status(200).json({ thumbnail_url: data.thumbnail_url });
}