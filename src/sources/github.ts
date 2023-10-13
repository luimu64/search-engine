///<reference path="./github.d.ts" />
import { writable } from "svelte/store";

export const useGiSearch = () => {
  const searchStore = writable<IGithubSearchStore>({
    searchResults: [],
    isLoading: false,
    error: null,
  });

  const gitSearch = async (searchTerm: string) => {
    try {
      searchStore.update((prev) => {
        return { ...prev, isLoading: true };
      });
      const res = await fetch(
        `https://api.github.com/search/issues?q=${searchTerm}`
      );
      let searchResults = await res.json();
      searchStore.update((prev) => {
        return { ...prev, searchResults: searchResults.items, error: null };
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

  return { gitData: { ...searchStore }, gitSearch };
};
