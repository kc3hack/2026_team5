import { useState } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import FlowEditor from "../components/FC";
import Tooltip from '@mui/material/Tooltip';
import ChangePage from "../components/ChangePage";
import Fab from '@mui/material/Fab';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/HelpOutline';
import PhotoIcon from '@mui/icons-material/ArrowCircleDown';
import { Paper, Typography, TextField, Box } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
import { apiClient } from '../api/client';

function CreateFC(): any {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      alert("タイトルを入力してください！");
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
        alert('フローチャートを保存しました！');
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

        <Stack direction="row" spacing={2} sx={{ position: 'fixed', left: '51.2%', transform: 'translateX(-50%)', zIndex: 1000, }}>
          <Tooltip title="ボタンを押して投稿" placement="top">
            {/* ★追加3：onClick={handleSave} を追加してボタンと繋げた！ */}
            <Fab
              variant="extended"
              color="info"
              aria-label="add"
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              onClick={handleSave}
            >
              <UploadIcon sx={{ mr: 1 }} />
              submit
            </Fab>
          </Tooltip>

          <Tooltip title="全て削除" placement="top">
            <Fab
              variant="extended"
              color="error"
              aria-label="add"
              onClick={handleReset}
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}

            >
              <DeleteIcon sx={{ mr: 1 }} />
              delete
            </Fab>
          </Tooltip>

          <Tooltip title="操作のhelpを表示" placement="top">
            <Fab variant="extended" color="success" aria-label="add" onClick={handleClickOpen} component={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}>
              <HelpIcon sx={{ mr: 1 }} />
              manual
            </Fab>
          </Tooltip>

          <Tooltip title="フローチャートを撮影(未実装)" placement="top">
            <Fab variant="extended" color="default" aria-label="add" component={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}>
              <PhotoIcon sx={{ mr: 1 }} />
              download
            </Fab>
          </Tooltip>
        </Stack>

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
                <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #eee' }} />
                <li><b>フローチャートの保存：</b>画面左下の「submit」ボタンをクリックして、現在のフローチャートを保存します。</li>
                <li><b>フローチャートの削除：</b>画面左下の「delete」ボタンをクリックして、現在のフローチャートを全て削除します。</li>
                <li><b>フローチャートのダウンロード：</b>画面右下の「download」ボタンをクリックして、現在のフローチャートを画像としてダウンロードします。</li>
                <li><b>操作方法の表示：</b>画面右下の「manual」ボタンをクリックして、フローチャートの操作方法を表示します。</li>

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