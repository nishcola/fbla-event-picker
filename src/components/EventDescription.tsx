import { useEffect, useRef, useState } from 'react';
import './EventDescription.css';

interface EventDescriptionProps {
  text: string;
  clampLines?: number;
  /** When false, renders the clamped text without overflow detection or a toggle. */
  expandable?: boolean;
}

function EventDescription({ text, clampLines = 2, expandable = true }: EventDescriptionProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    if (!expandable) return;
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 1);
    check();
    const timeout = setTimeout(check, 350);
    window.addEventListener('resize', check);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', check);
    };
  }, [text, expandable]);

  return (
    <div className="event-desc-wrap">
      <p
        ref={ref}
        className={`event-desc ${expanded ? 'expanded' : `clamp-${clampLines}`}`}
      >
        {text}
      </p>
      {expandable && overflowing && (
        <button
          type="button"
          className="desc-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

export default EventDescription;
