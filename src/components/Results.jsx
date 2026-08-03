import { CATEGORY_LABELS, FORMAT_LABELS } from '../data/events';
import { descriptions } from '../data/descriptions';
import { INTEREST_THEMES } from '../data/questions';
import { excludedCount } from '../logic/scoring';
import EventDescription from './EventDescription';

function ResultCard({ result, position }) {
  const { event, percent } = result;
  const matchedThemes = INTEREST_THEMES.filter((t) => event.interests.includes(t.value));

  return (
    <article className="result-card">
      <div className="rank-circle">{position + 1}</div>
      <div className="result-body">
        <h3 className="result-name">{event.name}</h3>
        {descriptions[event.id] && (
          <EventDescription text={descriptions[event.id]} clampLines={2} />
        )}
        <div className="result-meta">
          <span className="badge">{CATEGORY_LABELS[event.category]}</span>
          <span className="badge">{FORMAT_LABELS[event.format]}</span>
          {event.juniorOnly && <span className="badge junior">9th-10th grade</span>}
        </div>
        <div className="result-interests">
          {matchedThemes.map((t) => (
            <span key={t.value} className="chip">
              {t.label}
            </span>
          ))}
        </div>
      </div>
      <div className="match">
        <span className="match-pct">{percent}%</span>
        <div className="match-track">
          <div className="match-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="match-label">match</span>
      </div>
    </article>
  );
}

function Results({ results, answers, onRestart }) {
  const top = results.slice(0, 5);
  const excluded = excludedCount(answers);

  return (
    <div className="results">
      <div className="results-head">
        <p className="kicker kicker-navy">All done</p>
        <h2>Your top 5 events</h2>
        <p className="results-sub">
          Built from your answers, ranked by fit. Click start over to try again.
        </p>
      </div>
      {excluded > 0 && (
        <p className="results-note">
          {excluded} introduction-level event{excluded === 1 ? ' is' : 's are'} for 9th &amp; 10th
          graders and weren&apos;t included.
        </p>
      )}

      <div className="results-list">
        {top.map((r, i) => (
          <ResultCard key={r.event.id} result={r} position={i} />
        ))}
      </div>

      <div className="results-actions">
        <button type="button" className="btn-secondary" onClick={onRestart}>
          Start over
        </button>
      </div>
    </div>
  );
}

export default Results;