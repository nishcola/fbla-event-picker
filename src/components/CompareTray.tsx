import type { FBLAEvent } from '../types';
import { selectedEvents } from '../logic/compareSelection';
import './CompareTray.css';

interface CompareTrayProps {
  compareEventIds: string[];
  events: FBLAEvent[];
  onCompare: () => void;
  onToggleCompare: (eventId: string) => void;
  onClearCompare: () => void;
}

export default function CompareTray({
  compareEventIds,
  events,
  onCompare,
  onToggleCompare,
  onClearCompare,
}: CompareTrayProps) {
  if (compareEventIds.length === 0) return null;

  const selected = selectedEvents(compareEventIds, events);

  return (
    <aside className="compare-tray" aria-label="Selected events comparison tray">
      <div className="compare-tray-inner">
        <div className="compare-tray-head">
          <span className="compare-tray-title">
            Comparing <strong className="compare-tray-count">{selected.length}/3</strong> events
          </span>
          <button
            type="button"
            className="compare-tray-clear"
            onClick={onClearCompare}
            title="Clear all selected events"
          >
            Clear all
          </button>
        </div>

        <div className="compare-tray-chips">
          {selected.map((evt) => (
            <span key={evt.id} className="compare-chip">
              <span className="compare-chip-name">{evt.name}</span>
              <button
                type="button"
                className="compare-chip-remove"
                onClick={() => onToggleCompare(evt.id)}
                aria-label={`Remove ${evt.name} from comparison`}
              >
                ×
              </button>
            </span>
          ))}
          {selected.length < 3 && (
            <span className="compare-chip-placeholder">
              + Add {3 - selected.length} more
            </span>
          )}
        </div>

        <div className="compare-tray-actions">
          <button
            type="button"
            className="compare-tray-btn"
            onClick={onCompare}
          >
            Compare Side-by-Side →
          </button>
        </div>
      </div>
    </aside>
  );
}
