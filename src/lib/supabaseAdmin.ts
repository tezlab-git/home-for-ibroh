// src/lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.VITE_SUPABASE_URL ??
  '';
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export const supabaseAdmin = supabaseUrl && supabaseServiceRole
  ? createClient(supabaseUrl, supabaseServiceRole, { auth: { persistSession: false } })
  : null;
