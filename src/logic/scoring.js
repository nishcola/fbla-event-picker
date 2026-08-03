import { events } from '../data/events.js';

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

// The maximum score any event could earn for a given answer set.
// Percentages are measured against this theoretical maximum, so 100% means
// a true perfect fit and the top 5 naturally spread instead of all reading 100%.
function computeTheoreticalMax(answers) {
  const { style, team, interests = [], prep, speaking, experience, grade } = answers;
  let max = 0;
  max += style === 'handsOn' ? 28 : 30;
  max += team === 'any' ? 12 : 25;
  max += Math.min(interests.length, 3) * 12;
  max += prep === 'weeks' ? 10 : 20;
  max += speaking === 'ok' ? 8 : 18;
  if (experience === 'first') max += grade > 10 ? 8 : 20;
  else if (experience === 'seasoned') max += 22;
  else max += 8;
  return max;
}

// Build a scored result for every event based on the collected answers.
// Preferred answers boost scores; the grade rule hard-excludes junior-only
// events for upperclassmen. Everything else is soft preference scoring.
export function computeResults(answers) {
  const theoreticalMax = computeTheoreticalMax(answers);

  return events
    .map((event) => {
      let score = 0;

      // Q1: grade (hard rule)
      const grade = answers.grade;
      if (event.juniorOnly && grade > 10) {
        return { event, score: 0, seniorBlocked: true };
      }

      // Q2: competition style
      const style = answers.style;
      if (style === 'objective' && event.category === 'objective') score += 30;
      if (style === 'presentation' && event.category === 'presentation') score += 30;
      if (style === 'roleplay' && event.category === 'roleplay') score += 30;
      if (style === 'handsOn') {
        if (event.category === 'production' || event.category === 'chapter') score += 28;
        else if (event.category === 'presentation') score += 16;
      }

      // Q3: team preference
      const team = answers.team;
      if (team === 'individual') {
        if (event.format === 'individual') score += 25;
        else if (event.format === 'either') score += 12;
      } else if (team === 'team') {
        if (event.format === 'team' || event.format === 'either') score += 25;
        else score += 4;
      } else {
        score += 12;
      }

      // Q4: interests (multi-select)
      const themes = answers.interests || [];
      if (themes.length) {
        const matches = event.interests.filter((t) => themes.includes(t)).length;
        score += Math.min(matches, 3) * 12;
      }

      // Q5: prep time
      const prep = answers.prep;
      if (prep === 'light') {
        if (event.category === 'objective') score += 20;
        else if (event.category === 'roleplay') score += 10;
      } else if (prep === 'allIn') {
        if (event.category === 'presentation' || event.category === 'chapter' || event.category === 'production') score += 20;
        else if (event.category === 'roleplay') score += 10;
      } else {
        score += 10;
      }

      // Q6: speaking comfort
      const speaking = answers.speaking;
      if (speaking === 'love') {
        if (event.category === 'presentation' || event.category === 'roleplay') score += 18;
      } else if (speaking === 'ok') {
        score += 8;
      } else if (speaking === 'avoid') {
        if (event.category === 'objective') score += 16;
      }

      // Q7: experience
      const experience = answers.experience;
      if (experience === 'first') {
        if (event.juniorOnly) score += 20;
        else if (event.category === 'objective') score += 8;
      } else if (experience === 'seasoned') {
        if (ADVANCED_EVENTS.has(event.id)) score += 16;
        score += 6;
      } else {
        score += 8;
      }

      return { event, score, senior: false };
    })
    .filter((r) => !r.senior)
    .sort((a, b) => b.score - a.score || a.event.name.localeCompare(b.event.name))
    .map((r, i) => ({
      ...r,
      percent: theoreticalMax > 0 ? Math.round((r.score / theoreticalMax) * 100) : 0,
      rank: i,
    }));
}

export function excludedCount(answers) {
  const grade = answers.grade;
  if (!grade || grade <= 10) return 0;
  return events.filter((e) => e.juniorOnly).length;
}