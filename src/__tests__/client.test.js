import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: vi.fn(() => ({ mocked: true })),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('supabase client', () => {
  it('creates a client using project credentials', async () => {
    const { createClient } = await import('@supabase/supabase-js');
    const { supabase } = await import('../client.js');

    expect(createClient).toHaveBeenCalledWith(
      'https://yvmcpmjvgeqthwfwobmx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2bWNwbWp2Z2VxdGh3ZndvYm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5Nzc5NjAsImV4cCI6MjA3ODU1Mzk2MH0.DbcP7DoNWo4zcHNPJ_iKEko-GGwqmfUH-aEpYCxWE3k'
    );
    expect(supabase).toEqual({ mocked: true });
  });
});

