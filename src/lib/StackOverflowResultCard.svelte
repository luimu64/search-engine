<script lang="ts">
  ///<reference path="../sources/stackOverflow.d.ts" />
  import Icon from "@iconify/svelte";

  export let result: IStackOverflowSearchResult;
</script>

<div
  class="border-l-4 border-orange-600 bg-[--primary] rounded p-5 text-[--text] flex flex-col gap-2 shadow-lg"
>
  <h2 class="text-2xl"><a href={result.link}>{result.title}</a></h2>
  <div class="flex gap-2 items-center">
    <div class="flex items-center gap-1">
      <div>
        <Icon icon="bxs:up-arrow" class="text-xs" />
        <Icon icon="bxs:down-arrow" class="text-xs" />
      </div>
      {result.score}
    </div>
    <div class="flex items-center gap-1">
      <Icon icon="fluent:comment-24-regular" />
      {result.answer_count}
    </div>
    {#if result.is_answered}
      <Icon icon="material-symbols:check" class="text-2xl" />
    {/if}
  </div>
</div>
