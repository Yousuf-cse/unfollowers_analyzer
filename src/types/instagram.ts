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
}

export interface UserListProps {
  users: string[];
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
