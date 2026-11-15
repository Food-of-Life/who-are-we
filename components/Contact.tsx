'use client';
import { useState, type FormEvent } from 'react';

export default function Contact({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setStatus('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      setStatus(result.message);
      if (response.ok) form.reset();
    } catch {
      setStatus('Could not send the message. Please try again.');
    } finally {
      setPending(false);
    }
  }
  if (!enabled) return null;
  return <form onSubmit={submit}>
    <label>Name<input name="name" autoComplete="name" required maxLength={100}/></label>
    <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
    <label>Subject<input name="subject" required maxLength={160}/></label>
    <label>Message<textarea name="message" rows={4} required maxLength={4000}/></label>
    <button disabled={pending}>{pending ? 'Sending…' : 'Send message ↗'}</button>
    <p role="status">{status}</p>
  </form>;
}
