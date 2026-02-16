import FlowEditor from "../components/FC";
import DecideButton from "../components/DecideButton";
import Tooltip from '@mui/material/Tooltip';
import ChangePage from "../components/ChangePage";

function CreateFC():any {
  return (
    <>
    <h1>フローチャートを作る画面</h1>
    <FlowEditor />
    <Tooltip title="ボタンを押して投稿" placement="top">
    <div style={{ position:'fixed',
     bottom: '20px' ,
        right: '20px' ,
    }}>
    <DecideButton />
    </div>
    </Tooltip>
    <ChangePage />
    </>
  )
}

export default CreateFC;