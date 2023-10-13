<script lang="ts">
  ///<reference path="./sources/reddit.d.ts" />
  ///<reference path="./sources/stackOverflow.d.ts" />
  ///<reference path="./sources/github.d.ts" />

  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { useReSearch } from "./sources/reddit";
  import { useSoSearch } from "./sources/stackOverflow";
  import { useGiSearch } from "./sources/github";
  import ThemeButton from "./lib/DarkModeToggle.svelte";
  import RedditResultCard from "./lib/RedditResultCard.svelte";
  import StackOverflowResultCard from "./lib/StackOverflowResultCard.svelte";
  import GithubResultCard from "./lib/GithubResultCard.svelte";

  interface IAggregatedSearchResults {
    stackOverflow: IStackOverflowSearchResult[];
    github: IGithubSearchResult[];
    reddit: IRedditSearchResult[];
  }

  let searchTerm: string = "";
  let timeout: NodeJS.Timeout;
  let aggregatedSearchResults: IAggregatedSearchResults = {
    reddit: [],
    stackOverflow: [],
    github: [],
  };
  let isLoading: boolean = false;
  let error: any = null;

  const { redData, redSearch } = useReSearch();
  const { soData, soSearch } = useSoSearch();
  const { gitData, gitSearch } = useGiSearch();

  $: {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        isLoading = true;
        Promise.all([
          redSearch(searchTerm),
          soSearch(searchTerm),
          gitSearch(searchTerm),
        ])
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

  $: aggregatedSearchResults.reddit = $redData.searchResults.slice(0, 10);
  $: aggregatedSearchResults.stackOverflow = $soData.searchResults.slice(0, 10);
  $: aggregatedSearchResults.github = $gitData.searchResults.slice(0, 10);
</script>

<main class="bg-[--background] min-h-screen h-full transition-all">
  <section class="h-40 flex justify-center flex-col items-center gap-5">
    <h1
      class="bg-gradient-to-b from-[--accent] to-[--secondary] bg-clip-text text-transparent text-4xl font-bold"
    >
      Zap
    </h1>
    <input
      class="text-[--text] bg-[--secondary] h-10 w-11/12 sm:w-1/2 lg:max-w-5xl rounded-full p-4 !outline-none border-none focus:ring-[--accent] focus:ring-2 select:bg-[--secondary]"
      bind:value={searchTerm}
    />
    <ThemeButton />
  </section>
  <section class="flex flex-col gap-2 p-1 lg:max-w-5xl sm:p-5 m-auto">
    {#if isLoading}
      <Icon icon="eos-icons:loading" class="text-4xl m-auto text-[--accent]" />
    {:else if error}
      <p class="text-[--text]">Error: {error.message}</p>
    {:else if aggregatedSearchResults}
      {#each Object.values(aggregatedSearchResults).flat() as result}
        {#if result.link}
          <StackOverflowResultCard {result} />
        {:else if result.body !== "" && result.subreddit}
          <RedditResultCard {result} />
        {:else if result.repository_url}
          <GithubResultCard {result} />
        {/if}
      {/each}
    {/if}
  </section>
</main>
