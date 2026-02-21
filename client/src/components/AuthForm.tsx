// src/components/AuthForm.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { TextField, Button, Typography, Box, Divider, Alert } from '@mui/material';
import { Link } from 'react-router-dom'; // ページ遷移のために追加

// 外から受け取る「指示（設定）」のリスト
interface AuthFormProps {
  initialMode: 'login' | 'signup'; // 最初に「ログイン」か「サインイン」どちらにするか
  isPopup?: boolean;               // ポップアップとして使うか（指定がなければ false）
}

export default function AuthForm({ initialMode, isPopup = false }: AuthFormProps) {
  // 現在のモード（初期値は外から指示されたモード）
  const [currentMode, setCurrentMode] = useState<'login' | 'signup'>(initialMode);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 今がログインモードかどうか
  const isLogin = currentMode === 'login';

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // ログイン処理
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // alert('ログインしました！'); // テスト用に入れてもOK
      } else {
        // サインイン（新規登録）処理
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        // ▼ 変更点：確認メールなしの設定にしたので、アラートを修正（または削除）
        alert('アカウントの登録が完了しました！'); 
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, textAlign: 'center', bgcolor: isPopup ? 'background.paper' : 'transparent' }}>
      {/* ポップアップの時だけタイトルを表示（ページの場合は親ページにタイトルがあるため不要） */}
      {isPopup && (
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          {isLogin ? 'ログイン' : 'サインイン'}
        </Typography>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleEmailAuth}>
        <TextField
          label="メールアドレス"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="パスワード"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }} disabled={loading}>
          {isLogin ? 'ログインする' : '登録する'}
        </Button>
      </form>

      {/* ▼▼▼ ここがハイブリッドの要！ ▼▼▼ */}
      {isPopup ? (
        // 【ポップアップの場合】画面移動させず、部品の中でモードを切り替える
        <Button variant="text" onClick={() => setCurrentMode(isLogin ? 'signup' : 'login')} sx={{ mb: 2 }}>
          {isLogin ? 'アカウントを持っていませんか？サインインへ' : 'すでにアカウントをお持ちですか？ログインへ'}
        </Button>
      ) : (
        // 【ページの場合】対応する別のページ（URL）へ完全に移動させる
        <Box sx={{ mb: 2 }}>
          {isLogin ? (
            <Link to="/signin" style={{ color: '#1976d2', textDecoration: 'none' }}>アカウントを持っていませんか？サインインへ</Link>
          ) : (
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>すでにアカウントをお持ちですか？ログインへ</Link>
          )}
        </Box>
      )}

      <Divider sx={{ my: 2 }}>または</Divider>

      <Button variant="outlined" fullWidth onClick={handleGoogleLogin}>
        Googleで続ける
      </Button>
    </Box>
  );
}