import type { FBLAEvent } from '../types';

// Score how related two events are: shared interests and clusters matter most,
// followed by same category and format. Returns a ranked list excluding the
// source event itself.
function similarity(a: FBLAEvent, b: FBLAEvent): number {
  let score = 0;
  const aInterests = new Set(a.interests);
  const aClusters = new Set(a.clusters);

  for (const interest of b.interests) {
    if (aInterests.has(interest)) score += 1;
  }
  for (const cluster of b.clusters) {
    if (aClusters.has(cluster)) score += 2;
  }
  if (a.category === b.category) score += 1;
  if (a.format === b.format) score += 1;
  return score;
}

export function findSimilar(
  event: FBLAEvent,
  all: FBLAEvent[],
  limit = 4,
): FBLAEvent[] {
  return all
    .filter((candidate) => candidate.id !== event.id)
    .map((candidate) => ({ candidate, score: similarity(event, candidate) }))
    .filter(({ score }) => score > 0)
    .sort(
      (x, y) =>
        y.score - x.score || x.candidate.name.localeCompare(y.candidate.name),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
