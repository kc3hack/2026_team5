import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Session, User } from '@supabase/supabase-js';

// Setup Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hlbwewrytlpcrfwqfuci.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsYndld3J5dGxwY3Jmd3FmdWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NTA2MjAsImV4cCI6MjA4NzEyNjYyMH0.mcooxvLg8IUaKxwrevTKdMPJjO7bfaemk5nZcIKLhZQ';
export const supabase = createClient(supabaseUrl, supabaseKey);

type AuthContextType = {
    user: User | null;
    session: Session | null;
};

const AuthContext = createContext<AuthContextType>({ user: null, session: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, session }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
