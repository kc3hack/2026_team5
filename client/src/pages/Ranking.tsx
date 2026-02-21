import { Typography, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ChangePage from "../components/ChangePage";
import { apiClient } from "../api/client";
import TimelinePost from "../components/TimeLinePost";
import OptionButton from "../components/OptionButton";

function Config(): any {
  const [rankingPosts, setRankingPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await apiClient.get('/api/flowcharts/ranking');
        setRankingPosts(response.data);
      } catch (error) {
        console.error("ランキングの取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRanking();
  }, []);

  return (
    <>
      <OptionButton />
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
        Ranking
      </Typography>

      <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto', p: 2 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          </Box>
        ) : (
          rankingPosts.map((post, index) => (
            <Box key={post.id} sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ color: '#fff', mb: 1, fontWeight: 'bold' }}>
                第 {index + 1} 位 いいね数:{post.likes}
              </Typography>

              <TimelinePost
                id={post.id}
                username={"User"}
                title={post.title}
                description={post.description || ""}
                date={new Date(post.created_at).toLocaleString('ja-JP')}
                flow_data={post.flow_data}
                likes={post.likes}
              />
            </Box>
          ))
        )}
      </Box>

      <ChangePage />
    </>
  )
}

export default Config;
