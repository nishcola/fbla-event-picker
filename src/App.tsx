import { useEffect, useReducer, useState } from 'react';
import './App.css';
import { questions } from './data/questions';
import { events } from './data/events';
import { computeResults } from './logic/scoring';
import { appReducer, initialState } from './logic/appReducer';
import { clearSession, loadSession, saveSession, type SavedSession } from './logic/session';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Browse from './components/Browse';
import { ArrowRight, HomeIcon } from './components/icons';
import type { Answers } from './types';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { screen, answers, grade } = state;
  const [resumable, setResumable] = useState<SavedSession | null>(() => loadSession());

  const isLanding = screen === 'home';

  // Persist the session whenever the results screen is shown, so a page
  // refresh can offer to restore it.
  useEffect(() => {
    if (screen === 'results') {
      saveSession(answers);
      setResumable({ answers, savedAt: Date.now() });
    }
  }, [screen, answers]);

  const handleFinish = (finalAnswers: Answers) => {
    dispatch({ type: 'FINISH_QUIZ', answers: finalAnswers });
  };

  const handleHome = () => {
    dispatch({ type: 'GO_HOME' });
  };

  const startQuiz = () => {
    dispatch({ type: 'START_QUIZ' });
  };

  const handleResume = () => {
    if (!resumable) return;
    dispatch({ type: 'RESTORE_SESSION', answers: resumable.answers });
  };

  const handleClearHistory = () => {
    clearSession();
    setResumable(null);
  };

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
              <img
                src="/fbla-logo.png"
                alt="Future Business Leaders of America (FBLA)"
                className="landing-logo"
              />
              <h1 id="landing-title" className="landing-title">
                FBLA Event Picker
              </h1>
              <p className="landing-sub">Find events that match your interests and skills</p>

              {resumable && (
                <div className="resume-banner" role="status">
                  <span className="resume-banner-text">
                    You have saved results from an earlier session.
                  </span>
                  <span className="resume-banner-actions">
                    <button type="button" className="resume-btn" onClick={handleResume}>
                      View results
                    </button>
                    <button
                      type="button"
                      className="resume-dismiss"
                      onClick={() => setResumable(null)}
                    >
                      Dismiss
                    </button>
                  </span>
                </div>
              )}

              <div className="level-pick">
                <p className="section-label">Select your grade level</p>
                <div className="segmented" role="group" aria-label="Grade level">
                  <button
                    type="button"
                    className={`seg-btn ${grade === 10 ? 'active' : ''}`}
                    onClick={() => dispatch({ type: 'SET_GRADE', grade: 10 })}
                    aria-pressed={grade === 10}
                  >
                    9th &amp; 10th Grade
                  </button>
                  <button
                    type="button"
                    className={`seg-btn ${grade === 11 ? 'active' : ''}`}
                    onClick={() => dispatch({ type: 'SET_GRADE', grade: 11 })}
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
                  onClick={() => dispatch({ type: 'GO_BROWSE' })}
                >
                  <span className="option-label">Option 2</span>
                  <span className="option-title-row">
                    <span className="option-title">Browse All Events</span>
                    <ArrowRight />
                  </span>
                  <span className="option-desc">
                    See all {events.length} FBLA events and filter by category
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
          <Results
            results={computeResults(answers)}
            answers={answers}
            onRestart={handleHome}
            onClearHistory={resumable ? handleClearHistory : undefined}
          />
        )}

        {screen === 'browse' && (
          <Browse grade={grade} onQuiz={startQuiz} />
        )}
      </main>
    </div>
  );
}

export default App;
