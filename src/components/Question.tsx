import type { AnswerValue, Question } from '../types';

interface QuestionProps {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (id: string, value: AnswerValue) => void;
  onConfirm: () => void;
}

function Question({ question, value, onChange, onConfirm }: QuestionProps) {
  const isMulti = !!question.multi;
  // Array.isArray narrows the answer store value to string[] — multi-select
  // answers are always arrays of string option values in this app.
  const selected = isMulti ? (Array.isArray(value) ? value : []) : [];
  const canContinue = isMulti ? selected.length > 0 : value != null;

  const toggle = (optValue: string | number) => {
    if (!isMulti) {
      onChange(question.id, optValue);
      onConfirm();
      return;
    }
    if (typeof optValue !== 'string') return; // multi-select option values are strings
    const next = selected.includes(optValue)
      ? selected.filter((v) => v !== optValue)
      : [...selected, optValue];
    onChange(question.id, next);
  };

  return (
    <div className="question">
      <p className="question-text">{question.question}</p>
      <div className="options">
        {question.options.map((opt) => {
          const active = isMulti
            ? typeof opt.value === 'string' && selected.includes(opt.value)
            : value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              className={`option ${active ? 'active' : ''}`}
              onClick={() => toggle(opt.value)}
            >
              <span className={`option-text${opt.hint ? ' option-text-bold' : ''}`}>
                {opt.label}
              </span>
              {opt.hint && <span className="option-hint">{opt.hint}</span>}
            </button>
          );
        })}
      </div>
      <div className="question-footer">
        {isMulti && (
          <button
            type="button"
            disabled={!canContinue}
            className="btn-continue"
            onClick={onConfirm}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default Question;
