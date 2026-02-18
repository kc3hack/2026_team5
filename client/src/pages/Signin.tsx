import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Signin():any {
  return (
    <>
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
          textAlign: 'center',
      
        }}
       
      >
        signin(製作中)
      </Typography>
    <Link to="/login">Go to Login</Link>
    <Link to="/create">Go to Create</Link>
    </>
  )
}

export default Signin;