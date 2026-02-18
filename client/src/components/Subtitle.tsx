import { Typography } from "@mui/material";
import { motion } from "framer-motion";

function SubTitle():any {
  return (
    <>
      <Typography
        variant="h1"
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
            delay: 1,
            ease: "easeInOut",
        }}
       
      >
        -新感覚フローチャート共有SNS-
      </Typography>
    </>
  )
}

export default SubTitle;