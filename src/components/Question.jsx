function Question({ question, value, onChange, onConfirm }) {
  const isMulti = !!question.multi;
  const selected = isMulti ? value || [] : value;
  const canContinue = isMulti ? selected.length > 0 : selected != null;

  const toggle = (optValue) => {
    if (!isMulti) {
      onChange(question.id, optValue);
      onConfirm();
      return;
    }
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
          const active = isMulti ? selected.includes(opt.value) : selected === opt.value;
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