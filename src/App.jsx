import { useState } from 'react';
import { questions } from './data/questions';
import { computeResults } from './logic/scoring';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Browse from './components/Browse';

function ArrowRight() {
  return (
    <svg
      className="option-arrow"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      className="home-icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

function App() {
  const [screen, setScreen] = useState('home');
  const [answers, setAnswers] = useState({});
  const [grade, setGrade] = useState(null);

  const handleFinish = (finalAnswers) => {
    setAnswers(finalAnswers);
    setScreen('results');
  };

  const handleHome = () => {
    setAnswers({});
    setGrade(null);
    setScreen('home');
  };

  const startQuiz = () => {
    setAnswers(grade ? { grade } : {});
    setScreen('quiz');
  };

  const isLanding = screen === 'home';

  return (
    <div className="app">
      {!isLanding && (
        <header className="app-header">
          <div className="header-inner">
            <img
              src="/fbla-logo.png"
              alt="Future Business Leaders of America (FBLA)"
              className="header-logo"
            />
            <span className="header-title">Event Picker</span>
            <button type="button" className="btn-home" onClick={handleHome}>
              <HomeIcon />
              Home
            </button>
          </div>
        </header>
      )}

      <main className={`app-main ${isLanding ? 'app-main-landing' : ''}`}>
        {!isLanding && <div className="screen-glow" aria-hidden="true" />}

        {isLanding && (
          <section className="landing" aria-labelledby="landing-title">
            <div className="landing-glow" aria-hidden="true" />
            <div className="landing-inner">
              <h1 id="landing-title" className="landing-title">
                FBLA Event Picker
              </h1>
              <p className="landing-sub">Find events that match your interests and skills</p>

              <div className="level-pick">
                <p className="section-label">Select your grade level</p>
                <div className="segmented" role="group" aria-label="Grade level">
                  <button
                    type="button"
                    className={`seg-btn ${grade === 10 ? 'active' : ''}`}
                    onClick={() => setGrade(10)}
                    aria-pressed={grade === 10}
                  >
                    9th &amp; 10th Grade
                  </button>
                  <button
                    type="button"
                    className={`seg-btn ${grade === 11 ? 'active' : ''}`}
                    onClick={() => setGrade(11)}
                    aria-pressed={grade === 11}
                  >
                    11th &amp; 12th Grade
                  </button>
                </div>
              </div>

              <div className="option-cards">
                <button
                  type="button"
                  className="option-card"
                  disabled={!grade}
                  onClick={startQuiz}
                >
                  <span className="option-label">Option 1</span>
                  <span className="option-title-row">
                    <span className="option-title">Take the Quiz</span>
                    <ArrowRight />
                  </span>
                  <span className="option-desc">
                    Answer {questions.length} questions and get your top 5 event recommendations
                  </span>
                </button>
                <button
                  type="button"
                  className="option-card"
                  disabled={!grade}
                  onClick={() => setScreen('browse')}
                >
                  <span className="option-label">Option 2</span>
                  <span className="option-title-row">
                    <span className="option-title">Browse All Events</span>
                    <ArrowRight />
                  </span>
                  <span className="option-desc">
                    See all {`76`} FBLA events and filter by category
                  </span>
                </button>
              </div>

              <p className="landing-helper">
                {grade ? 'Choose an option to continue' : 'Select a grade level to continue'}
              </p>
            </div>
          </section>
        )}

        {screen === 'quiz' && (
          <Quiz onFinish={handleFinish} initialAnswers={grade ? { grade } : {}} />
        )}

        {screen === 'results' && (
          <Results results={computeResults(answers)} answers={answers} onRestart={handleHome} />
        )}

        {screen === 'browse' && (
          <Browse grade={grade} onBack={handleHome} onQuiz={startQuiz} />
        )}
      </main>
    </div>
  );
}

export default App;