import { Paper, Typography, Box, Avatar, } from "@mui/material";
import ViewFC from "./ForViewFC";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from 'react-router-dom';


// 仮置きのためAIが生成したものを丸ごと使ってます
// データの方（型定義）
// ※あとでサーバーから受け取るデータと同じ形にしておくと楽です
type PostProps = {
  id: number;
  username: string;
  title: string;
  description: string;
  date: string;
  flow_data: any; // 追加: フローチャートの基本データ
};

const TimelinePost = ({ id, username, title, description, date, flow_data }: PostProps) => {
  const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

  // ReactFlowに渡すためにノードとエッジを取り出す。無い場合は空配列
  const nodes = flow_data?.nodes || [];
  const edges = flow_data?.edges || [];

  return (
    <>
      <Link to={`/view-details/${id}`} style={{ textDecoration: 'none' }}>
        <Paper
          elevation={3}
          sx={{
            p: 10,
            mb: 5,
            borderRadius: '20px',
            bgcolor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} >
            <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>{username[0]}</Avatar>
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
      <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<BookmarkIcon />}
      />
    </>

  );
};

export default TimelinePost;
