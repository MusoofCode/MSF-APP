
export type AppStep = 
  | 'onboarding' 
  | 'upload' 
  | 'scanning'
  | 'clothing' 
  | 'background' 
  | 'photoshoot' 
  | 'expression' 
  | 'generating' 
  | 'result';

export interface SelectionOption {
  id: string;
  name: string;
  image: string;
  promptSnippet: string;
  badge?: string;
}

export interface UserSelections {
  clothing: SelectionOption | null;
  background: SelectionOption | null;
  photoshoot: SelectionOption | null;
  expression: SelectionOption | null;
}

export interface OnboardingSlide {
  title: string;
  description: string;
  image: string;
}
