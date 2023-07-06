<script>
  import { Icon, ArrowRightCircle } from 'svelte-hero-icons';

  let inputValue = '';
  const handleSubmit = () => {
    console.log(inputValue);
  };
</script>

<main>
  <div class="min-w-[20vw] md:min-w-[50vw] max-w-full mx-auto h-screen">
    <div class="bg-white rounded-lg shadow-lg p-6 pb-5">
      <div>
        <input
          class="border-solid px-2 rounded-lg border-2 border-radius border-stone-500"
          id="message-input"
          type="text"
          placeholder="Type your message..."
          bind:value={inputValue}
        />
        <button
          class="border-none outline-none bg-transparent focus:outline-none"
          on:click={handleSubmit}
          ><Icon class="w-7" src={ArrowRightCircle} /></button
        >
      </div>
    </div>
  </div>
</main>
