const React = require("react")
const {ThemeContext} = require("css-system")

const SwitchThemeContext = React.createContext(["", () => {}])

exports.SwitchThemeContext = SwitchThemeContext

const useSwitchTheme = () => React.useContext(SwitchThemeContext)

exports.useSwitchTheme = useSwitchTheme

const SwitchThemeProvider = ({themes, defaultTheme, children}) => {
  const [themeKey, setThemeKey] = React.useState(undefined)

  React.useEffect(() => {
    const initialTheme = window.document.documentElement.style.getPropertyValue(
      "--gatsby-plugin-css-system-theme"
    )

    if (themes[initialTheme]) {
      setThemeKey(initialTheme)
    }
  }, [])

  const switchTheme = React.useCallback(
    (newThemeKey) => {
      if (themes[newThemeKey]) {
        setThemeKey(newThemeKey)
        window.document.documentElement.style.setProperty(
          "--gatsby-plugin-css-system-theme",
          themeKey
        )
        window.localStorage.setItem(
          "gatsby-plugin-css-system-theme",
          newThemeKey
        )
      }
    },
    [themes]
  )

  const contextValue = React.useMemo(() => [themeKey, switchTheme], [
    themeKey,
    switchTheme,
  ])

  return (
    <SwitchThemeContext.Provider value={contextValue}>
      <ThemeContext.Provider value={themes[themeKey]}>
        {children}
      </ThemeContext.Provider>
    </SwitchThemeContext.Provider>
  )
}

exports.SwitchThemeProvider = SwitchThemeProvider
