import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { apiClient } from '../api/client';
import { Box, Typography, CircularProgress, Paper, Avatar } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import ChangePage from '../components/ChangePage';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import OptionButton from '../components/OptionButton';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { motion } from "framer-motion";




function ViewLargeFC() {
  const { id } = useParams();
  const { user } = useAuth();
  const [flowData, setFlowData] = useState<any>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && id) {
      const isLiked = localStorage.getItem(`liked_${user.id}_${id}`) === 'true';
      setLiked(isLiked);
    }
  }, [user, id]);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await apiClient.get(`/api/flowcharts/${id}`);
        setFlowData(res.data);
        setLikeCount(res.data.likes || 0);
      } catch (err) {
        console.error(err);
        alert("データの取得に失敗しました");
      }
    };
    fetchOne();
  }, [id]);

  const handleLike = async () => {
    try {
      const action = liked ? 'unlike' : 'like';
      setLiked(!liked);
      setLikeCount(prev => liked ? Math.max(0, prev - 1) : prev + 1);

      if (user) {
        if (!liked) {
          localStorage.setItem(`liked_${user.id}_${id}`, 'true');
        } else {
          localStorage.removeItem(`liked_${user.id}_${id}`);
        }
      }

      await apiClient.post(`/api/flowcharts/${id}/like`, { action });
    } catch (error) {
      console.error("Failed to update like", error);
      setLiked(liked);
      setLikeCount(likeCount);
      if (user) {
        if (liked) {
          localStorage.setItem(`liked_${user.id}_${id}`, 'true');
        } else {
          localStorage.removeItem(`liked_${user.id}_${id}`);
        }
      }
    }
  };

  const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

  if (!flowData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }


  const { nodes, edges } = flowData.flow_data;

  return (
    <>
      <OptionButton />
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        width: { xs: '95vw', md: '80vw' },
        mx: 'auto',
        mt: 3,
        mb: 0,
      }}>
        <Link to="/view" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <KeyboardBackspaceIcon sx={{ color: 'white', fontSize: '2.5rem', mr: 2 }} />
        </Link>
        <Typography
          sx={{
            fontFamily: '"M PLUS Rounded 1c", sans-serif',
            fontWeight: "700",
            fontSize: { xs: '1.5rem', md: '2rem' },
            color: 'rgba(255, 255, 255)',
            textAlign: 'left',
          }}
        >
          Title: {flowData.title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', py: 4 }}>
        <Paper sx={{ height: { xs: '65vh', md: '80vh' }, width: { xs: '100vw', sm: '95vw', md: '80vw' }, borderRadius: { xs: 0, sm: '16px' }, overflow: 'hidden', boxShadow: 3, mb: 3 }}>
          <Box sx={{ height: '100%', width: '100%', bgcolor: '#ffffff' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              nodesDraggable={false}
              nodesConnectable={false}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 10 }}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.5 }}
            >
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: 'red' }} />}
                checked={liked}
                onChange={handleLike}
                sx={{ color: 'white' }}
              />
            </motion.div>

            <Typography sx={{ color: 'white', ml: 1, mr: 2 }}>{likeCount}</Typography>
            <Checkbox
              {...label}
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
              sx={{ color: 'white' }}
            />
          </Box>
        </Paper>
      </Box>

      <Typography
        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: "700",
          fontSize: { xs: '1.2rem', md: '2rem' },
          color: 'rgba(255, 255, 255)',
          mt: 3, mb: 0, ml: 1,
          width: { xs: '90vw', md: '70vw' },
          mx: 'auto',
          textAlign: 'left',
        }}
      >
        Description: {flowData.description}
      </Typography>
      <Box sx={{ width: { xs: '90vw', md: '70vw' }, mx: 'auto', mt: 2, mb: 1, ml: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {flowData.avatar_url ? (
            <Avatar src={flowData.avatar_url} sx={{ mr: 2, width: 32, height: 32 }} />
          ) : (
            <Avatar sx={{ bgcolor: '#1976d2', mr: 2, width: 32, height: 32 }}>
              {flowData.username ? flowData.username[0] : 'U'}
            </Avatar>
          )}
          <Typography variant="body1" sx={{ color: 'white' }}>
            Uploaded by: {flowData.username || '名無しユーザー'}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Uploaded at: {new Date(flowData.created_at).toLocaleString('ja-JP')}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 10, justifyContent: 'center' }}>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.5 }}
        >
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
            checked={liked}
            onChange={handleLike}
            sx={{ color: 'white' }}
          />
        </motion.div>

        <Typography sx={{ color: 'white', ml: 1, mr: 3 }}>{likeCount}</Typography>
        <Checkbox
          {...label}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
          sx={{ color: 'white' }}
        />
      </Box>

      <ChangePage />
    </>
  );
}

export default ViewLargeFC;