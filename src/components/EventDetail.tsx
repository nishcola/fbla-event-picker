import { useEffect } from 'react';
import { CATEGORY_LABELS, FORMAT_LABELS } from '../data/events';
import { descriptions } from '../data/descriptions';
import { INTEREST_THEMES } from '../data/questions';
import type { ResourceLink } from '../data/resources';
import EventDescription from './EventDescription';
import type { FBLAEvent } from '../types';
import './EventDetail.css';

interface EventDetailProps {
  event: FBLAEvent;
  topics: string[];
  resources: ResourceLink[];
  similar: FBLAEvent[];
  onBack: () => void;
  onQuiz: () => void;
  onSelectEvent: (eventId: string) => void;
  /** Label for the back button; defaults to "all events". */
  backLabel?: string;
}

function EventDetail({ event, topics, resources, similar, onBack, onQuiz, onSelectEvent, backLabel = 'Back to all events' }: EventDetailProps) {
  const matchedThemes = INTEREST_THEMES.filter((t) => event.interests.includes(t.value));

  // When the user opens a different event (e.g. a similar-events card), jump
  // back to the top so they see the new event's name and header.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [event.id]);

  return (
    <div className="detail">
      <button type="button" className="btn-back" onClick={onBack}>
        ← {backLabel}
      </button>

      <header className="detail-head">
        <p className="kicker kicker-navy">{CATEGORY_LABELS[event.category]}</p>
        <h2>{event.name}</h2>
        <div className="detail-badges">
          <span className="badge">{CATEGORY_LABELS[event.category]}</span>
          <span className="badge">{FORMAT_LABELS[event.format]}</span>
          {event.juniorOnly && <span className="badge junior">9th-10th grade</span>}
        </div>
        <div className="detail-interests">
          {matchedThemes.map((t) => (
            <span key={t.value} className="chip">
              {t.label}
            </span>
          ))}
        </div>
      </header>

      <section className="detail-section">
        <h3>About this event</h3>
        {descriptions[event.id] && <EventDescription text={descriptions[event.id]} clampLines={0} />}
      </section>

      <section className="detail-section">
        <h3>What to study</h3>
        {topics.length > 0 ? (
          <ul className="detail-topics">
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        ) : (
          <p className="detail-fallback">
            A detailed study outline is coming soon. Until then, review the official{' '}
            <a href="https://www.fbla.org/competitive-events/" target="_blank" rel="noreferrer">
              FBLA event guidelines
            </a>{' '}
            for the full topic list and scoring rubric.
          </p>
        )}
      </section>

      <section className="detail-section">
        <h3>Resources</h3>
        <ul className="detail-resources">
          {resources.map((resource) => (
            <li key={resource.url}>
              <a href={resource.url} target="_blank" rel="noreferrer">
                {resource.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {similar.length > 0 && (
        <section className="detail-section">
          <h3>Similar events</h3>
          <div className="similar-grid">
            {similar.map((similarEvent) => (
              <article
                key={similarEvent.id}
                className="similar-card"
                tabIndex={0}
                role="button"
                onClick={() => onSelectEvent(similarEvent.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectEvent(similarEvent.id);
                  }
                }}
              >
                <span className="similar-name">{similarEvent.name}</span>
                {descriptions[similarEvent.id] && (
                  <EventDescription text={descriptions[similarEvent.id]} clampLines={2} expandable={false} />
                )}
                <span className="event-badges">
                  <span className="badge">{CATEGORY_LABELS[similarEvent.category]}</span>
                  <span className="badge">{FORMAT_LABELS[similarEvent.format]}</span>
                </span>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="detail-cta">
        <button type="button" className="btn-secondary" onClick={onQuiz}>
          Not sure? Take the quiz
        </button>
      </div>
    </div>
  );
}

export default EventDetail;
