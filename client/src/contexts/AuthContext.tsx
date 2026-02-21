// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

// アプリ全体で共有したいデータの種類を定義
interface AuthContextType {
  user: User | null;       // ユーザー情報（IDやメアドなど）
  session: Session | null; // ★超重要：FastAPIに送る「入場チケット」が入っています
  loading: boolean;        // ログイン状態を確認中かどうか
}

// 空の箱（Context）を作成
const AuthContext = createContext<AuthContextType>({ user: null, session: null, loading: true });

// アプリ全体を包み込んでデータを配るためのコンポーネント
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. アプリを開いた瞬間に、前回ログインした記録が残っているかチェック
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. ログインやログアウトが起きたら、常に最新の状態にアップデートする（監視カメラ）
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// どのページからでも「const { user, session } = useAuth();」と書くだけでデータを引き出せる魔法のフック
export const useAuth = () => {
  return useContext(AuthContext);
};