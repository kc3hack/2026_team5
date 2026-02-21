import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import TimelinePost from "../components/TimeLinePost";
import ChangePage from "../components/ChangePage";
import { apiClient } from "../api/client";




function Timeline() {
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
          width: '65vw',
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
            />
          ))
        )}
        <ChangePage />
      </Box>
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