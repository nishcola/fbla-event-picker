import type { Answers, Screen } from '../types';

export interface AppState {
  screen: Screen;
  answers: Answers;
  grade: number | null;
}

export type AppAction =
  | { type: 'SET_GRADE'; grade: number }
  | { type: 'START_QUIZ' }
  | { type: 'FINISH_QUIZ'; answers: Answers }
  | { type: 'RESTORE_SESSION'; answers: Answers }
  | { type: 'GO_BROWSE' }
  | { type: 'GO_HOME' };

export const initialState: AppState = {
  screen: 'home',
  answers: {},
  grade: null,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_GRADE':
      return { ...state, grade: action.grade };
    case 'START_QUIZ':
      return {
        ...state,
        screen: 'quiz',
        answers: state.grade ? { grade: state.grade } : {},
      };
    case 'FINISH_QUIZ':
      return { ...state, screen: 'results', answers: action.answers };
    case 'RESTORE_SESSION':
      return {
        screen: 'results',
        answers: action.answers,
        grade: typeof action.answers.grade === 'number' ? action.answers.grade : state.grade,
      };
    case 'GO_BROWSE':
      return { ...state, screen: 'browse' };
    case 'GO_HOME':
      return { ...state, screen: 'home', answers: {}, grade: null };
  }
}
