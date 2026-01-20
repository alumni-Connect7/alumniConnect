import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{from: 'user'|'bot'; text: string}>>([
    { from: 'bot', text: 'Hi 👋 I am AlumniAssist. How can I help you today?' }
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');

    // Simulate a bot reply (replace with real API later)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: `Got it — thanks! We suggest checking the Mentorship tab or posting your question here for mentors.` }]);
    }, 700);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        {open && (
          <div className="w-80 h-96 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-slate-700" />
                <div>
                  <div className="font-medium text-slate-900">AlumniAssist</div>
                  <div className="text-xs text-slate-500">Student help & quick guidance</div>
                </div>
              </div>
              <button aria-label="Close chat" onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 px-3 py-3 space-y-3 overflow-y-auto bg-slate-50">
              {messages.map((m, idx) => (
                <div key={idx} className={m.from === 'bot' ? 'text-sm text-slate-700' : 'text-sm text-slate-900 flex justify-end'}>
                  <div className={m.from === 'bot' ? 'inline-block bg-white px-3 py-2 rounded-lg shadow-sm' : 'inline-block bg-[#0b5fff] text-white px-3 py-2 rounded-lg'}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-3 py-2 border-t">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <button onClick={send} className="bg-[#0b5fff] p-2 rounded-lg text-white hover:opacity-95">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0b5fff] to-[#06b6d4] shadow-lg flex items-center justify-center text-white"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
