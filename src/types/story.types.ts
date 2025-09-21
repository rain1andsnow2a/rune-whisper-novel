export interface Character {
  id: string;
  name: string;
  englishName: string;
  role: string;
  background: string;
  personality: string;
  appearance: string;
  imagePrompt: string;
}

export interface Chapter {
  id: number;
  title: string;
  englishTitle: string;
  act: number;
  actTitle: string;
  content: StorySection[];
}

export interface StorySection {
  type: 'narrative' | 'dialogue' | 'action' | 'description';
  content: string;
  characterId?: string;
  className?: string;
  interactive?: boolean;
  interactionPrompt?: string;
}

export interface ReadingProgress {
  chapterId: number;
  sectionIndex: number;
  lastRead: Date;
}