import { createContext, useState, useEffect, SetStateAction, Dispatch } from "react";

interface ThemeContextValues {
  theme: string;
  toggleTheme: () => void;
  setTheme: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextValues>({
  theme: "",
  toggleTheme: () => {},
  setTheme: () => {}
});

interface Properties {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<Properties> = ({ children }) => {
  const selectedTheme = localStorage.getItem("theme");
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [theme, setTheme] = useState(
    selectedTheme || (prefersDarkMode ? "dark" : "light")
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };