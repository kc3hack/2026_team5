import { Link } from "react-router-dom";
import FlowEditor from "../commponents/FC";

function CreateFC():any {
  return (
    <>
    <h1>フローチャートを作る画面</h1>
    <FlowEditor />
    <Link to="/create">Go to create\n</Link>
    <Link to="/view">Go to View\n</Link>
    <Link to="/view-details">Go to detail</Link>

  
    </>
  )
}

export default CreateFC;