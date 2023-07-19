<script>
  import { Icon, ArrowRightCircle } from 'svelte-hero-icons';
  import axios from 'axios';
  import HeidiIcon from '../assets/Heidi-Icon.png';
  import UserIcon from '../assets/User-Icon.png';

  let inputValue = '';
  let newMessage = '';

  const getTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  let messages = [
    {
      sender: 'Heidi',
      content: `What're you drinking?`,
      timeStamp: getTime(),
    },
  ];

  const addMessage = (user) => {
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
    newMessage = '';
  };

  const handleSubmit = async () => {
    try {
      newMessage = inputValue;
      addMessage('User');
      const { data: review } = await axios.post(
        'http://localhost:8080/ai/askHeidi',
        {
          message: inputValue,
        }
      );
      inputValue = '';
      newMessage = review.content;
      addMessage('Heidi');
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleSubmit();
  };
</script>

<main>
  <div class="w-[80vw] md:w-[65vw] mx-auto h-screen">
    <div class="bg-white rounded-lg shadow-lg p-6 pb-5">
      <div>
        <div>
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
              on:click={handleSubmit}
              ><Icon
                class="w-7 text-stone-500"
                src={ArrowRightCircle}
              /></button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
