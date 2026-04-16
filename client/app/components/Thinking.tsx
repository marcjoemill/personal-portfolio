import { FileText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Note {
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
}

const notes: Note[] = [
  {
    title: 'Why I choose boring technology',
    date: 'Mar 2024',
    excerpt: 'New frameworks and tools are exciting. But boring, proven technology lets you focus on the problem, not the infrastructure. Here\'s why I default to simple.',
    readTime: '5 min read',
  },
  {
    title: 'Building for the next developer',
    date: 'Feb 2024',
    excerpt: 'Code is read more than it\'s written. Every abstraction, every pattern, every comment should make the next person\'s job easier. Including future you.',
    readTime: '4 min read',
  },
  {
    title: 'When to optimize (and when not to)',
    date: 'Jan 2024',
    excerpt: 'Premature optimization wastes time. Late optimization loses users. The key is knowing what to measure and when to act on it.',
    readTime: '6 min read',
  },
  {
    title: 'Learning from production incidents',
    date: 'Dec 2023',
    excerpt: 'Every outage is a lesson. The goal isn\'t to never fail—it\'s to fail better. Here\'s what I\'ve learned from things breaking in production.',
    readTime: '7 min read',
  },
];

function NoteCard({ note, index }: { note: Note; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <a
        href="#"
        className="block border border-gray-200 p-8 hover:border-gray-900 transition-all duration-300 group"
      >
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-sm text-gray-500">{note.date}</span>
          <span className="text-sm text-gray-500">{note.readTime}</span>
        </div>
        <h3 className="text-2xl font-medium mb-4 text-gray-900 group-hover:text-gray-600 transition-colors">
          {note.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{note.excerpt}</p>
      </a>
    </div>
  );
}

export default function Thinking() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <div className="flex items-start gap-4 mb-6">
            <FileText className="w-8 h-8 text-gray-900 mt-1" />
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
                Thinking & Notes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Lessons learned, decisions documented, and thoughts on building software that matters.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {notes.map((note, index) => (
            <NoteCard key={index} note={note} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
