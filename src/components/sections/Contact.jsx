import React ,{useState} from "react";
import emailjs from '@emailjs/browser';

import {
  Typography,
  TextField,
  Button,
  styled,
  Container,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as Scroll from "react-scroll";
import { toast } from "react-hot-toast";


const StyledContactRoot = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.main,
  minHeight: "100vh",
  padding: "4rem 2rem",
  [theme.breakpoints.down("sm")]: {
    padding: "0rem 0rem",
  },
}));

const StyledContactContainer = styled(Container)(({ theme }) => ({
  display: "flex !important",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.main,
  borderRadius: "2rem",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: "3rem",
  maxWidth: "600px !important",
  width: "100%",
}));

const StyledContactTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold !important",
  color: theme.palette.textMain.main,
  fontSize: "clamp(34px, 4vw, 55px) !important",
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const StyledContactText = styled(Typography)(({ theme }) => ({
  color: theme.palette.textMain.main,
  fontSize: "clamp(20px, 2vw, 26px) !important",
  textAlign: "center",
  marginBottom: theme.spacing(3),
}));

const StyledContactButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "1rem",
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: theme.palette.textMain.main,
  background: `linear-gradient(135deg, ${theme.palette.backgroundSecondary.main} 20%, ${theme.palette.textSecondary.main} 80%)`, 
  borderRadius: "1rem",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  marginTop: theme.spacing(2),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  position: "relative",
  overflow: "hidden",
  
  // ✅ Fix: Match border with background to prevent visible edge
  border: `2px solid ${theme.palette.backgroundSecondary.main}`,  

  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.textSecondary.main} 20%, ${theme.palette.backgroundSecondary.main} 80%)`,
    transform: "scale(1.02)",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.25)",
    border: `2px solid ${theme.palette.textSecondary.main}`, // ✅ Smooth transition without visible border before hover
  },

  "&:active": {
    transform: "scale(0.99)",
    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
  },

  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.05)",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
  },

  "&:hover::before": {
    opacity: 0.5,
  },
}));




const Contact = () => {
  const [contactContainer, contactContainerInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


const handleSubmit = (event) => {
  event.preventDefault();

  if (name.trim().length < 3) {
    toast.error("Name must be at least 3 characters");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    toast.error("Invalid email format");
    return;
  }

  if (message.trim().length < 10) {
    toast.error("Message must be at least 10 characters");
    return;
  }
  setLoading(true);

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };

  try {
     emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    toast.success("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  } catch (error) {
    toast.error("Failed to send message. Please try again.");
  } finally {
    setLoading(false); 
  }
};

  


  return (
    <Scroll.Element name="Contact">
      <StyledContactRoot>
        <StyledContactContainer
          ref={contactContainer}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={contactContainerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <StyledContactTitle variant="h4">Get in Touch</StyledContactTitle>
          <StyledContactText variant="body1">
            Fill out the form below, and I'll get back to you soon.
          </StyledContactText>
          <TextField
            fullWidth
            label="Name"
            value={name}
            variant="outlined"
            margin="dense"
            sx={{
              "& .MuiInputBase-input": {
                color: (theme) => theme.palette.textSecondary.main, 
              },
              "& .MuiInputLabel-root": {
                color: (theme) => theme.palette.textSecondary.main, 
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent", 
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.textSecondary.main, 
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.textSecondary.main, 
                  borderWidth: "2px", 
                },
              },
            }}
            onChange={(event) => setName(event.target.value)} 
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            margin="dense"
            sx={{
              "& .MuiInputBase-input": {
                color: (theme) => theme.palette.textSecondary.main, 
              },
              "& .MuiInputLabel-root": {
                color: (theme) => theme.palette.textSecondary.main, 
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent", 
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.textSecondary.main, 
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.textSecondary.main, 
                  borderWidth: "2px", 
                },
              },
            }}
            onChange={(event) => setEmail(event.target.value)} 
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            value={message}
            margin="dense"
            multiline
            rows={4}
            sx={{
              "& .MuiInputBase-input": {
                color: (theme) => theme.palette.textSecondary.main, 
              },
              "& .MuiInputLabel-root": {
                color: (theme) => theme.palette.textSecondary.main, 
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent", 
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.textSecondary.main, 
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.textSecondary.main, 
                  borderWidth: "2px", 
                },
              },
            }}
            onChange={(event) => setMessage(event.target.value)} 
          />
          <StyledContactButton variant="contained" size="large" onClick={handleSubmit} disabled={loading}>
  {loading ? <CircularProgress size={24} color="inherit" /> : "Send Message"}
</StyledContactButton>
        </StyledContactContainer>
      </StyledContactRoot>
    </Scroll.Element>
  );
};

export default Contact;
