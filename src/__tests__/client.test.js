import process from 'node:process';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: vi.fn(() => ({ mocked: true })),
  };
});

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  process.env = { ...ORIGINAL_ENV };
});

afterEach(() => {
  vi.clearAllMocks();
  process.env = ORIGINAL_ENV;
});

describe('supabase client', () => {
  it('creates a client using project credentials', async () => {
    process.env.VITE_SUPABASE_URL = 'https://example.supabase.co';
    process.env.VITE_SUPABASE_API_KEY = 'test-api-key';

    const { supabase } = await import('../client.js');
    const { createClient } = await import('@supabase/supabase-js');

    expect(createClient).toHaveBeenCalledWith('https://example.supabase.co', 'test-api-key');
    expect(supabase).toEqual({ mocked: true });
  });
});

