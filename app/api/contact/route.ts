import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const reply = (message: string, status: number) => NextResponse.json({ message }, { status });
  const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO) return reply('Contact form is unavailable.', 503);
  const length = Number(request.headers.get('content-length'));
  if (length > 24000) return reply('Message is too long.', 413);
  const fields = await request.json().catch(() => null);
  const limits = { name: 100, email: 254, subject: 160, message: 4000 };
  if (!fields || Object.entries(limits).some(([key, limit]) => typeof fields[key] !== 'string' || !fields[key].trim() || fields[key].length > limit)) {
    return reply('Check that all fields are filled in and within their length limits.', 400);
  }
  const { name, email, subject, message } = fields;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(subject)) return reply('Check the email address and subject.', 400);
  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: CONTACT_FROM, to: [CONTACT_TO], reply_to: email, subject, text: name + '\n\n' + message }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);
  return result?.ok ? reply('Message sent. Thank you!', 200) : reply('Could not send the message. Please try again.', 502);
}
