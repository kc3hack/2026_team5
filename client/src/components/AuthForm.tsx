import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { supabase } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
    initialMode: 'login' | 'signup';
    isPopup: boolean;
}

const AuthForm = ({ initialMode, isPopup }: AuthFormProps) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        // ユーザーIDからダミーのメールアドレスを生成
        const dummyEmail = `${userId}@dummy.local`;

        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email: dummyEmail,
                    password,
                });
                if (error) throw error;
                alert('サインアップ成功！');
                if (!isPopup) navigate('/profile');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: dummyEmail,
                    password,
                });
                if (error) throw error;
                if (!isPopup) navigate('/view'); // Only redirect if it's on a standalone page
            }
        } catch (error: any) {
            setErrorMsg(error.message || 'エラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: isPopup ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                maxWidth: 400,
                mx: 'auto',
            }}
        >
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                    fullWidth
                    label="ユーザーID"
                    variant="outlined"
                    margin="normal"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    sx={{ input: { color: 'white' }, label: { color: 'gray' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' } } }}
                />
                <TextField
                    fullWidth
                    label="パスワード"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ input: { color: 'white' }, label: { color: 'gray' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' } } }}
                />
                {errorMsg && (
                    <Typography color="error" variant="body2" mt={1}>
                        {errorMsg}
                    </Typography>
                )}
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 3, mb: 2, bgcolor: 'rgba(255,255,255,0.8)', color: 'black', '&:hover': { bgcolor: 'white' } }}
                >
                    {mode === 'login' ? 'ログイン' : 'サインアップ'}
                </Button>
            </form>
            <Button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                sx={{ color: 'lightblue', textTransform: 'none' }}
            >
                {mode === 'login'
                    ? "アカウントを持っていませんか？ サインアップ"
                    : "すでにアカウントを持っていますか？ ログイン"}
            </Button>
        </Box>
    );
};

export default AuthForm;
