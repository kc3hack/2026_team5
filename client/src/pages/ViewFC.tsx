import { Box, Typography } from "@mui/material";
import TimelinePost from "../components/TimeLinePost";
import ChangePage from "../components/ChangePage";

function Timeline() {

  const mockData = [
    {
      id: 1,
      username: "Yosuke",
      title: "初めてのフローチャート",
      description: "テスト",
      date: "2026/02/18 15:45"
    },
    {
      id: 2,
      username: "テスト",
      title: "テスト",
      description: "テスト",
      date: "2026/02/19 12:30"
    },
    {
      id: 3,
      username: "Admin",
      title: "テスト",
      description: "テスト",
      date: "2026/02/20 09:00"
    },
  ];

  return (
    <> 
     <Typography
    
    sx={{
      fontFamily: '"M PLUS Rounded 1c", sans-serif',
      fontWeight: 700, 
      fontSize: { xs: '1.5rem', md: '2rem' },
      color: 'rgba(255, 255, 255, 0.6)',
      mt:3 , mb: 0, ml:1,
      width: '65vw',
      mx: 'auto',
      textAlign: 'center',
    }}
   
  >
      View Flowcharts
  </Typography>

    <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto', p: 2 }}>

      {mockData.map((post) => (
        <TimelinePost
          key={post.id} 
          username={post.username}
          title={post.title}
          description={post.description}
          date={post.date} />
      ))}
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