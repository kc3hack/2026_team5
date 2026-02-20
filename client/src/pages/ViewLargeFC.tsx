import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { apiClient } from '../api/client';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';

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
    <Box sx={{ height: '100vh', width: '100vw', bgcolor: '#1e1e1e' }}>

      <Paper sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10, p: 2, bgcolor: 'rgba(255,255,255,0.9)' }}>
        <Typography variant="h5" fontWeight="bold">{flowData.title}</Typography>
        <Typography variant="body2">{flowData.description}</Typography>
      </Paper>


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
  );
}

export default ViewLargeFC;