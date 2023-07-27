import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/svelte';
import { describe, it, vi, expect } from 'vitest';
import axios from 'axios';
import Chat from '../src/lib/Chat.svelte';

vi.mock('axios');

describe('Chat.svelte', () => {
  it('renders a new message on a sample button click', async () => {
    const { container } = render(Chat);
    const button = screen.getByText('Gulp Orange Wine Halo 2022');
    vi.mocked(axios.post).mockResolvedValue({
      data: {
        content: 'Posting a new message',
      },
    });

    const originalMessages = container.querySelectorAll('.messageBox');
    expect(originalMessages.length).toBe(1);
    await fireEvent.click(button);

    await waitFor(() => {
      const updatedMessages = container.querySelectorAll('.messageBox');
      expect(updatedMessages.length).toBe(2);
    });
  });
});
