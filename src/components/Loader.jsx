import { React, useState, useEffect } from "react";
import { useTheme, styled } from "@mui/material";
import { motion } from "framer-motion";
import "animate.css";

//Component styles
const StyledLoaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  position: "fixed",
  backgroundColor: theme.palette.background.main,
}));

//End Component styles

const pathVariants = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "linear",
    },
  },
};

const Loader = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setHasLoaded(true);
    }, 1800);
  }, []);

  return (
    <StyledLoaderContainer>
      <div className={hasLoaded ? "animate__animated animate__fadeOut" : ""}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 180 160"
          width="12rem"
          initial="hidden"
          animate="visible"
        >
         <motion.path
  d="M 50,130 L 100,20 L 150,130 M 80,90 L 120,90"
  fill="none"
  stroke={theme.palette.textMain.main}
  strokeWidth="10"
  strokeLinecap="round"
  strokeLinejoin="round"
  variants={pathVariants}
/>


        </motion.svg>
      </div>
    </StyledLoaderContainer>
  );
};

export default Loader;
