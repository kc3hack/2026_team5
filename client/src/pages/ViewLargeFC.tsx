import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { apiClient } from '../api/client';
import { Box, Typography, CircularProgress, Paper, } from '@mui/material';
import ChangePage from '../components/ChangePage';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';




function ViewLargeFC() {
  const { id } = useParams();
  const [flowData, setFlowData] = useState<any>(null);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await apiClient.get(`/api/flowcharts/${id}`);
        setFlowData(res.data);
      } catch (err) {
        console.error(err);
        alert("データの取得に失敗しました");
      }
    };
    fetchOne();
  }, [id]);

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
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        width: '80vw',
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
        <Paper sx={{ height: '80vh', width: '80vw', borderRadius: '16px', overflow: 'hidden', boxShadow: 3, mb: 3 }}>
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
        </Paper>
      </Box>

      <Typography
        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: "700",
          fontSize: { xs: '1.5rem', md: '2rem' },
          color: 'rgba(255, 255, 255)',
          mt: 3, mb: 0, ml: 1,
          width: '70vw',
          mx: 'auto',
          textAlign: 'left',
        }}
      >
        Description: {flowData.description}<br />
        Uploaded by: {flowData.username}<br />
        Uploaded at: {flowData.date}
      </Typography>
      <ChangePage />
    </>
  );
}

export default ViewLargeFC;