import { Link } from "react-router-dom";

function ViewLargeFC():any {
  return (
    <>
    <h1>フローチャートを拡大してみる画面</h1>
    <Link to="/signin">Go to Signin</Link>
    <Link to="/create">Go to create</Link>
    <Link to="/view">Go to View</Link>
    <Link to="/view-details">Go to detail</Link>
    </>
  )
}

export default ViewLargeFC;