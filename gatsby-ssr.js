const React = require("react")
const Terser = require("terser")
const {
  ServerStyleSheetManager,
  StyleSheetManagerContext,
  ThemeContext,
} = require("css-system")
const {SwitchThemeProvider} = require("./index.js")

const stylesheets = new Map()

const StyleSheetProvider = ({children, pathname}) => {
  const stylesheetManager = new ServerStyleSheetManager()

  stylesheets.set(pathname, stylesheetManager)

  return (
    <StyleSheetManagerContext.Provider value={stylesheetManager}>
      {children}
    </StyleSheetManagerContext.Provider>
  )
}

exports.wrapRootElement = ({element, pathname}, pluginOptions = {}) => {
  if (pluginOptions.theme) {
    return (
      <ThemeContext.Provider value={pluginOptions.theme}>
        <StyleSheetProvider pathname={pathname}>{element}</StyleSheetProvider>
      </ThemeContext.Provider>
    )
  }

  if (pluginOptions.themes) {
    return (
      <ThemeContext.Provider
        value={pluginOptions.themes[pluginOptions.defaultTheme]}
      >
        <StyleSheetProvider pathname={pathname}>{element}</StyleSheetProvider>
      </ThemeContext.Provider>
    )
  }

  return <StyleSheetProvider pathname={pathname}>{element}</StyleSheetProvider>
}

function setInitialTheme() {
  const mql = window.matchMedia("(prefers-color-scheme: dark)")
  const prefersDarkFromMQ = mql.matches

  const persistedThemeKey = window.localStorage.getItem(
    "gatsby-plugin-css-system-theme"
  )

  let themeKey = "light"

  const hasUsedToggle = typeof persistedThemeKey === "string"

  if (hasUsedToggle) {
    themeKey = persistedThemeKey
  } else {
    themeKey = prefersDarkFromMQ ? "dark" : "light"
  }

  window.document.documentElement.style.setProperty(
    "--gatsby-plugin-css-system-theme",
    themeKey
  )
}

const MagicScriptTag = () => {
  const fn = String(setInitialTheme)
  const calledFunction = `(${fn})()`
  const calledFunctionMinified = Terser.minify(calledFunction).code

  return <script dangerouslySetInnerHTML={{__html: calledFunctionMinified}} />
}

exports.onRenderBody = ({
  setHeadComponents,
  setPreBodyComponents,
  pathname,
}) => {
  const stylesheetManager = stylesheets.get(pathname)

  if (stylesheetManager) {
    setHeadComponents(stylesheetManager.getStyleComponents())
    setPreBodyComponents(<MagicScriptTag />)
    stylesheets.delete(pathname)
  }
}
