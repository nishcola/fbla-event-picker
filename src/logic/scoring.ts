import { events } from '../data/events';
import { INTEREST_THEMES } from '../data/questions';
import type { Answers, FBLAEvent, ResultPart, ScoredResult } from '../types';

const ADVANCED_EVENTS = new Set([
  'advanced-accounting',
  'accounting',
  'business-law',
  'business-plan',
  'computer-problem-solving',
  'cybersecurity',
  'data-analysis',
  'data-science-ai',
  'economics',
  'financial-statement-analysis',
  'network-design',
  'networking-infrastructures',
  'public-speaking',
  'project-management',
  'securities-investments',
  'supply-chain-management',
]);

// Narrow the loose answer store down to the numeric/array fields scoring needs.
function narrowAnswers(answers: Answers) {
  const grade = typeof answers.grade === 'number' ? answers.grade : undefined;
  const interests = Array.isArray(answers.interests) ? answers.interests : [];
  return { grade, interests };
}

// The maximum score any event could earn for a given answer set.
// Percentages are measured against this theoretical maximum, so 100% means
// a true perfect fit and the top 5 naturally spread instead of all reading 100%.
function computeTheoreticalMax(answers: Answers): number {
  const { style, team, prep, speaking, experience } = answers;
  const { grade, interests } = narrowAnswers(answers);
  let max = 0;
  max += style === 'handsOn' ? 28 : 30;
  max += team === 'any' ? 12 : 25;
  max += Math.min(interests.length, 3) * 12;
  max += prep === 'weeks' ? 10 : 20;
  max += speaking === 'ok' ? 8 : 18;
  if (experience === 'first') max += grade !== undefined && grade > 10 ? 8 : 20;
  else if (experience === 'seasoned') max += 22;
  else max += 8;
  return max;
}

// Score one event against the collected answers.
// Returns { event, score, seniorBlocked, parts } where parts is a human-readable
// list of every answer that earned points ({ key, label, points, detail }).
// This is the single source of truth used both for ranking and for the
// "how we calculated this" breakdown on the results page.
export function scoreEvent(
  event: FBLAEvent,
  answers: Answers,
): Omit<ScoredResult, 'percent' | 'rank'> {
  const { style, team, prep, speaking, experience } = answers;
  const { grade, interests } = narrowAnswers(answers);
  const parts: ResultPart[] = [];
  let score = 0;

  // Q1: grade (hard rule)
  if (event.juniorOnly && grade !== undefined && grade > 10) {
    return { event, score: 0, seniorBlocked: true, parts };
  }

  // Q2: competition style
  if (style === 'objective' && event.category === 'objective') {
    score += 30;
    parts.push({ key: 'style', label: 'Competition style', points: 30, detail: 'Objective test events match how you like to compete' });
  } else if (style === 'presentation' && event.category === 'presentation') {
    score += 30;
    parts.push({ key: 'style', label: 'Competition style', points: 30, detail: 'Presentation events match how you like to compete' });
  } else if (style === 'roleplay' && event.category === 'roleplay') {
    score += 30;
    parts.push({ key: 'style', label: 'Competition style', points: 30, detail: 'Role play events match how you like to compete' });
  } else if (style === 'handsOn') {
    if (event.category === 'production' || event.category === 'chapter') {
      score += 28;
      parts.push({ key: 'style', label: 'Competition style', points: 28, detail: 'Hands-on building events match how you like to compete' });
    } else if (event.category === 'presentation') {
      score += 16;
      parts.push({ key: 'style', label: 'Competition style', points: 16, detail: 'Presentation events partially match your hands-on preference' });
    }
  }

  // Q3: team preference
  if (team === 'individual') {
    if (event.format === 'individual') {
      score += 25;
      parts.push({ key: 'team', label: 'Team preference', points: 25, detail: 'Individual event fits your preference to compete alone' });
    } else if (event.format === 'either') {
      score += 12;
      parts.push({ key: 'team', label: 'Team preference', points: 12, detail: 'Works solo or as a team — flexible fit' });
    }
  } else if (team === 'team') {
    if (event.format === 'team' || event.format === 'either') {
      score += 25;
      parts.push({ key: 'team', label: 'Team preference', points: 25, detail: 'Team event fits your preference to work with others' });
    } else {
      score += 4;
      parts.push({ key: 'team', label: 'Team preference', points: 4, detail: 'Individual format — slight mismatch' });
    }
  } else {
    score += 12;
    parts.push({ key: 'team', label: 'Team preference', points: 12, detail: 'No strong preference for solo or team' });
  }

  // Q4: interests (multi-select)
  if (interests.length) {
    const matched = event.interests.filter((t) => interests.includes(t));
    const pts = Math.min(matched.length, 3) * 12;
    if (pts > 0) {
      score += pts;
      const matchedLabels = INTEREST_THEMES.filter((t) => matched.includes(t.value)).map((t) => t.label);
      parts.push({ key: 'interests', label: 'Your interests', points: pts, detail: `Matches ${matchedLabels.length} of your interests${matchedLabels.length ? `: ${matchedLabels.join(', ')}` : ''}` });
    }
  }

  // Q5: prep time
  if (prep === 'light') {
    if (event.category === 'objective') {
      score += 20;
      parts.push({ key: 'prep', label: 'Prep time', points: 20, detail: 'Objective tests suit a light time commitment' });
    } else if (event.category === 'roleplay') {
      score += 10;
      parts.push({ key: 'prep', label: 'Prep time', points: 10, detail: 'Role plays need only light prep' });
    }
  } else if (prep === 'allIn') {
    if (event.category === 'presentation' || event.category === 'chapter' || event.category === 'production') {
      score += 20;
      parts.push({ key: 'prep', label: 'Prep time', points: 20, detail: 'Big-project events reward your all-in commitment' });
    } else if (event.category === 'roleplay') {
      score += 10;
      parts.push({ key: 'prep', label: 'Prep time', points: 10, detail: 'Role plays benefit from extra practice' });
    }
  } else {
    score += 10;
    parts.push({ key: 'prep', label: 'Prep time', points: 10, detail: 'A few weeks of prep fits these events' });
  }

  // Q6: speaking comfort
  if (speaking === 'love') {
    if (event.category === 'presentation' || event.category === 'roleplay') {
      score += 18;
      parts.push({ key: 'speaking', label: 'Presenting', points: 18, detail: 'You love presenting — great fit' });
    }
  } else if (speaking === 'ok') {
    score += 8;
    parts.push({ key: 'speaking', label: 'Presenting', points: 8, detail: 'You are comfortable presenting' });
  } else if (speaking === 'avoid') {
    if (event.category === 'objective') {
      score += 16;
      parts.push({ key: 'speaking', label: 'Presenting', points: 16, detail: 'Objective tests keep presenting to a minimum' });
    }
  }

  // Q7: experience
  if (experience === 'first') {
    if (event.juniorOnly) {
      score += 20;
      parts.push({ key: 'experience', label: 'Experience', points: 20, detail: 'Introductory event — great for a first competition' });
    } else if (event.category === 'objective') {
      score += 8;
      parts.push({ key: 'experience', label: 'Experience', points: 8, detail: 'Objective tests are beginner-friendly' });
    }
  } else if (experience === 'seasoned') {
    if (ADVANCED_EVENTS.has(event.id)) {
      score += 16;
      parts.push({ key: 'experience', label: 'Experience', points: 16, detail: 'Advanced event for an experienced competitor' });
    }
    score += 6;
    parts.push({ key: 'experience', label: 'Experience', points: 6, detail: 'Competition experience is a bonus everywhere' });
  } else {
    score += 8;
    parts.push({ key: 'experience', label: 'Experience', points: 8, detail: 'Some experience — solid fit' });
  }

  return { event, score, seniorBlocked: false, parts };
}

// Build a scored result for every event based on the collected answers.
// Preferred answers boost scores; the grade rule hard-excludes junior-only
// events for upperclassmen. Everything else is soft preference scoring.
export function computeResults(answers: Answers): ScoredResult[] {
  const theoreticalMax = computeTheoreticalMax(answers);

  return events
    .map((event) => scoreEvent(event, answers))
    .filter((r) => !r.seniorBlocked)
    .sort((a, b) => b.score - a.score || a.event.name.localeCompare(b.event.name))
    .map((r, i) => ({
      ...r,
      percent: theoreticalMax > 0 ? Math.round((r.score / theoreticalMax) * 100) : 0,
      rank: i,
    }));
}

export function excludedCount(answers: Answers): number {
  const grade = typeof answers.grade === 'number' ? answers.grade : undefined;
  if (!grade || grade <= 10) return 0;
  return events.filter((e) => e.juniorOnly).length;
}
