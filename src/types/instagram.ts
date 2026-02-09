export interface AnalysisData {
  notFollowingBack: string[];
  mutuals: string[];
  youDontFollow: string[];
}

export interface WelcomeSlideProps {
  onNext: () => void;
}

export interface UploadSlideProps {
  onBack: () => void;
  onFileSelect: (file: File) => void;
  error: string;
}

export interface ResultsSlideProps {
  data: AnalysisData;
  onReset: () => void;

  startGuidedMode: (users: string[]) => void;
  nextGuidedProfile: () => void;
  stopGuidedMode: () => void;

  guidedActive: boolean;
  guidedIndex: number;
  guidedTotal: number;
  visited: Set<string>;
}

export interface UserListProps {
  users: string[];
  visited: Set<string>;
}

export interface NavigationDotsProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
}

export interface TabData {
  label: string;
  data: string[];
}
