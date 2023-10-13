<script lang="ts">
  import { onMount } from "svelte";
  let searchTerm: string = "";
  let timeout: NodeJS.Timeout;

  let isLoading = false;
  let error: any = null;
  let searchResults: IRedditSearchResult[] = [];

  interface IRedditSearchResult {
    title?: string;
    body?: string;
    upvotes: number;
    comments: number;
    subreddit: string;
    oldUrl: string;
    newUrl: string;
  }

  $: {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        try {
          isLoading = true;
          const res = await fetch(
            `https://rsearch.luimu.dev/search?q=${searchTerm}`
          );
          searchResults = await res.json();
          error = null;
        } catch (err: any) {
          error = err;
        } finally {
          isLoading = false;
        }
      }
    }, 1000);
  }

  onMount(() => {
    return () => {
      clearTimeout(timeout);
    };
  });
</script>

<main class="bg-[--background] min-h-screen h-full dark">
  <section class="h-40 flex justify-center flex-col items-center gap-5">
    <h1 class="text-[--text] text-4xl font-bold">Search</h1>
    <input
      class="text-[--text] bg-[--secondary] h-10 w-11/12 sm:w-1/2 rounded-full p-4 !outline-none border-none focus:ring-[--accent] focus:ring-2 select:bg-[--secondary]"
      bind:value={searchTerm}
    />
  </section>
  <section class="flex flex-col gap-2 p-5">
    {#if isLoading}
      <p class="text-[--text]">Loading...</p>
    {:else if error}
      <p>Error: {error.message}</p>
    {:else if searchResults}
      {#each searchResults as result}
        <div class="bg-[--primary] rounded p-5 text-[--text]">
          <h2><a href={result.newUrl}>{result.title}</a></h2>
          <p>{result.body}</p>
          <div class="flex gap-2">
            <div>Comments: {result.comments}</div>
            <div>Upvotes: {result.upvotes}</div>
          </div>
        </div>
      {/each}
    {/if}
  </section>
</main>
