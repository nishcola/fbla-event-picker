import { useEffect, useState, type Dispatch, type KeyboardEvent, type SetStateAction } from 'react';
import './Browse.css';
import { events, CATEGORY_LABELS, FORMAT_LABELS, CLUSTER_LABELS } from '../data/events';
import { descriptions } from '../data/descriptions';
import EventDescription from './EventDescription';
import { CheckIcon } from './icons';

const CATEGORY_OPTIONS = [
  { value: 'objective', label: 'Objective Tests', hint: 'Multiple-choice tests on a business topic, scored for accuracy' },
  { value: 'presentation', label: 'Presentation Events', hint: 'Prepare a presentation, speech, or project to deliver to judges' },
  { value: 'roleplay', label: 'Role Play Events', hint: 'React on the spot to a business scenario you get at the event' },
  { value: 'chapter', label: 'Chapter Events', hint: 'Chapter-wide projects your team completes together' },
  { value: 'production', label: 'Production Events', hint: 'Create and submit a product like an app, video, or website' },
];

const FORMAT_OPTIONS = [
  { value: 'individual', label: 'Individual' },
  { value: 'either', label: 'Individual or Team' },
  { value: 'team', label: 'Team' },
];

const CLUSTER_OPTIONS = Object.entries(CLUSTER_LABELS).map(([value, label]) => ({
  value,
  label,
}));

interface FilterOption {
  value: string;
  label: string;
  hint?: string;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  open: boolean;
  onToggleOpen: () => void;
}

function FilterGroup({ title, options, selected, onToggle, open, onToggleOpen }: FilterGroupProps) {
  return (
    <div className={`filter-group ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="filter-title"
        onClick={onToggleOpen}
        aria-expanded={open}
      >
        <span>{title}</span>
        <svg
          className="filter-chevron"
          width="14"
          height="14"
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
      </button>
      {open && (
        <div className="filter-items">
          {options.map((opt) => {
            const active = selected.has(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                className={`filter-item ${active ? 'active' : ''}`}
                onClick={() => onToggle(opt.value)}
                aria-pressed={active}
              >
                <span className="filter-check">
                  <CheckIcon />
                </span>
                <span className="filter-label">{opt.label}</span>
                {opt.hint && (
                  <>
                    <span className="filter-item-hint">
                      <svg
                        className="filter-hint-icon"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                    </span>
                    <span className="filter-tooltip" role="tooltip">
                      {opt.hint}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface BrowseProps {
  grade: number | null;
  onQuiz: () => void;
  onSelectEvent: (eventId: string) => void;
  compareEventIds?: string[];
  onToggleCompare?: (eventId: string) => void;
}

function Browse({ grade, onQuiz, onSelectEvent, compareEventIds = [], onToggleCompare }: BrowseProps) {

  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(() => new Set());
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(() => new Set());
  const [selectedClusters, setSelectedClusters] = useState<Set<string>>(() => new Set());
  const [openGroups, setOpenGroups] = useState({ category: true, format: true, cluster: true });

  // Collapse the sidebar groups into accordions on small screens.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const sync = () => setOpenGroups({ category: !mq.matches, format: !mq.matches, cluster: !mq.matches });
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const juniorAllowed = !grade || grade <= 10;
  const queryNorm = query.trim().toLowerCase();
  const hasFilters =
    selectedCategories.size > 0 || selectedFormats.size > 0 || selectedClusters.size > 0;

  const toggleSet = (setter: Dispatch<SetStateAction<Set<string>>>) => (value: string) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedFormats(new Set());
    setSelectedClusters(new Set());
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>, eventId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectEvent(eventId);
    }
  };

  const visible = events.filter((event) => {
    if (event.juniorOnly && !juniorAllowed) return false;
    if (selectedCategories.size > 0 && !selectedCategories.has(event.category)) return false;
    if (selectedFormats.size > 0 && !selectedFormats.has(event.format)) return false;
    if (selectedClusters.size > 0 && !event.clusters.some((c) => selectedClusters.has(c))) return false;
    if (queryNorm) {
      const desc = descriptions[event.id] || '';
      const haystack = `${event.name} ${desc}`.toLowerCase();
      if (!haystack.includes(queryNorm)) return false;
    }
    return true;
  });

  return (
    <div className="browse">
      <div className="browse-head">
        <p className="kicker kicker-navy">All {events.length} events</p>
        <h2>Browse every FBLA event</h2>
        <p className="browse-sub">
          {juniorAllowed
            ? 'Filter by category, event type, or career cluster, or search for a topic.'
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
      </div>

      <div className="browse-layout">
        <aside className="browse-sidebar" aria-label="Filters">
          <FilterGroup
            title="Event Category"
            options={CATEGORY_OPTIONS}
            selected={selectedCategories}
            onToggle={toggleSet(setSelectedCategories)}
            open={openGroups.category}
            onToggleOpen={() => setOpenGroups((g) => ({ ...g, category: !g.category }))}
          />
          <FilterGroup
            title="Event Type"
            options={FORMAT_OPTIONS}
            selected={selectedFormats}
            onToggle={toggleSet(setSelectedFormats)}
            open={openGroups.format}
            onToggleOpen={() => setOpenGroups((g) => ({ ...g, format: !g.format }))}
          />
          <FilterGroup
            title="Career Cluster"
            options={CLUSTER_OPTIONS}
            selected={selectedClusters}
            onToggle={toggleSet(setSelectedClusters)}
            open={openGroups.cluster}
            onToggleOpen={() => setOpenGroups((g) => ({ ...g, cluster: !g.cluster }))}
          />
          {hasFilters && (
            <button type="button" className="filter-clear" onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </aside>

        <div className="browse-results">
          <p className="browse-meta">
            Showing {visible.length} of {events.length} events
          </p>

          {visible.length === 0 ? (
            <p className="browse-empty">No events match your search.</p>
          ) : (
            <div className="event-list">
              {visible.map((event) => {
                const isCompared = compareEventIds.includes(event.id);
                return (
                  <article
                    key={event.id}
                    className={`event-card ${isCompared ? 'in-compare' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${event.name}`}
                    onClick={() => onSelectEvent(event.id)}
                    onKeyDown={(e) => handleCardKeyDown(e, event.id)}
                  >
                    <div className="event-card-head">
                      <h3 className="event-name">{event.name}</h3>
                      {onToggleCompare && (
                        <button
                          type="button"
                          className={`btn-card-compare ${isCompared ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(event.id);
                          }}
                          aria-label={isCompared ? `Remove ${event.name} from comparison` : `Add ${event.name} to comparison`}
                        >
                          {isCompared ? '✓ Comparing' : '+ Compare'}
                        </button>
                      )}
                    </div>
                    {descriptions[event.id] && (
                      <EventDescription text={descriptions[event.id]} clampLines={3} />
                    )}
                    <div className="event-badges">
                      <span className="badge">{CATEGORY_LABELS[event.category]}</span>
                      <span className="badge">{FORMAT_LABELS[event.format]}</span>
                      {event.juniorOnly && <span className="badge junior">9th-10th grade</span>}
                    </div>
                  </article>
                );
              })}

            </div>
          )}
        </div>
      </div>

      <div className="browse-cta">
        <button type="button" className="btn-secondary" onClick={onQuiz}>
          Not sure? Take the quiz
        </button>
      </div>
    </div>
  );
}

export default Browse;
