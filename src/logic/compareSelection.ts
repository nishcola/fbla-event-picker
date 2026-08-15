import type { FBLAEvent } from '../types';

export function selectedEvents(compareEventIds: string[], events: FBLAEvent[]): FBLAEvent[] {
  return compareEventIds
    .map((id) => events.find((event) => event.id === id))
    .filter((event): event is FBLAEvent => Boolean(event));
}
