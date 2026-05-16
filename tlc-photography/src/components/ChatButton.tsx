import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface Props {
  chatbotUrl: string;
}

export default function ChatButton({ chatbotUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!chatbotUrl) return null;

  const handleOpen = () => {
    setLoaded(true);
    setOpen(true);
  };

  return (
    <>
      {/* Floating trigger button */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Open chat assistant"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            minHeight: '44px',
            minWidth: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-accent)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
        >
          <MessageCircle
            size={24}
            strokeWidth={1.5}
            style={{ color: 'var(--color-bg-primary)' }}
          />
        </button>
      )}

      {/* Chat overlay */}
      {open && (
        <div
          style={{
            position: 'fixed',
            zIndex: 200,
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          }}
          className="chat-overlay"
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface)',
              border: '0.5px solid var(--color-botanical-1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 201,
            }}
          >
            <X size={20} strokeWidth={1.5} style={{ color: 'var(--color-text-primary)' }} />
          </button>

          {/* iframe */}
          {loaded && (
            <iframe
              src={chatbotUrl}
              title="Chat assistant"
              sandbox="allow-scripts allow-forms allow-same-origin"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
            />
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .chat-overlay {
            top: auto !important;
            left: auto !important;
            bottom: 24px !important;
            right: 24px !important;
            width: 400px;
            height: 600px;
            border-radius: 12px;
            overflow: hidden;
            border: 0.5px solid var(--color-botanical-1);
            background-color: var(--color-bg-primary);
          }
        }
      `}</style>
    </>
  );
}
