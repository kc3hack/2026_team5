import Title from "../components/title";
import Subtitle from "../components/Subtitle";
import { Typography } from "@mui/material";
import { motion }  from "framer-motion";
import { Link } from "react-router-dom";

function Home():any {
  return (
    <>
    <Title />
    <Subtitle />
    <Typography

        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: 700, 
          fontSize: 50,
          color: 'rgba(255, 255, 255, 0.6)',
          width: '65vw',
          mx: 'auto',
          textAlign: 'left',
          transform: 'translateX(-55px)', 
        }}
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.8,
            delay: 1.2,
            ease: "easeInOut",
        }} 
      >
        <Link to="/login" style={{ 
                textDecoration: 'none', 
                color: 'inherit'  
            }}>-LogIn</Link >
            
         
      </Typography>
      <Typography
        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: 700, 
          fontSize: 50,
          color: 'rgba(255, 255, 255, 0.6)',
          width: '65vw',
          mx: 'auto',
          textAlign: 'left',
          transform: 'translateX(-55px)', 
        }}
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.8,
            delay: 1.4,
            ease: "easeInOut",
        }}
       
      >
        <Link to="/signin" style={{ 
                textDecoration: 'none', 
                color: 'inherit'  
            }}>-SignIn</Link >
      </Typography>
      <Typography

        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: 700, 
          fontSize: 50,
          color: 'rgba(255, 255, 255, 0.6)',
          width: '65vw',
          mx: 'auto',
          textAlign: 'left',
          transform: 'translateX(-55px)', 
        }}
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.8,
            delay: 1.6,
            ease: "easeInOut",
        }}
       
      >
        <Link to="/view" target ='_blank' style={{ 
                textDecoration: 'none', 
                color: 'inherit'  
            }}>-View</Link >
      </Typography>
    </>
  )
}

export default Home;