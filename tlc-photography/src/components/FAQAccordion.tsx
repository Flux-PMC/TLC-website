import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: Props) {
  if (!items.length) return null;

  return (
    <Accordion type="single" collapsible style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item, idx) => (
        <AccordionItem key={item.question.slice(0, 40)} value={`faq-${idx}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
