<script lang="ts">
  ///<reference path="../sources/github.d.ts" />
  import Icon from "@iconify/svelte";

  export let result: IGithubSearchResult;
</script>

<div
  class="border-l-4 border-slate-600 bg-[--primary] rounded p-2 sm:p-5 text-[--text] flex flex-col gap-2 shadow-lg"
>
  <h2 class="text-xl md:text-2xl">
    <a href={result.html_url}>{result.title}</a>
  </h2>
  <p class="text-clip overflow-hidden">
    {result.repository_url.split("/").slice(-2).join("/")}
  </p>
  <div class="flex gap-2 items-center">
    <div class="flex items-center gap-1">
      <Icon icon="fluent:comment-24-regular" />
      {result.comments}
    </div>
    {#if result.state === "open"}
      <Icon icon="octicon:issue-opened-24" class="text-green-500" />
    {:else if result.state === "closed"}
      <Icon icon="octicon:issue-closed-24" class="text-purple-500" />
    {/if}
  </div>
</div>
