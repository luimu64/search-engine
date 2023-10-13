<script lang="ts">
  ///<reference path="../sources/reddit.d.ts" />
  import Icon from "@iconify/svelte";

  export let result: IRedditSearchResult;
</script>

<div
  class="border-l-4 border-red-600 bg-[--primary] rounded p-5 text-[--text] flex flex-col gap-2 shadow-lg"
>
  <h2 class="text-2xl"><a href={result.newUrl}>{result.title}</a></h2>
  <p>{result.body}</p>
  <div class="flex gap-2">
    <div class="flex items-center gap-1">
      <div>
        <Icon icon="bxs:up-arrow" class="text-xs" />
        <Icon icon="bxs:down-arrow" class="text-xs" />
      </div>
      {result.upvotes}
    </div>
    <div class="flex items-center gap-1">
      <Icon icon="fluent:comment-24-regular" />
      {result.comments}
    </div>
  </div>
</div>
