<script lang="ts">
  import { Icon, ArrowRightCircle } from 'svelte-hero-icons';
  import axios from 'axios';
  import HeidiIcon from '../assets/Heidi-Icon.png';
  import UserIcon from '../assets/User-Icon.png';

  type Message = {
    sender: string;
    content: string;
    timeStamp: string;
  };

  let inputValue: string = '';
  let newMessage: string = '';
  let chatContainerRef: HTMLElement;

  const getTime = (): string => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  let messages: Message[] = [
    {
      sender: 'Heidi',
      content: `What're you drinking?`,
      timeStamp: getTime(),
    },
  ];

  const addMessage = (user: string): void => {
    if (newMessage === undefined) return;
    if (newMessage.trim() !== '') {
      messages = [
        ...messages,
        {
          sender: user,
          content: newMessage,
          timeStamp: getTime(),
        },
      ];
    }
  };

  const handleSubmit = async (
    sample: undefined | string = undefined
  ): Promise<void> => {
    try {
      if (inputValue) newMessage = inputValue;
      else {
        newMessage = sample;
      }
      inputValue = '';
      addMessage('User');
      const { data: review } = await axios.post(
        'http://localhost:8080/ai/askHeidi',
        {
          message: newMessage,
        }
      );
      newMessage = review.content;
      addMessage('Heidi');
      setTimeout(() => {
        if (chatContainerRef !== undefined) {
          chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
        }
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') handleSubmit();
  };

  const handleSample = async (event: Event) => {
    const target = event.target as HTMLButtonElement;
    handleSubmit(target.innerText);
  };
</script>

<main>
  <div
    bind:this={chatContainerRef}
    class="w-[80vw] md:w-[65vw] mx-auto max-h-[70vh] overflow-scroll"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 pb-5">
      {#each messages as message}
        {#if message.sender === 'Heidi'}
          <div class="text-center flex flex-row mb-10px p-2 justify-start">
            <div class="w-8 sm:w-10">
              <img src={HeidiIcon} alt="Heidi-Icon" />
            </div>
            <div class="ml-3 text-left max-w-[50%] mr-auto">
              <div class="bg-stone-100 rounded-lg p-2">
                {message.content}
              </div>
              <div class="text-xs">
                {message.timeStamp}
              </div>
            </div>
          </div>
        {/if}
        {#if message.sender === 'User'}
          <div class="text-center flex flex-row mb-10px p-2 justify-end">
            <div class="mr-3 text-right max-w-[50%] ml-auto">
              <div
                class="bg-[var(--sender)] text-white rounded-lg p-2 break-words"
              >
                {message.content}
              </div>
              <div class="text-xs">
                {message.timeStamp}
              </div>
            </div>
            <div class="w-8 sm:w-10">
              <img src={UserIcon} alt="User-Icon" />
            </div>
          </div>
        {/if}
      {/each}
      {#if messages.length >= 1}
        <div class="m-4">
          <p>Not sure what to ask Heidi? Try one of the wines below.</p>
          <button class="m-2 rounded-full" on:click={handleSample}
            >Gulp Orange Wine Halo 2022</button
          >
          <button class="m-2 rounded-full" on:click={handleSample}
            >Caymus Napa Valley Cabernet Sauvignon 2021</button
          >
          <button class="m-2 rounded-full" on:click={handleSample}
            >Château d'Esclans Whispering Angel Côtes de Provence Rose</button
          >
        </div>
      {/if}

      <div class="flex items-center">
        <input
          on:keydown={handleKeyDown}
          class="border-solid h-8 w-full px-2 rounded-full border-2 border-radius border-stone-500"
          id="message-input"
          type="text"
          placeholder="Type your message..."
          bind:value={inputValue}
        />
        <button
          class="border-none outline-none bg-white focus:outline-none"
          on:click={() => {
            handleSubmit();
          }}><Icon class="w-7 text-stone-500" src={ArrowRightCircle} /></button
        >
      </div>
    </div>
  </div>
</main>
