import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import { useAuth, supabase } from '../contexts/AuthContext';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Link, useNavigate } from 'react-router-dom';

function Profiles() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        getProfile();
    }, [user, navigate]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!user) throw new Error('No user');

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, avatar_url`)
                .eq('id', user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username || '');
                setAvatarUrl(data.avatar_url || '');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({ username, avatar_url }: { username: string, avatar_url: string }) {
        try {
            setLoading(true);
            if (!user) throw new Error('No user');

            const updates = {
                id: user.id,
                username,
                avatar_url,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;
            alert('プロフィールを更新しました！');
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

            setAvatarUrl(data.publicUrl);
            updateProfile({ username, avatar_url: data.publicUrl });
        } catch (error: any) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <Box sx={{ pt: 4, pb: 4, px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: { xs: '95vw', md: '65vw' }, display: 'flex', alignItems: 'center', mb: 4 }}>
                <Link to="/view" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                    <KeyboardBackspaceIcon sx={{ color: 'white', fontSize: '2.5rem', mr: 2 }} />
                </Link>
                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: '"M PLUS Rounded 1c", sans-serif',
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        color: 'rgba(255, 255, 255, 0.6)',
                        textAlign: 'left',
                    }}
                >
                    プロフィール設定
                </Typography>
            </Box>

            {loading ? (
                <Typography sx={{ color: 'white' }}>読み込み中...</Typography>
            ) : (
                <Box
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 4,
                        width: '100%',
                        maxWidth: 500,
                    }}
                >
                    <Box sx={{ position: 'relative', mb: 4 }}>
                        <Avatar
                            src={avatarUrl}
                            sx={{ width: 120, height: 120, mb: 1, border: '4px solid rgba(255,255,255,0.2)' }}
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="icon-button-file"
                            type="file"
                            onChange={uploadAvatar}
                            disabled={uploading}
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    bgcolor: 'rgba(255,255,255,0.9)',
                                    '&:hover': { bgcolor: 'white' },
                                }}
                            >
                                <PhotoCameraIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </label>
                    </Box>

                    <TextField
                        fullWidth
                        label="ユーザーネーム"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ input: { color: 'white' }, label: { color: 'gray' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'gray' } } }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => updateProfile({ username, avatar_url: avatarUrl })}
                        disabled={loading}
                        sx={{ mt: 3, bgcolor: 'rgba(255,255,255,0.8)', color: 'black', '&:hover': { bgcolor: 'white' }, fontWeight: 'bold' }}
                    >
                        {loading ? '更新中...' : 'プロフィールを更新'}
                    </Button>
                    <Button
                        component={Link}
                        to="/view"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                    >
                        閲覧を続ける
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={async () => {
                            await supabase.auth.signOut();
                            navigate('/');
                        }}
                        sx={{ mt: 1 }}
                    >
                        ログアウト
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default Profiles;
