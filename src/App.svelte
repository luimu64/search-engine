<script lang="ts">
  ///<reference path="./sources/reddit.d.ts" />
  ///<reference path="./sources/stackOverflow.d.ts" />
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { useRSearch } from "./sources/reddit";
  import { useSOSearch } from "./sources/stackOverflow";
  import ThemeButton from "./lib/DarkModeToggle.svelte";
  import RedditResultCard from "./lib/RedditResultCard.svelte";
  import StackOverflowResultCard from "./lib/StackOverflowResultCard.svelte";

  interface IAggregatedSearchResults {
    reddit: IRedditSearchResult[];
    stackOverflow: IStackOverflowSearchResult[];
  }

  let searchTerm: string = "";
  let timeout: NodeJS.Timeout;
  let aggregatedSearchResults: IAggregatedSearchResults = {
    reddit: [],
    stackOverflow: [],
  };
  let isLoading: boolean = false;
  let error: any = null;

  const { redData, redSearch } = useRSearch();
  const { soData, soSearch } = useSOSearch();

  $: {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        isLoading = true;
        Promise.all([redSearch(searchTerm), soSearch(searchTerm)])
          .then(() => {
            isLoading = false;
          })
          .catch((e) => (error = e));
      }
    }, 1000);
  }

  onMount(() => {
    return () => {
      clearTimeout(timeout);
    };
  });

  $: aggregatedSearchResults && console.log(aggregatedSearchResults);

  $: aggregatedSearchResults.reddit = $redData.searchResults;
  $: aggregatedSearchResults.stackOverflow = $soData.searchResults;
</script>

<main class="bg-[--background] min-h-screen h-full transition-all">
  <section class="h-40 flex justify-center flex-col items-center gap-5">
    <h1
      class="bg-gradient-to-b from-[--accent] to-[--secondary] bg-clip-text text-transparent text-4xl font-bold"
    >
      Zap
    </h1>
    <input
      class="text-[--text] bg-[--secondary] h-10 w-11/12 sm:w-1/2 rounded-full p-4 !outline-none border-none focus:ring-[--accent] focus:ring-2 select:bg-[--secondary]"
      bind:value={searchTerm}
    />
    <ThemeButton />
  </section>
  <section class="flex flex-col gap-2 p-5">
    {#if isLoading}
      <Icon icon="eos-icons:loading" class="text-4xl m-auto text-[--accent]" />
    {:else if error}
      <p class="text-[--text]">Error: {error.message}</p>
    {:else if aggregatedSearchResults}
      {#each Object.values(aggregatedSearchResults).flat() as result}
        {#if result.subreddit}
          <RedditResultCard {result} />
        {:else}
          <StackOverflowResultCard {result} />
        {/if}
      {/each}
    {/if}
  </section>
</main>
