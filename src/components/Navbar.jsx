import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import navbarData from "../content/navbar.json";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Typography,
  Drawer,
  AppBar,
  Toolbar,
  Box,
  List,
  useMediaQuery,
  useTheme,
  useScrollTrigger,
  Slide,
  styled,
} from "@mui/material";
import { Link } from "react-scroll";
import { StyledAnchorLink } from "./SideAnchorLinks"
import {
  emailSvgPath,
  githubSvgPath,
  linkedInSvgPath,
  whatsappSvgPath
} from "./SvgHelper";

const resumePath = "/Aswanth_Resume.pdf";

const StyledAppBarContainer = styled("div")(({ theme }) => ({
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "center",
  placeSelf: "center",
  justifyContent: "center",
  maxWidth: "1200px",
  width: "90vw !important",
  [theme.breakpoints.down("sm")]: {
    width: "100vw !important",
  },
}));

const StyledAppBar = styled(AppBar, {
  shouldComponentUpdate: true,
  label: 'StyledAppBar'
})(({ theme, $isScrolled }) => ({
  transition:
    "all 0.4s cubic-bezier(0.645,0.045,0.355,1), background-color 0ms !important",
  transitionDelay: "0.1s",
  boxShadow: $isScrolled
    ? "1px 0px 4px -1px rgb(0 0 0 / 20%), 0px 2px 20px 0px rgb(0 0 0 / 14%), 1px -1px 12px 0px rgb(0 0 0 / 12%) !important"
    : "none !important",
  backgroundColor: theme.palette.background.main + " !important",
  padding: $isScrolled ? "0.5rem 5rem 0.5rem 5rem" : "2rem 5rem 2rem 5rem",
  [theme.breakpoints.down("sm")]: {
    padding: $isScrolled ? "0.5rem 2rem 0.5rem 2rem" : "1rem 2rem 1rem 2rem",
  },
}));

const StyledAppBarLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "& p": {
    color: theme.palette.textMain.main + " !important",
    transform: "none",
    transition: "transform 150ms ease-in-out 0s !important",
    cursor: "pointer",
    fontSize: "1.2rem",
    padding: "0.5rem",
    "&:hover": {
      color: theme.palette.textSecondary.main + " !important",
      transform: "translateY(-2px)",
    },
  },
}));

const StyledAppBarButton = styled(Button)(({ theme }) => ({
  padding: "10px 8px",
  color: theme.palette.textMain.main + " !important",
  transform: "none",
  transition: "transform 150ms ease-in-out 0s !important",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.textSecondary.main + " !important",
    transform: "translateY(-2px)",
  },
}));

const StyledAppBarDrawerLink = styled(Link)(({ theme }) => ({
  "& p": {
    animation: "fadeIn",
    animationDuration: "2s",
    color: theme.palette.textMain.main + " !important",
    cursor: "pointer",
    fontSize: "1.75rem",
    padding: "0",
    "&:hover": {
      color: theme.palette.textSecondary.main + " !important",
    },
  },
}));

const StyledResumeLink = styled("a")(({ theme }) => ({
  cursor: "pointer",
  textDecoration: "none",
  "& p": {
    borderRadius: "8px !important",
    padding: "0.25rem 0.5rem",
    fontSize: "1.2rem",
    backgroundColor: theme.palette.backgroundSecondary.main + " !important",
    color: "#FFFFFF",
    transition: "background-color 200ms ease-in-out 0s !important",
    "&:hover": {
      backgroundColor: theme.palette.buttonHover.main + " !important",
    },
  },
}));

const StyledDrawerIcon = styled(MenuIcon)(({ theme }) => ({
  color: theme.palette.textMain.main,
  fontSize: "2rem !important",
  zIndex: "3 !important",
}));

const StyledDrawerCloseIcon = styled(CloseIcon)(({ theme }) => ({
  animation: "fadeIn",
  animationDuration: "1s",
  position: "fixed",
  top: "32px",
  right: "32px",
  color: theme.palette.textMain.main,
  fontSize: "2rem !important",
  zIndex: "3 !important",
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& div.MuiPaper-root": {
    background: "transparent",
    backdropFilter: "blur(10px)",
    height: "100vh !important",
    boxShadow: "none !important",
    textAlign: "center",
    justifyContent: "center",
    color: theme.palette.textMain.main,
    zIndex: "2 !important",
  },
}));

const StyledDrawerList = styled(List)(({ theme }) => ({
  display: "flex",
}));

const StyledSocialLinksContainer = styled(Box)({
  display: "flex",
  justifyContent: "center", 
  alignItems: "center",
  gap: "1.5rem", 
  padding: "1rem 0", 
});

//End component style//

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const MuiTheme = useTheme();
  const collapse = useMediaQuery(MuiTheme.breakpoints.down("sm"));

  //disable animations on appbar after they have animated once
  useEffect(() => {
    setTimeout(() => {
      setHasAnimated(true);
    }, 1000);
  }, []);

  //capture window scroll height for changing navbar styles
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //save the user's selected color theme choice
  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  //hide the AppBar when scrolling down
  const trigger = useScrollTrigger({
    target: window,
  });

  const toggleDrawer = (isOpen) => (event) => {
    event.preventDefault();
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(isOpen);
  };

 

  const drawer = (
    <>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          animation: !hasAnimated ? "fadeIn" : "none",
          animationDuration: "2s",
        }}
      >
        <StyledDrawerIcon />
      </Button>

      <StyledDrawer
        anchor={"top"}
        variant="temporary"
        transitionDuration={1}
        disableScrollLock={true}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <Button onClick={toggleDrawer(false)}>
          <StyledDrawerCloseIcon />
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <StyledDrawerList>
            <StyledResumeLink href={resumePath} target="_blank">
              <Typography
                sx={{
                  padding: "0.5rem 1rem !important",
                  fontSize: "1.75rem !important",
                  transition:
                    "opacity 600ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms ease-in-out 0s !important",
                  animation: "fadeIn",
                  animationDuration: "2s",
                }}
              >
                Resume
              </Typography>
            </StyledResumeLink>
          </StyledDrawerList>

          {navbarData.map((data) => (
            <StyledDrawerList key={data.id}>
              <StyledAppBarDrawerLink
                onClick={toggleDrawer(false)}
                to={data.name}
                smooth={true}
                duration={1000}
              >
                <Typography>{data.name}</Typography>
              </StyledAppBarDrawerLink>
            </StyledDrawerList>
          ))}
          <StyledSocialLinksContainer>
          <StyledAnchorLink
            href="https://www.linkedin.com/in/aswanth-narayanan/"
            target="_blank"
            aria-label="LinkedIn"
          >
            <svg
              fill={"#ffff"}
              width="44px"
              height="44px"
              viewBox="-5.5 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>LinkedIn</title>
              <path d={linkedInSvgPath} />
            </svg>
          </StyledAnchorLink>
          <StyledAnchorLink
            href="https://github.com/aswanthnarayan"
            target="_blank"
            aria-label="Github"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="44px"
              height="44px"
              fillRule="evenodd"
              fill={"#ffff"}
            >
              <title>Github</title>
              <path fillRule="evenodd" d={githubSvgPath} />
            </svg>
          </StyledAnchorLink>
          <StyledAnchorLink
            href="mailto:aswanthnarayanan@gmail.com"
            sx={{ transform: "scale(0.90)" }}
          >
            <svg
              fill={"#ffff"}
              height="44px"
              width="44px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 75.294 75.294"
              xmlSpace="preserve"
            >
              <title>Email</title>
              <g>
                <path d={emailSvgPath} />
              </g>
            </svg>
          </StyledAnchorLink>
          <StyledAnchorLink
            href="https://wa.me/918592837949"
            target="_blank"
            aria-label="WhatsApp"
          >
            <svg
              fill={"#ffff"}
              width="44px"
              height="44px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>WhatsApp</title>
              <path d={whatsappSvgPath} />
            </svg>
          </StyledAnchorLink>
          </StyledSocialLinksContainer>
        </Box>
      </StyledDrawer>
    </>
  );

  const navbar = (
    <>
     
      {navbarData.map((data) => (
        <div
          key={data.id}
          className={
            !hasAnimated ? "animate__animated animate__fadeInDown" : ""
          }
        >
          <StyledAppBarLink
            href={`#${data.name}`}
            to={data.name}
            smooth={true}
            duration={1000}
          >
            <Typography>{data.name}</Typography>
          </StyledAppBarLink>
        </div>
      ))}
      <div
        style={{ paddingLeft: "4px" }}
        className={!hasAnimated ? "animate__animated animate__fadeInDown" : ""}
      >
        <StyledResumeLink href={resumePath} target="_blank">
          <Typography>Resume</Typography>
        </StyledResumeLink>
      </div>
    </>
  );

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <StyledAppBar position="fixed" $isScrolled={isScrolled}>
        <StyledAppBarContainer>
          <Toolbar>
            <Typography
              variant="h6"
              style={{
                flexGrow: 1,
              }}
            >
              <svg
  viewBox="0 0 59 58"
  style={{
    width: "44px",
    animation: !hasAnimated
      ? collapse
        ? "fadeIn"
        : "fadeInDown"
      : "none",
    animationDuration: collapse ? "2s" : "1s",
  }}
>
  <path
    d="M 10,50 L 30,10 L 50,50 M 20,35 L 40,35"
    fill="none"
    stroke={MuiTheme.palette.textMain.main} // Uses theme color
    strokeWidth="8" 
    strokeLinecap="round" // Smooth stroke edges
    strokeLinejoin="round" // Clean corner joins
  />
</svg>

            </Typography>
            {collapse ? drawer : navbar}
          </Toolbar>
        </StyledAppBarContainer>
      </StyledAppBar>
    </Slide>
  );
};

export default Navbar;
