import { Link } from "react-router-dom";

function ViewFC():any {
  return (
    <>
    <h1>フローチャートを閲覧する画面</h1>
    <Link to="/create">Go to create</Link>
    <Link to="/view">Go to View</Link>
    <Link to="/view-details">Go to detail</Link>
    </>
  )
}

export default ViewFC;