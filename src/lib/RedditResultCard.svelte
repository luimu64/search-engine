<script lang="ts">
  ///<reference path="../sources/reddit.d.ts" />
  export let result: IRedditSearchResult;
</script>

<div
  class="border-l-4 border-red-600 bg-[--primary] rounded p-5 text-[--text] flex flex-col gap-2 shadow-lg"
>
  <h2 class="text-2xl"><a href={result.newUrl}>{result.title}</a></h2>
  <p>{result.body}</p>
  <div class="flex gap-2">
    <div>Comments: {result.comments}</div>
    <div>Upvotes: {result.upvotes}</div>
  </div>
</div>
