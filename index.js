const React = require("react");
const { ThemeContext } = require("css-system");

const SwitchThemeContext = React.createContext(["", () => {}]);

exports.SwitchThemeContext = SwitchThemeContext;

const useSwitchTheme = () => React.useContext(SwitchThemeContext);

exports.useSwitchTheme = useSwitchTheme;

const SwitchThemeProvider = ({ themes, defaultTheme, children }) => {
  const [themeKey, setThemeKey] = React.useState(defaultTheme);

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem(
      "gatsby-plugin-css-system-theme"
    );
    if (themes[storedTheme]) {
      setThemeKey(storedTheme);
    }
  }, []);

  const switchTheme = React.useCallback(
    newThemeKey => {
      if (themes[newThemeKey]) {
        setThemeKey(newThemeKey);
        window.localStorage.setItem(
          "gatsby-plugin-css-system-theme",
          newThemeKey
        );
      }
    },
    [themes]
  );

  const contextValue = React.useMemo(() => [themeKey, switchTheme], [
    themeKey,
    switchTheme
  ]);

  return (
    <SwitchThemeContext.Provider value={contextValue}>
      <ThemeContext.Provider value={themes[themeKey]}>
        {children}
      </ThemeContext.Provider>
    </SwitchThemeContext.Provider>
  );
};

exports.SwitchThemeProvider = SwitchThemeProvider;
