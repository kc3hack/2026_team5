import { Typography } from "@mui/material";
import { motion } from "framer-motion";

function Title():any {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontFamily: '"M PLUS Rounded 1c", sans-serif',
          fontWeight: 700, 
          fontSize: 100,
          color: 'rgba(255, 255, 255, 0.6)',
          width: '65vw',
          mx: 'auto',
          textAlign: 'left',
          transform: 'translateX(-55px)', 
        }}
        component={motion.div}
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.2,
        }}
       
      >
        エラベル
      </Typography>
    </>
  )
}

export default Title;