import { useState } from 'react';
import { events, CATEGORY_LABELS, FORMAT_LABELS } from '../data/events';
import { descriptions } from '../data/descriptions';
import EventDescription from './EventDescription';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'objective', label: 'Objective Tests' },
  { value: 'presentation', label: 'Presentations' },
  { value: 'roleplay', label: 'Role Plays' },
  { value: 'chapter', label: 'Chapter Events' },
  { value: 'production', label: 'Production' },
];

function Browse({ grade, onBack, onQuiz }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const juniorAllowed = !grade || grade <= 10;
  const queryNorm = query.trim().toLowerCase();
  const visible = events.filter((event) => {
    if (event.juniorOnly && !juniorAllowed) return false;
    if (category !== 'all' && event.category !== category) return false;
    if (queryNorm) {
      const desc = descriptions[event.id] || '';
      const haystack = `${event.name} ${desc}`.toLowerCase();
      if (!haystack.includes(queryNorm)) return false;
    }
    return true;
  });

  return (
    <div className="browse">
      <button type="button" className="btn-back" onClick={onBack}>
        ← Home
      </button>

      <div className="browse-head">
        <p className="kicker kicker-navy">All {`76`} events</p>
        <h2>Browse every FBLA event</h2>
        <p className="browse-sub">
          {juniorAllowed
            ? 'Filter by category or search for a topic.'
            : 'Introduction-level events are hidden for 11th & 12th graders.'}
        </p>
      </div>

      <div className="browse-tools">
        <input
          type="search"
          className="search-input"
          placeholder="Search events"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search events"
        />
        <div className="filter-chips" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              className={`chip-btn ${category === c.value ? 'active' : ''}`}
              onClick={() => setCategory(c.value)}
              aria-pressed={category === c.value}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <p className="browse-meta">
        Showing {visible.length} of {events.length} events
      </p>

      {visible.length === 0 ? (
        <p className="browse-empty">No events match your search.</p>
      ) : (
        <div className="event-list">
          {visible.map((event) => (
            <article key={event.id} className="event-card">
              <h3 className="event-name">{event.name}</h3>
              {descriptions[event.id] && (
                <EventDescription text={descriptions[event.id]} clampLines={3} />
              )}
              <div className="event-badges">
                <span className="badge">{CATEGORY_LABELS[event.category]}</span>
                <span className="badge">{FORMAT_LABELS[event.format]}</span>
                {event.juniorOnly && <span className="badge junior">9th-10th grade</span>}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="browse-cta">
        <button type="button" className="btn-secondary" onClick={onQuiz}>
          Not sure? Take the quiz
        </button>
      </div>
    </div>
  );
}

export default Browse;