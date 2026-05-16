import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+\d\s()-]{7,20}$/;

function validateFields(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!emailRe.test(values.email)) errors.email = 'Please enter a valid email address';
  if (!phoneRe.test(values.phone)) errors.phone = 'Please enter a valid phone number';
  if (!values.message.trim()) errors.message = 'Message is required';
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(Object.keys(validateFields(values)).length === 0);
  }, [values]);

  const handleChange =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    const fieldErrors = validateFields(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          website: honeypot,
        }),
      });

      if (!res.ok) throw new Error('Server error');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg(
        'Something went wrong. Please try again or email us directly.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div
        style={{
          padding: 'var(--space-2xl)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-subheading)',
            color: 'var(--color-botanical-1)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Thank you! We&rsquo;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange('name')}
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          autoComplete="name"
          placeholder="Your name"
        />
        {errors.name && (
          <p
            id="name-error"
            role="alert"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              color: 'var(--color-accent)',
              margin: 0,
            }}
          >
            {errors.name}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange('email')}
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          autoComplete="email"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              color: 'var(--color-accent)',
              margin: 0,
            }}
          >
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="contact-phone">Phone</Label>
        <Input
          id="contact-phone"
          type="tel"
          name="phone"
          value={values.phone}
          onChange={handleChange('phone')}
          required
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          autoComplete="tel"
          placeholder="(555) 000-0000"
        />
        {errors.phone && (
          <p
            id="phone-error"
            role="alert"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              color: 'var(--color-accent)',
              margin: 0,
            }}
          >
            {errors.phone}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={handleChange('message')}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          rows={5}
          placeholder="Tell us about your session..."
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-small)',
              color: 'var(--color-accent)',
              margin: 0,
            }}
          >
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={!isValid || status === 'sending'}
        style={{ alignSelf: 'flex-start' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </Button>

      {status === 'error' && (
        <p
          role="alert"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-small)',
            color: 'var(--color-accent)',
            margin: 0,
          }}
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
