import { Link } from "react-router-dom";

function Login():any {
  return (
    <>
    <h1>Login</h1>
    <Link to="/signin">Go to Signin</Link>
    <Link to="/create">Go to Create</Link>
    
    </>
  )
}

export default Login;