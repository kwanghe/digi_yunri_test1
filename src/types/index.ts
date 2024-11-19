export interface MenuItem {
  id: string;
  title: React.ReactNode; // Allow JSX elements
  path: string;
  description: string;
  step: number;
  mobile_title: string; // Allow JSX elements
}

export interface SimulationStep {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
}