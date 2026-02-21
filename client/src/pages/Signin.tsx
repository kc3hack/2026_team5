import { Typography } from "@mui/material";


function Signin(): any {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: 700,
          fontSize: 50,
          color: 'rgba(255, 255, 255, 0.6)',
          mt: 0, mb: 1,
          width: '65vw',
          mx: 'auto',
          textAlign: 'center',

        }}

      >
        SignIn
      </Typography>
    </>
  )
}

export default Signin;