import { useEffect, useRef, useState } from 'react';

function EventDescription({ text, clampLines = 2 }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
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
  }, [text]);

  return (
    <div className="event-desc-wrap">
      <p
        ref={ref}
        className={`event-desc ${expanded ? 'expanded' : `clamp-${clampLines}`}`}
      >
        {text}
      </p>
      {overflowing && (
        <button
          type="button"
          className="desc-toggle"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

export default EventDescription;