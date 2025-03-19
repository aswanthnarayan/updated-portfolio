import React from "react";
import { Typography, styled } from "@mui/material";
import {
  StyledGenericContainer,
  StyledGenericRoot,
  StyledGenericTitle,
  StyledDivider,
} from "./Styles";
import {
  Code,
  Storage,
  Terminal,
  Cloud,
  Psychology,
} from "@mui/icons-material";
import Dns from '@mui/icons-material/Dns';
import { useInView } from "react-intersection-observer";
import * as Scroll from "react-scroll";

// Styled Components

const iconMap = {
  Code: <Code fontSize="large" />,
  Storage: <Storage fontSize="large" />,
  Terminal: <Terminal fontSize="large" />,
  Cloud: <Cloud fontSize="large" />,
  Dns: <Dns fontSize="large" />,
  Psychology: <Psychology fontSize="large" />,
};

const StyledSkillGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1.5rem",
  marginBottom: "3rem",
  width: "100%",
}));

const StyledSkillCard = styled("div")(({ theme }) => ({
  borderRadius: "2rem !important",
  padding: "2rem",
  backgroundImage: `radial-gradient(ellipse at center, ${theme.palette.backgroundSecondary.main}10, ${theme.palette.backgroundSecondary.main}40)`,
  maxWidth: "75%",
  border: `0.25rem solid ${theme.palette.backgroundSecondary.main}70`,
  transition: "all 0.3s ease-in-out",
  transform: "scale(1)",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Default soft shadow
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: `0px 0px 20px 1px ${theme.palette.textSecondary.main}AA`, 
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1.25rem",
  },
}));


const StyledSkillHeader = styled("div")(({ theme }) => ({
  color: theme.palette.textMain.main,
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "1rem",
}));

const StyledSkillItem = styled("span")(({ theme }) => ({
  display: "inline-block",
  background: theme.palette.backgroundSecondary.main,
  padding: "0.5rem 1rem",
  borderRadius: "8px",
  fontSize: "0.9rem",
  color: theme.palette.textMain.main,
  margin: "0.3rem",
}));

const Skill = ({ skills }) => {
  const [skillsContainer, skillsContainerInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <Scroll.Element name="Skills">
      <StyledGenericRoot>
        <StyledGenericContainer
          ref={skillsContainer}
          sx={
            skillsContainerInView
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
          className={
            skillsContainerInView ? "animate__animated animate__fadeInUp" : ""
          }
        >
          <StyledGenericTitle component="h1">
            Skills & Expertise
            <StyledDivider />
          </StyledGenericTitle>
          <StyledSkillGrid>
            {skills.map((category, index) => (
              <StyledSkillCard key={index}>
                <StyledSkillHeader>
                {iconMap[category.icon] || <Code fontSize="large" />} {/* Default to Code icon if missing */}
                  <Typography variant="h6">{category.title}</Typography>
                </StyledSkillHeader>
                <div>
                  {category.items.map((skill, i) => (
                    <StyledSkillItem key={i}>{skill}</StyledSkillItem>
                  ))}
                </div>
              </StyledSkillCard>
            ))}
          </StyledSkillGrid>
        </StyledGenericContainer>
      </StyledGenericRoot>
    </Scroll.Element>
  );
};

export default Skill;
