import { CATEGORY_LABELS, FORMAT_LABELS, CLUSTER_LABELS } from '../data/events';
import { descriptions } from '../data/descriptions';
import { topics } from '../data/topics';
import { INTEREST_THEMES } from '../data/questions';
import { selectedEvents } from '../logic/compareSelection';
import type { FBLAEvent } from '../types';
import EventDescription from './EventDescription';
import './Compare.css';

interface CompareProps {
  compareEventIds: string[];
  events: FBLAEvent[];
  onBack: () => void;
  onSelectEvent: (eventId: string) => void;
  onToggleCompare: (eventId: string) => void;
  onClearCompare: () => void;
  onBrowse: () => void;
}

export default function Compare({
  compareEventIds,
  events,
  onBack,
  onSelectEvent,
  onToggleCompare,
  onClearCompare,
  onBrowse,
}: CompareProps) {
  const selected = selectedEvents(compareEventIds, events);

  if (selected.length === 0) {
    return (
      <div className="compare-empty-container">
        <button type="button" className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <div className="compare-empty-card">
          <h2>No events selected for comparison</h2>
          <p>Select up to 3 events from Browse or Quiz Results to compare them side-by-side.</p>
          <button type="button" className="btn-primary" onClick={onBrowse}>
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-page">
      <div className="compare-header-row">
        <button type="button" className="btn-back" onClick={onBack}>
          ← Back
        </button>
        {selected.length > 0 && (
          <button type="button" className="btn-clear-compare" onClick={onClearCompare}>
            Clear comparison
          </button>
        )}
      </div>

      <header className="compare-title-section">
        <p className="kicker kicker-navy">Side-by-Side Analysis</p>
        <h2>Compare FBLA Events</h2>
        <p className="compare-sub">
          Comparing {selected.length} event{selected.length > 1 ? 's' : ''} side-by-side.
          {selected.length < 3 && ' You can add ' + (3 - selected.length) + ' more event from Browse.'}
        </p>
      </header>

      <div className="compare-matrix-wrapper">
        <div className="compare-matrix" style={{ gridTemplateColumns: `160px repeat(${selected.length}, minmax(260px, 1fr))` }}>

          {/* Header Row */}
          <div className="matrix-cell matrix-label-header">Event Name</div>
          {selected.map((evt) => (
            <div key={evt.id} className="matrix-cell matrix-event-header">
              <div className="matrix-event-top">
                <h3 className="matrix-event-name">{evt.name}</h3>
                <button
                  type="button"
                  className="matrix-remove-btn"
                  onClick={() => onToggleCompare(evt.id)}
                  title={`Remove ${evt.name}`}
                  aria-label={`Remove ${evt.name} from comparison`}
                >
                  ×
                </button>
              </div>
              <div className="matrix-event-badges">
                <span className="badge">{CATEGORY_LABELS[evt.category]}</span>
                <span className="badge">{FORMAT_LABELS[evt.format]}</span>
                {evt.juniorOnly && <span className="badge junior">9th-10th grade</span>}
              </div>
            </div>
          ))}

          {/* Overview / Description */}
          <div className="matrix-cell matrix-label">Overview</div>
          {selected.map((evt) => (
            <div key={evt.id} className="matrix-cell matrix-content">
              {descriptions[evt.id] ? (
                <EventDescription text={descriptions[evt.id]} clampLines={4} />
              ) : (
                <span className="matrix-fallback">No overview available.</span>
              )}
            </div>
          ))}

          {/* Category / Competition Style */}
          <div className="matrix-cell matrix-label">Competition Style</div>
          {selected.map((evt) => (
            <div key={evt.id} className="matrix-cell matrix-content">
              <strong className="matrix-value-highlight">{CATEGORY_LABELS[evt.category]}</strong>
              <p className="matrix-hint-text">
                {evt.category === 'objective' && 'Multiple-choice test on a business topic.'}
                {evt.category === 'presentation' && 'Prepared speech/presentation delivered to judges.'}
                {evt.category === 'roleplay' && 'On-the-spot business scenario problem solving.'}
                {evt.category === 'chapter' && 'Long-term chapter project completed together.'}
                {evt.category === 'production' && 'Hands-on product development (site, app, video).'}
              </p>
            </div>
          ))}

          {/* Team Format */}
          <div className="matrix-cell matrix-label">Format</div>
          {selected.map((evt) => (
            <div key={evt.id} className="matrix-cell matrix-content">
              <span className="matrix-value">{FORMAT_LABELS[evt.format]}</span>
            </div>
          ))}

          {/* Grade Eligibility */}
          <div className="matrix-cell matrix-label">Grade Level</div>
          {selected.map((evt) => (
            <div key={evt.id} className="matrix-cell matrix-content">
              {evt.juniorOnly ? (
                <span className="matrix-tag junior-tag">9th &amp; 10th Grade Only</span>
              ) : (
                <span className="matrix-tag standard-tag">All Grades (9th–12th)</span>
              )}
            </div>
          ))}

          {/* Career Clusters */}
          <div className="matrix-cell matrix-label">Career Clusters</div>
          {selected.map((evt) => (
            <div key={evt.id} className="matrix-cell matrix-content">
              <div className="matrix-badge-group">
                {evt.clusters.map((c) => (
                  <span key={c} className="badge cluster-badge">
                    {CLUSTER_LABELS[c]}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Interest Tags */}
          <div className="matrix-cell matrix-label">Interest Tags</div>
          {selected.map((evt) => {
            const matchedThemes = INTEREST_THEMES.filter((t) => evt.interests.includes(t.value));
            return (
              <div key={evt.id} className="matrix-cell matrix-content">
                <div className="matrix-chip-group">
                  {matchedThemes.map((t) => (
                    <span key={t.value} className="chip">
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Study Topics */}
          <div className="matrix-cell matrix-label">Study Topics</div>
          {selected.map((evt) => {
            const topicList = topics[evt.id] ?? [];
            return (
              <div key={evt.id} className="matrix-cell matrix-content">
                {topicList.length > 0 ? (
                  <ul className="matrix-topic-list">
                    {topicList.slice(0, 5).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                    {topicList.length > 5 && (
                      <li className="matrix-topic-more">+{topicList.length - 5} more topics</li>
                    )}
                  </ul>
                ) : (
                  <span className="matrix-fallback">General FBLA competition outline</span>
                )}
              </div>
            );
          })}

          {/* Actions */}
          <div className="matrix-cell matrix-label-footer">Actions</div>
          {selected.map((evt) => (
            <div key={evt.id} className="matrix-cell matrix-action-cell">
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={() => onSelectEvent(evt.id)}
              >
                View Full Details →
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
