import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import Main from "./components/Main.jsx";
import NotFound404 from "./components/NotFound404.jsx";
import { Theme } from "./Theme";

function App() {
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem("theme") || "light";
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={Theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
