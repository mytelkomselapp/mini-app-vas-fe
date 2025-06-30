export interface StoryProps {
  index: number;
  component: React.ReactNode;
}

export interface StoriesProps {
  /** Default page based on story index  */
  defaultStory: number;
  stories: StoryProps[];
  onChangeStory?: (story: StoryProps) => void;
}
