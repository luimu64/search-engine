<script lang="ts">
  import Icon from "@iconify/svelte";

  let currentTheme: string = localStorage.getItem("theme") || "light";

  const toggleFunc = () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
  };

  const loadTheme = () => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  $: currentTheme && loadTheme();
</script>

<button
  class="rounded-full bg-[--secondary] p-2 hover:bg-[--primary] transition-all absolute top-5 right-5"
  on:click={toggleFunc}
>
  {#if currentTheme === "dark"}
    <Icon icon="akar-icons:sun-fill" color="var(--accent)" />
  {:else}
    <Icon icon="akar-icons:moon-fill" color="var(--accent)" />
  {/if}
</button>
