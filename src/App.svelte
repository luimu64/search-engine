<script lang="ts">
  import { onMount } from "svelte";
  import ThemeButton from "./lib/DarkModeToggle.svelte";
  import Icon from "@iconify/svelte";
  import { useRSearch } from "./sources/reddit";

  let searchTerm: string = "";
  let timeout: NodeJS.Timeout;

  const { redData, redSearch } = useRSearch();

  $: {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (searchTerm !== "") {
        redSearch(searchTerm);
      }
    }, 1000);
  }

  onMount(() => {
    return () => {
      clearTimeout(timeout);
    };
  });

  $: redData && console.log($redData);
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
    {#if $redData.isLoading}
      <Icon icon="eos-icons:loading" class="text-4xl m-auto text-[--accent]" />
    {:else if $redData.error}
      <p class="text-[--text]">Error: {$redData.error.message}</p>
    {:else if $redData.searchResults}
      {#each $redData.searchResults as result}
        <div
          class="bg-[--primary] rounded p-5 text-[--text] flex flex-col gap-2 shadow-lg"
        >
          <h2 class="text-2xl"><a href={result.newUrl}>{result.title}</a></h2>
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
