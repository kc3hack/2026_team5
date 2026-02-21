import { Paper, Typography, Box, Avatar, } from "@mui/material";
import ViewFC from "./ForViewFC";
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../api/client';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";



type PostProps = {
  id: number;
  username: string;
  avatar_url?: string;
  title: string;
  description: string;
  date: string;
  flow_data: any;
  likes?: number;
};

const TimelinePost = ({ id, username, avatar_url, title, description, date, flow_data, likes = 0 }: PostProps) => {
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && id) {
      const isLiked = localStorage.getItem(`liked_${user.id}_${id}`) === 'true';
      setLiked(isLiked);
    }
  }, [user, id]);

  const handleLike = async () => {
    try {
      const action = liked ? 'unlike' : 'like';
      // Optimistic update
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
      // Revert if API fails
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


  const nodes = flow_data?.nodes || [];
  const edges = flow_data?.edges || [];

  return (
    <>
      <Link to={`/view-details/${id}`} style={{ textDecoration: 'none' }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 5 },
            mb: 5,
            borderRadius: '20px',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} >
            {avatar_url ? (
              <Avatar src={avatar_url} sx={{ mr: 2 }} />
            ) : (
              <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>{username ? username[0] : 'U'}</Avatar>
            )}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {date}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h5" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>

          <Box sx={{ mt: 2, height: '400px', bgcolor: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            <ViewFC nodes={nodes} edges={edges} />
          </Box>

        </Paper>
      </Link>
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
    </>

  );
};

export default TimelinePost;
