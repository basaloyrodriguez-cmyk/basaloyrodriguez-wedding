import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_cV6ZMdCU_5XNghZdxtZDCBC5phtBWqP2N');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, firstName } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Boda Basalo Rodriguez <hola@basalorodriguez.org>',
      to: [email],
      subject: '¡Gracias por confirmar tu asistencia!',
      templateId: 'wedding-invitation-confirmation',
      headers: {
        'X-Entity-Ref-ID': '123456789'
      }
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
