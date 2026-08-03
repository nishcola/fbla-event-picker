import type { Answers, Screen } from '../types';

export interface AppState {
  screen: Screen;
  answers: Answers;
  grade: number | null;
  selectedEventId: string | null;
  /** Screen to return to when leaving the detail screen (browse or results). */
  detailOrigin: 'browse' | 'results';
}

export type AppAction =
  | { type: 'SET_GRADE'; grade: number }
  | { type: 'START_QUIZ' }
  | { type: 'FINISH_QUIZ'; answers: Answers }
  | { type: 'RESTORE_SESSION'; answers: Answers }
  | { type: 'GO_BROWSE' }
  | { type: 'GO_DETAIL'; eventId: string }
  | { type: 'GO_BACK' }
  | { type: 'GO_HOME' };

export const initialState: AppState = {
  screen: 'home',
  answers: {},
  grade: null,
  selectedEventId: null,
  detailOrigin: 'browse',
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
        selectedEventId: null,
        detailOrigin: 'browse',
      };
    case 'GO_BROWSE':
      return { ...state, screen: 'browse' };
    case 'GO_DETAIL':
      // Remember where the user came from. When hopping between similar
      // events while already on the detail screen, keep the original origin.
      return {
        ...state,
        screen: 'detail',
        selectedEventId: action.eventId,
        detailOrigin:
          state.screen === 'detail'
            ? state.detailOrigin
            : state.screen === 'results'
              ? 'results'
              : 'browse',
      };
    case 'GO_BACK':
      return { ...state, screen: state.detailOrigin, selectedEventId: null };
    case 'GO_HOME':
      return {
        ...state,
        screen: 'home',
        answers: {},
        grade: null,
        selectedEventId: null,
        detailOrigin: 'browse',
      };
  }
}
