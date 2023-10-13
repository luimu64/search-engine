import { writable } from "svelte/store";

interface IRedditSearchResult {
  title?: string;
  body?: string;
  upvotes: number;
  comments: number;
  subreddit: string;
  oldUrl: string;
  newUrl: string;
}

interface ISearchStore {
  searchResults: IRedditSearchResult[];
  isLoading: boolean;
  error: any;
}

export const useRSearch = () => {
  const searchStore = writable<ISearchStore>({
    searchResults: [],
    isLoading: false,
    error: null,
  });

  const redSearch = async (searchTerm: string) => {
    try {
      searchStore.update((prev) => {
        return { ...prev, isLoading: true };
      });
      const res = await fetch(
        `https://rsearch.luimu.dev/search?q=${searchTerm}`
      );
      let searchResults = await res.json();
      searchStore.update((prev) => {
        return { ...prev, searchResults: searchResults, error: null };
      });
    } catch (err: any) {
      searchStore.update((prev) => {
        return { ...prev, error: err };
      });
    } finally {
      searchStore.update((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };

  return { redData: { ...searchStore }, redSearch };
};
