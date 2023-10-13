///<reference path="./stackOverflow.d.ts" />
import { writable } from "svelte/store";

export const useSOSearch = () => {
  const searchStore = writable<ISOSearchStore>({
    searchResults: [],
    isLoading: false,
    error: null,
  });

  const soSearch = async (searchTerm: string) => {
    try {
      searchStore.update((prev) => {
        return { ...prev, isLoading: true };
      });
      const res = await fetch(
        `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${searchTerm}&site=stackoverflow`
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

  return { soData: { ...searchStore }, soSearch };
};
