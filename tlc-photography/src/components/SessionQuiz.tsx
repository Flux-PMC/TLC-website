import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

type SessionType = 'families' | 'couples' | 'seniors' | 'newborns' | 'maternity' | 'engagements';
type Answers = Record<string, string>;

const QUESTIONS = [
  {
    id: 'subject',
    text: "Who's being photographed?",
    choices: [
      { id: 'just-me', label: 'Just me' },
      { id: 'partner', label: 'Me and my partner' },
      { id: 'family', label: 'Our family' },
      { id: 'baby', label: 'Our baby' },
    ],
  },
  {
    id: 'occasion',
    text: "What's the occasion?",
    choices: [
      { id: 'milestone', label: 'A milestone' },
      { id: 'just-because', label: 'Just because' },
      { id: 'announcement', label: 'An announcement' },
    ],
  },
  {
    id: 'setting',
    text: 'Indoor or outdoor?',
    choices: [
      { id: 'outdoor', label: 'Outdoors always' },
      { id: 'indoor', label: 'Indoor would be nice' },
      { id: 'no-pref', label: 'No preference' },
    ],
  },
  {
    id: 'vibe',
    text: 'What feel are you going for?',
    choices: [
      { id: 'relaxed', label: 'Natural and relaxed' },
      { id: 'polished', label: 'More posed and polished' },
      { id: 'mix', label: 'A mix of both' },
    ],
  },
];

const SESSION_DATA: Record<SessionType, { label: string; description: string; anchor: string }> = {
  families: {
    label: 'Families',
    description: 'Real moments, real laughter. We photograph your family as you actually are — together.',
    anchor: 'families',
  },
  couples: {
    label: 'Couples',
    description: 'Just the two of you. Connection, light, and a location that feels like yours.',
    anchor: 'couples',
  },
  seniors: {
    label: 'Seniors',
    description: 'A portrait that captures who you are right now — before everything changes.',
    anchor: 'seniors',
  },
  newborns: {
    label: 'Newborns',
    description: 'They stay this small for about five minutes. We help you keep it.',
    anchor: 'newborns',
  },
  maternity: {
    label: 'Maternity',
    description: 'This is a season worth remembering. Soft light, gentle pacing, beautiful images.',
    anchor: 'maternity',
  },
  engagements: {
    label: 'Engagements',
    description: "Before the wedding, when it's still just the two of you figuring out how to be in love.",
    anchor: 'engagements',
  },
};

function getRecommendation(answers: Answers): SessionType[] {
  const { subject, occasion } = answers;

  let primary: SessionType;

  if (subject === 'baby') {
    primary = 'newborns';
  } else if (subject === 'family') {
    primary = occasion === 'announcement' ? 'maternity' : 'families';
  } else if (subject === 'partner') {
    primary = occasion === 'announcement' ? 'engagements' : 'couples';
  } else {
    primary = 'seniors';
  }

  const secondary: SessionType[] = [];

  if (primary === 'families' && occasion === 'milestone') {
    secondary.push('seniors');
  }
  if (primary === 'couples' && occasion === 'milestone') {
    secondary.push('engagements');
  }
  if (primary === 'seniors' && occasion === 'announcement') {
    secondary.push('engagements');
  }

  return [primary, ...secondary].slice(0, 2);
}

interface Props {
  calendlyUrl: string;
}

export default function SessionQuiz({ calendlyUrl }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<SessionType[] | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (result) {
      resultRef.current?.focus();
    }
  }, [result]);

  function handleChoiceClick(questionId: string, choiceId: string) {
    setSelectedChoiceId(choiceId);
    setTimeout(() => {
      const newAnswers = { ...answers, [questionId]: choiceId };
      if (currentStep < QUESTIONS.length - 1) {
        setAnswers(newAnswers);
        setCurrentStep(currentStep + 1);
      } else {
        setResult(getRecommendation(newAnswers));
      }
      setSelectedChoiceId(null);
    }, 200);
  }

  function handleBack() {
    const question = QUESTIONS[currentStep];
    const newAnswers = { ...answers };
    delete newAnswers[question.id];
    setAnswers(newAnswers);
    setCurrentStep(currentStep - 1);
  }

  function handleReset() {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setSelectedChoiceId(null);
  }

  const cardBase: React.CSSProperties = {
    background: 'var(--color-surface)',
    borderRadius: '8px',
    maxWidth: '640px',
  };

  if (result) {
    return (
      <div
        role="region"
        aria-label="Session type quiz"
        className="p-6 md:p-8"
        style={cardBase}
      >
        <h2
          ref={resultRef}
          tabIndex={-1}
          style={{
            outline: 'none',
            fontFamily: 'var(--font-subheading)',
            fontSize: '18px',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--color-neutral)',
            margin: '0 0 var(--space-xl)',
          }}
        >
          We'd recommend:
        </h2>

        {result.map((sessionType, index) => {
          const data = SESSION_DATA[sessionType];
          return (
            <div key={sessionType}>
              {index > 0 && (
                <hr
                  style={{
                    border: 'none',
                    borderTop: '2px solid var(--color-botanical-1)',
                    margin: 'var(--space-xl) 0',
                  }}
                />
              )}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 12px',
                }}
              >
                {data.label}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 var(--space-xl)',
                }}
              >
                {data.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginBottom: 'var(--space-xl)',
                }}
              >
                <Button variant="primary" asChild>
                  <a href={`/services#${data.anchor}`}>See this session</a>
                </Button>
                <Button variant="secondary" asChild>
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Book a consultation
                  </a>
                </Button>
              </div>
            </div>
          );
        })}

        <button
          onClick={handleReset}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            color: 'var(--color-neutral)',
            padding: '12px 0',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Start over
        </button>
      </div>
    );
  }

  const question = QUESTIONS[currentStep];

  return (
    <div
      role="region"
      aria-label="Session type quiz"
      className="p-6 md:p-8"
      style={cardBase}
    >
      <p
        aria-live="polite"
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '12px',
          color: 'var(--color-neutral)',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          margin: '0 0 16px',
        }}
      >
        QUESTION {currentStep + 1} OF {QUESTIONS.length}
      </p>

      <div role="group" aria-labelledby={`question-${question.id}`}>
        <p
          id={`question-${question.id}`}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '24px',
            fontWeight: 400,
            color: 'var(--color-text-primary)',
            margin: '0 0 24px',
          }}
        >
          {question.text}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {question.choices.map((choice) => (
            <Button
              key={choice.id}
              variant={selectedChoiceId === choice.id ? 'primary' : 'secondary'}
              className="w-full justify-start normal-case tracking-normal whitespace-normal pl-5 font-body text-base"
              onClick={() => handleChoiceClick(question.id, choice.id)}
            >
              {choice.label}
            </Button>
          ))}
        </div>
      </div>

      {currentStep > 0 && (
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            color: 'var(--color-neutral)',
            marginTop: '16px',
            padding: '12px 0',
            minHeight: '44px',
          }}
        >
          <ChevronLeft size={16} strokeWidth={1.5} />
          Back
        </button>
      )}
    </div>
  );
}
