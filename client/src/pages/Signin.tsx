import { Link } from "react-router-dom";

function Signin():any {
  return (
    <>
    <h1>Signin</h1>
    <Link to="/login">Go to Login</Link>
    <Link to="/create">Go to Create</Link>
    </>
  )
}

export default Signin;