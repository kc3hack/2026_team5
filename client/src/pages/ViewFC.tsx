import { Box, Typography, CircularProgress, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useEffect, useState } from "react";
import TimelinePost from "../components/TimeLinePost";
import ChangePage from "../components/ChangePage";
import { apiClient } from "../api/client";
import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import CachedIcon from '@mui/icons-material/Cached';





function Timeline() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get('/api/flowcharts');
        setPosts(response.data);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const actions = [
    { icon: <CreateIcon sx={{ color: 'blue' }} />, name: 'フローチャートを作る', onClick: () => navigate('/create') },
    { icon: <CachedIcon sx={{ color: 'green' }} />, name: 'ページの再読み込み', onClick: () => window.location.reload() },
    { icon: <VerticalAlignTopIcon sx={{ color: 'red' }} />, name: 'ページの先頭へ', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  return (
    <>
      {/*}    <motion.div
        initial={{
          opacity: 0.1, scale: 1
        }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}>
          */}

      <Typography


        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: "700",
          fontSize: { xs: '1.5rem', md: '2rem' },
          color: 'rgba(255, 255, 255, 0.6)',
          mt: 3, mb: 0, ml: 1,
          width: { xs: '90vw', md: '65vw' },
          mx: 'auto',
          textAlign: 'center',
        }}

      >
        View Flowcharts
      </Typography>

      <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto', p: 2 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          </Box>
        ) : (
          posts.map((post) => (
            <TimelinePost
              key={post.id}
              id={post.id}
              username={"User"} // バックエンドにusernameをまだ保存していないため仮
              title={post.title}
              description={post.description || ""}
              date={new Date(post.created_at).toLocaleString('ja-JP')} // UTC時間を日本時間に変換
              flow_data={post.flow_data}
              likes={post.likes}
            />
          ))
        )}
        <ChangePage />

      </Box>



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


    </>

  );
}

export default Timeline;



{/*
  import ChangePage from "../components/ChangePage";

function ViewFC():any {
  return (
    <>
    <h1 style={{color: "#ffffff"}}>
    フローチャートを閲覧する画面
    </h1>

    <ChangePage />
    </>
  )
}

export default ViewFC;
*/}