import type { InterestTheme, Question } from '../types';

// Interview-style questionnaire: one question at a time.
// Values are consumed by scoring to compute each event's fit score.

export const INTEREST_THEMES: InterestTheme[] = [
  { label: 'Money & finance', value: 'finance' },
  { label: 'Business & leadership', value: 'business' },
  { label: 'Technology & coding', value: 'tech' },
  { label: 'Marketing & sales', value: 'marketing' },
  { label: 'Design & media', value: 'design' },
  { label: 'Media & journalism', value: 'media' },
  { label: 'Speaking & leadership', value: 'speaking' },
  { label: 'Community & government', value: 'community' },
  { label: 'Healthcare', value: 'health' },
  { label: 'Global trade & logistics', value: 'global' },
  { label: 'Trades & skilled labor', value: 'trades' },
  { label: 'Sports & events', value: 'sports' },
];

export const questions: Question[] = [
  {
    id: 'grade',
    question: 'First, what grade are you in?',
    options: [
      { label: '9th grade', value: 9 },
      { label: '10th grade', value: 10 },
      { label: '11th grade', value: 11 },
      { label: '12th grade', value: 12 },
    ],
  },
  {
    id: 'style',
    question: 'How do you like to compete?',
    options: [
      { label: 'Multiple-choice tests', value: 'objective', hint: 'Study a topic, take a written test' },
      { label: 'Presentations & speaking', value: 'presentation', hint: 'Prepare a speech or project you present' },
      { label: 'On-the-spot role play', value: 'roleplay', hint: 'React to a scenario you get at the event' },
      { label: 'Hands-on building & projects', value: 'handsOn', hint: 'Build apps, videos, or chapter projects' },
    ],
  },
  {
    id: 'team',
    question: 'Do you prefer to work alone or with a team?',
    options: [
      { label: 'By myself', value: 'individual' },
      { label: 'With a partner or team', value: 'team' },
      { label: 'No preference', value: 'any' },
    ],
  },
  {
    id: 'interests',
    question: 'What are you most interested in? (pick as many as you like)',
    multi: true,
    options: INTEREST_THEMES.map((t) => ({ ...t, value: t.value })),
  },
  {
    id: 'prep',
    question: 'How much time can you commit to preparing?',
    options: [
      { label: 'Keep it light', value: 'light' },
      { label: 'A few weeks of prep', value: 'weeks' },
      { label: 'I will go all in', value: 'allIn' },
    ],
  },
  {
    id: 'speaking',
    question: 'How do you feel about presenting in front of people?',
    options: [
      { label: 'I love it', value: 'love' },
      { label: 'I\'m fine with it', value: 'ok' },
      { label: 'I\'d rather not', value: 'avoid' },
    ],
  },
  {
    id: 'experience',
    question: 'How much FBLA competition experience do you have?',
    options: [
      { label: 'This would be my first time', value: 'first' },
      { label: 'I\'ve competed a little', value: 'some' },
      { label: 'I\'m a seasoned competitor', value: 'seasoned' },
    ],
  },
];