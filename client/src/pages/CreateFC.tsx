import { useState } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import FlowEditor from "../components/FC";
import ChangePage from "../components/ChangePage";
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/HelpOutline';
import PhotoIcon from '@mui/icons-material/ArrowCircleDown';
import { Paper, Typography, TextField, Box, SpeedDial, Backdrop, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { apiClient } from '../api/client';
import React from 'react';


function CreateFC(): any {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);




  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
    setNodes([]);
    setEdges([]);
    setTitle("");
    setDescription("");
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = async () => {
    if (!title) {
      alert("タイトルを入力してください");
      return;
    }

    try {
      const payload = {
        title: title,
        description: description,
        flow_data: {
          nodes: nodes,
          edges: edges
        }
      };

      const response = await apiClient.post('/api/flowcharts', payload);

      if (response.status === 200 || response.status === 201) {
        alert('フローチャートを投稿しました！');
      }
    } catch (error) {
      console.error('保存エラー:', error);
      alert('バックエンドと通信できませんでした。サーバーが動いているか確認してください。');
    }
  };

  return (
    <>
      {/*  <motion.div
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
        variant="h1"
        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: 700,
          fontSize: { xs: '1.5rem', md: '2rem' },
          color: 'rgba(255, 255, 255, 0.6)',
          mt: 0, mb: 1,
          width: '65vw',
          mx: 'auto',
          textAlign: 'left',
          transform: 'translateX(-55px)',
        }}

      >
        Create a Flowchart
      </Typography>

      <Box sx={{ width: '65vw', mx: 'auto', mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ flex: 1, input: { color: 'white' }, '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' } }}
        />
        <TextField
          placeholder="Description"
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ flex: 2, input: { color: 'white' }, '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' } }}
        />
      </Box>

      <Paper elevation={3} sx={{ mb: -4, borderRadius: '16px', overflow: 'hidden' }}>

        <FlowEditor
          key={resetKey}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          setNodes={setNodes}
          setEdges={setEdges}
        />


        <Backdrop open={open2} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: 'absolute', bottom: 70, right: 80, fontSize: "40" }}
          icon={<SpeedDialIcon />}
          onClose={handleClose2}
          onOpen={handleOpen2}
          open={open2}
        >



          <SpeedDialAction
            icon={<UploadIcon color="info" />}
            tooltipTitle="投稿"
            onClick={() => { handleClose2(); handleSave(); }}
          />
          <SpeedDialAction
            icon={<DeleteIcon color="error" />}
            tooltipTitle="全て削除"
            onClick={() => { handleClose2(); handleReset(); }}
          />
          <SpeedDialAction
            icon={<HelpIcon color="success" />}
            tooltipTitle="操作Help"
            onClick={() => { handleClose2(); handleClickOpen(); }}
          />
          <SpeedDialAction
            icon={<PhotoIcon color="action" />}
            tooltipTitle="撮影(未実装)"
            onClick={() => { handleClose2(); }}
          />

        </SpeedDial>

        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"操作方法"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <ul style={{ paddingLeft: '20px', lineHeight: '2.0', margin: 0 }}>

                <li><b>ノードの追加：</b>画面上部の「Add Node」ボタンをクリックして、ノードを追加します。</li>
                <li><b>ノードの削除：</b>削除したいノードをクリックして選択し、キーボードの「Delete」キーを押すと、選択したノードが削除されます。</li>
                <li><b>ノードの移動：</b>ノードをクリックしてドラッグすることで、ノードの位置を変更できます。</li>
                <li><b>ノードの編集：</b>ノードをダブルクリックすると、ノードの内容を編集できます。</li>
                <li><b>ノードの接続：</b>ノードの端にある小さな円をドラッグして、他のノードの端にドロップすることで、ノード同士を接続できます。</li>
                <li><b>YES,NOの追加：</b>ノードを選択した状態でYESを追加ボタンを押すと、YESの線のついたノードが生成されます。NOも同様です。</li>
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>閉じる</button>
          </DialogActions>
        </Dialog>


        <ChangePage />

      </Paper>


    </>
  )
}

export default CreateFC;