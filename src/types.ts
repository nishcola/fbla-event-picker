// Shared domain types for the FBLA Event Picker.

export type Category = 'objective' | 'presentation' | 'roleplay' | 'chapter' | 'production';

export type Format = 'individual' | 'team' | 'either';

export type Cluster =
  | 'marketing-sales'
  | 'digital-tech'
  | 'management-entrepreneurship'
  | 'financial-services'
  | 'arts-design'
  | 'public-safety'
  | 'career-ready'
  | 'hospitality-tourism'
  | 'healthcare'
  | 'supply-chain'
  | 'agriculture'
  | 'education';

export type InterestTag =
  | 'finance'
  | 'business'
  | 'tech'
  | 'marketing'
  | 'design'
  | 'media'
  | 'speaking'
  | 'community'
  | 'health'
  | 'global'
  | 'trades'
  | 'sports';

export interface FBLAEvent {
  id: string;
  name: string;
  category: Category;
  format: Format;
  juniorOnly: boolean;
  interests: InterestTag[];
  clusters: Cluster[];
}

export interface InterestTheme {
  label: string;
  value: InterestTag;
}

export type AnswerValue = number | string | string[];

// Free-form answer store collected by the quiz; scoring narrows the fields it needs.
export type Answers = Record<string, AnswerValue>;

export interface AnswerOption {
  label: string;
  value: string | number;
  hint?: string;
}

export interface Question {
  id: string;
  question: string;
  multi?: boolean;
  options: AnswerOption[];
}

export interface ResultPart {
  key: string;
  label: string;
  points: number;
  detail: string;
}

export interface ScoredResult {
  event: FBLAEvent;
  score: number;
  percent: number;
  rank: number;
  seniorBlocked: boolean;
  parts: ResultPart[];
}

export type Screen = 'home' | 'quiz' | 'results' | 'browse';
