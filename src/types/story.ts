// 故事数据结构和类型定义

export interface Character {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  traits: string[];
  relationships: Record<string, number>; // 与其他角色的关系值
}

export interface Choice {
  id: string;
  text: string;
  nextStoryId: string;
  requirements?: {
    items?: string[];
    knowledge?: string[];
    traits?: string[];
    relationships?: Record<string, number>;
  };
  consequences?: {
    addItems?: string[];
    addKnowledge?: string[];
    changeRelationships?: Record<string, number>;
    changeTraits?: string[];
  };
  style?: 'normal' | 'danger' | 'magic' | 'wisdom';
}

export interface StorySegment {
  id: string;
  title?: string;
  content: string;
  narrator?: string; // 'elian' | 'system' | 'character:name'
  background?: string;
  music?: string;
  choices: Choice[];
  autoAdvance?: {
    delay: number;
    nextStoryId: string;
  };
  effects?: {
    type: 'magic' | 'discovery' | 'danger' | 'emotion';
    intensity: number;
  };
}

export interface GameState {
  currentStoryId: string;
  visitedStories: Set<string>;
  inventory: string[];
  knowledge: string[];
  relationships: Record<string, number>;
  traits: string[];
  chapter: number;
  timelineProgress: number;
}

export interface SaveData {
  gameState: GameState;
  timestamp: number;
  playername?: string;
}

export type StoryTheme = 'ancient' | 'forest' | 'academy' | 'ruins' | 'capital';

export interface ChapterInfo {
  id: number;
  title: string;
  description: string;
  theme: StoryTheme;
  unlocked: boolean;
}