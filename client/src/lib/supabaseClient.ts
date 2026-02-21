import { createClient } from '@supabase/supabase-js';

// .env.local に書いた鍵を読み込む
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 接続口（クライアント）を作成して、他のファイルから使えるようにエクスポート
export const supabase = createClient(supabaseUrl, supabaseAnonKey);