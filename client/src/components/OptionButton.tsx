import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import CachedIcon from '@mui/icons-material/Cached';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';


export default function OptionButton() {
    const navigate = useNavigate();
    const actions = [
        { icon: <CreateIcon sx={{ color: 'blue' }} />, name: 'フローチャートを作る', onClick: () => navigate('/create') },
        { icon: <CachedIcon sx={{ color: 'green' }} />, name: 'ページの再読み込み', onClick: () => window.location.reload() },
        { icon: <LogoutIcon sx={{ color: 'black' }} />, name: 'タイトルへ戻る', onClick: () => navigate('/') },
        { icon: <VerticalAlignTopIcon sx={{ color: 'red' }} />, name: 'ページの先頭へ', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },

    ];

    return (

        <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            sx={{
                position: 'fixed',
                bottom: 100, right: 70,
                '& .MuiFab-primary': {
                    backgroundColor: 'white',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                    }
                },
            }}
            icon={<SpeedDialIcon openIcon={<MenuIcon />} />}
        >

            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    onClick={action.onClick}
                    slotProps={{
                        tooltip: {
                            title: action.name,
                        },
                    }}
                />
            ))}

        </SpeedDial>
    );
}
