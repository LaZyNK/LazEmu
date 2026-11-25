import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
export const SUPABASE_URL = 'https://jdkvtidyzosmatxprshs.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_hRzRgjJ6PUhmNgd1o0QGzA_gp6IEZNA';
export const BUCKET = 'user-files';
export const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
export const CORES = { gba:'gba', gb:'gb', gbc:'gb', nes:'nes', sfc:'snes', smc:'snes',
  z64:'n64', n64:'n64', v64:'n64', nds:'nds', md:'segaMD', gen:'segaMD' };
  export const safe = n => n.replace(/[^\w.\- ]/g, '_');
  