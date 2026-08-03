import { CATEGORY_LABELS, FORMAT_LABELS } from '../data/events';
import './Results.css';
import { descriptions } from '../data/descriptions';
import { INTEREST_THEMES } from '../data/questions';
import { excludedCount } from '../logic/scoring';
import EventDescription from './EventDescription';
import type { Answers, ScoredResult } from '../types';

interface ResultCardProps {
  result: ScoredResult;
  position: number;
}

function ResultCard({ result, position }: ResultCardProps) {
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

function BreakdownCard({ result }: { result: ScoredResult }) {
  const { event, percent, score, parts } = result;

  return (
    <div className="breakdown-card">
      <div className="breakdown-card-head">
        <span className="breakdown-name">{event.name}</span>
        <span className="breakdown-score">
          {score} pts · {percent}% match
        </span>
      </div>
      {parts.length === 0 ? (
        <p className="breakdown-empty">No strong matches with your answers — a softer fit.</p>
      ) : (
        <ul className="breakdown-parts">
          {parts.map((p) => (
            <li key={p.key} className="breakdown-part">
              <span className="breakdown-part-label">{p.label}</span>
              <span className="breakdown-part-detail">{p.detail}</span>
              <span className="breakdown-part-points">+{p.points}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface ResultsProps {
  results: ScoredResult[];
  answers: Answers;
  onRestart: () => void;
  onClearHistory?: () => void;
}

function Results({ results, answers, onRestart, onClearHistory }: ResultsProps) {
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

      <details className="breakdown">
        <summary className="breakdown-summary">
          <span>How your results were calculated</span>
          <svg
            className="breakdown-chevron"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="breakdown-body">
          <p className="breakdown-intro">
            Every event starts at 0 points and earns points for each answer it matches.
            Your top 5 are ranked by total points; the match % compares each event&apos;s
            points to the best possible score for your answers.
          </p>
          <div className="breakdown-list">
            {top.map((r) => (
              <BreakdownCard key={r.event.id} result={r} />
            ))}
          </div>
        </div>
      </details>

      <div className="results-actions">
        <button type="button" className="btn-secondary" onClick={onRestart}>
          Start over
        </button>
        {onClearHistory && (
          <button type="button" className="results-clear" onClick={onClearHistory}>
            Clear saved history
          </button>
        )}
      </div>
    </div>
  );
}

export default Results;
