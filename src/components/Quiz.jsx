import { useState } from 'react';
import { questions } from '../data/questions';
import Question from './Question';

function Quiz({ onFinish, initialAnswers = {} }) {
  const [index, setIndex] = useState(initialAnswers.grade ? 1 : 0);
  const [answers, setAnswers] = useState(initialAnswers);

  const question = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleConfirm = () => {
    if (index === questions.length - 1) {
      onFinish(answers);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  return (
    <div className="quiz">
      <div className="progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-row">
          <p className="progress-label">
            Question {index + 1} of {questions.length}
          </p>
          <span className="progress-pct">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="fade-in" key={question.id}>
        {index > 0 && (
          <button type="button" className="btn-back" onClick={handleBack}>
            ← Back
          </button>
        )}
        <Question
          question={question}
          value={answers[question.id]}
          onChange={handleChange}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}

export default Quiz;