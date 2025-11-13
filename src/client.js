import { createClient } from '@supabase/supabase-js';

const globalProcess = typeof globalThis !== 'undefined' ? globalThis.process : undefined;

function readEnv(key) {
  if (typeof import.meta !== 'undefined' && import.meta.env && key in import.meta.env) {
    return import.meta.env[key];
  }

  if (globalProcess?.env && key in globalProcess.env) {
    return globalProcess.env[key];
  }

  return undefined;
}

const URL = readEnv('VITE_SUPABASE_URL');
const API_KEY = readEnv('VITE_SUPABASE_API_KEY');

if (!URL || !API_KEY) {
  console.warn(
    'Supabase client is missing configuration. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_API_KEY are set.'
  );
}

export const supabase = createClient(URL ?? '', API_KEY ?? '');

