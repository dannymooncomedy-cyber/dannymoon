export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error('Server configuration error: Missing BREVO_API_KEY');
    return res.status(500).json({ message: 'Server configuration error: Missing API Key' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Brevo API error response:', errorData);
      return res.status(response.status).json({ message: 'Failed to send message via Brevo', error: errorData });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
