declare interface IRedditSearchResult {
  title?: string;
  body?: string;
  upvotes: number;
  comments: number;
  subreddit: string;
  oldUrl: string;
  newUrl: string;
}

declare interface IRedSearchStore {
  searchResults: IRedditSearchResult[];
  isLoading: boolean;
  error: any;
}
