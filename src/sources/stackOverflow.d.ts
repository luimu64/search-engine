declare interface IStackOverflowSearchResult {
  title?: string;
  is_answered: boolean;
  answer_count: number;
  score: number;
  link: string;
  tags: string[];
  id: number;
}

declare interface ISOSearchStore {
  searchResults: IStackOverflowSearchResult[];
  isLoading: boolean;
  error: any;
}
