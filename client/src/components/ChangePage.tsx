import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import SettingIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

export default function ChangePage() {

    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0
        if (current > previous && current > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    const location = useLocation();
    let num;  //letで作るの怖すぎるけど、他にいい方法が思いつかなかった returnとか使うんかなあ

    if (location.pathname === '/view')
        num = 0;
    else if (location.pathname === '/create')
        num = 1;
    else if (location.pathname === '/config')
        num = 2;

    const [value, setValue] = React.useState(num);

    React.useEffect(() => {
        const path = location.pathname
        if (path === '/view')
            setValue(0);
        if (path === '/create')
            setValue(1);
        if (path === '/config')
            setValue(2);
    }, [location.pathname]);

    return (
        <motion.header
            className="header"
            animate={{
                y: hidden ? -140 : 0,
                opacity: hidden ? 0 : 1,
            }}
            transition={{ duration: 0, ease: "easeInOut" }}
        >
            <Box sx={{ pb: 7 }}>

                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, bgcolor: "transparent"/*,borderTop: '1px solid rgba(255, 255, 255, 0.2)', */ }} >
                    <BottomNavigation
                        showLabels
                        onChange={(_event, newValue) => {
                            setValue(newValue);
                        }}
                        sx={{
                            bgcolor: '#0B1026',

                            '& .MuiBottomNavigationAction-root': {
                                color: '#888888',
                            },
                            '& .Mui-selected': {
                                color: '#ffffff !important',
                            }
                        }}
                        value={value}
                    >

                        <BottomNavigationAction label="フローチャート閲覧" icon={<SearchIcon />} component={Link} to="/view " />
                        <BottomNavigationAction label="フローチャート作成" icon={<CreateIcon />} component={Link} to="/create " />
                        <BottomNavigationAction label="設定" icon={<SettingIcon />} component={Link} to="/config " />
                    </BottomNavigation>
                </Paper>
            </Box>
        </motion.header>
    );
}