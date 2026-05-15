'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function TestComponents() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>

      {/* Section 1: Cream background */}
      <section
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          padding: '64px 48px',
          marginBottom: '2px',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', marginBottom: '40px', fontWeight: 400 }}>
          Cream surface
        </h2>

        {/* Buttons */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', color: 'var(--color-neutral)' }}>Buttons</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary">Book a Session</Button>
            <Button variant="secondary">Learn More</Button>
            <Button variant="primary" disabled>Unavailable</Button>
          </div>
        </div>

        {/* Input + Label */}
        <div style={{ marginBottom: '40px', maxWidth: '400px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', color: 'var(--color-neutral)' }}>Form fields</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label htmlFor="name-cream">Full Name</Label>
              <Input id="name-cream" type="text" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="email-cream">Email Address</Label>
              <Input id="email-cream" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="message-cream">Message</Label>
              <Textarea id="message-cream" placeholder="Tell us about your session..." />
            </div>
          </div>
        </div>

        {/* Sheet trigger */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', color: 'var(--color-neutral)' }}>Sheet (nav drawer)</p>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>TLC Photography</SheetDescription>
              </SheetHeader>
              <nav style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {['Portfolio', 'Services', 'About', 'Blog', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      color: 'var(--color-text-primary)',
                      textDecoration: 'none',
                    }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Dialog trigger */}
        <div>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', color: 'var(--color-neutral)' }}>Dialog (lightbox)</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Golden Hour Session</DialogTitle>
                <DialogDescription>
                  A quiet afternoon in the fields. Just light, and the people you love.
                </DialogDescription>
              </DialogHeader>
              <div
                style={{
                  marginTop: '16px',
                  height: '200px',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-neutral)',
                  fontSize: '14px',
                }}
              >
                Image placeholder
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Section 2: Linen surface */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: '64px 48px',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', marginBottom: '40px', fontWeight: 400 }}>
          Linen surface
        </h2>

        {/* Buttons on linen */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', color: 'var(--color-neutral)' }}>Buttons</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary">Book a Session</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>

        {/* Input on linen */}
        <div style={{ marginBottom: '40px', maxWidth: '400px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', color: 'var(--color-neutral)' }}>Form fields on linen</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label htmlFor="name-linen">Full Name</Label>
              <Input id="name-linen" type="text" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="message-linen">Message</Label>
              <Textarea id="message-linen" placeholder="Tell us about your session..." />
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', color: 'var(--color-neutral)' }}>Accordion (FAQ)</p>
          <Accordion type="single" collapsible style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <AccordionItem value="item-1">
              <AccordionTrigger>What should we wear to our session?</AccordionTrigger>
              <AccordionContent>
                Wear what makes you feel like yourselves. Coordinated tones work better than matching outfits — think cream, sage, blush, or warm neutrals. Avoid logos and busy patterns. Most importantly, be comfortable. If you feel stiff, it shows.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long until we receive our images?</AccordionTrigger>
              <AccordionContent>
                Your gallery is typically delivered within two to three weeks. Family sessions and newborns take a little longer given the volume of images. You will receive a private Pixieset link to download full-resolution files.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you travel outside Louisiana?</AccordionTrigger>
              <AccordionContent>
                Yes. TLC serves central and northeast Louisiana primarily, but will travel for the right session. Destination sessions are available with a travel fee — reach out and we can talk through the details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
