<script lang="ts">
  import Chat from './lib/Chat.svelte';
  import Nav from './lib/Nav.svelte';
  import Windmill from './assets/Windmill.png';
</script>

<main class="relative z-10">
  <Nav />
  <Chat />
</main>

<div class="fixed bottom-0 right-0 z-0">
  <img class=" max-h-[50vw]" src={Windmill} alt="Windmill" />
</div>
