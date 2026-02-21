import { Typography, Box } from "@mui/material";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function Signin(): any {
  return (
    <Box sx={{ pt: 4, pb: 4 }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        <KeyboardBackspaceIcon sx={{ color: 'white', fontSize: '2.5rem', mr: 2 }} />
      </Link>
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
        サインイン
      </Typography>

      {/* サインイン専用モードとして部品を呼び出す（今回はスペースを空けておきました！） */}
      <AuthForm initialMode="signup" isPopup={false} />

    </Box>
  );
}

export default Signin;