import { Typography, Box } from "@mui/material";
import AuthForm from "../components/AuthForm";

function Login():any {
  return (
    <Box sx={{ pt: 4, pb: 4 }}>
       <Typography
        variant="h1"
        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: 700, 
          fontSize: { xs: '1.5rem', md: '2rem' },
          color: 'rgba(255, 255, 255, 0.6)',
          mt: 0, mb: 4, 
          width: '65vw',
          mx: 'auto',
          textAlign: 'center',
      
        }}
       
      >
        ログイン
      </Typography>
      {/*ログイン専用モードとして部品を呼び出す*/}
      <AuthForm initialMode="login"isPopup={false} />
      </Box>   
  );
}

export default Login;