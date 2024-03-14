import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define la interfaz para el contexto del tema
export interface ThemeContextType {
  theme: string;
  toggleDarkMode: () => void;
}

// Crea el contexto del tema y establece su tipo como ThemeContextType
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define una interfaz para el componente ThemeProvider
interface ThemeProviderProps {
  children: ReactNode; // children puede ser cualquier nodo de React
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => {
    const storedMode = localStorage.getItem("mode");
    return storedMode ? storedMode : "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("mode", theme);
      document.querySelector("html")?.classList.add("dark");
    } else {
      localStorage.setItem("mode", theme);
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
