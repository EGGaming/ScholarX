export type Illustration = 'not-found' | 'education' | 'error' | 'location' | 'no-assignments';

export interface IllustrationProps {
  type: Illustration;
}
