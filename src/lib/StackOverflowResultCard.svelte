<script lang="ts">
  ///<reference path="../sources/stackOverflow.d.ts" />
  export let result: IStackOverflowSearchResult;
</script>

<div
  class="border-l-4 border-orange-600 bg-[--primary] rounded p-5 text-[--text] flex flex-col gap-2 shadow-lg"
>
  <h2 class="text-2xl"><a href={result.link}>{result.title}</a></h2>
  <div class="flex gap-2">
    <div>Answered: {result.is_answered}</div>
    <div>Answer count: {result.answer_count}</div>
    <div>score: {result.score}</div>
  </div>
</div>
