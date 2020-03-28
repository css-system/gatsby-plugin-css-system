const React = require("react");
const { ThemeContext } = require("css-system");
const { SwitchThemeProvider } = require("./index.js");

exports.wrapRootElement = ({ element }, pluginOptions = {}) => {
  if (pluginOptions.theme) {
    return (
      <ThemeContext.Provider value={pluginOptions.theme}>
        {element}
      </ThemeContext.Provider>
    );
  }

  if (pluginOptions.themes) {
    return (
      <SwitchThemeProvider
        themes={pluginOptions.themes}
        defaultTheme={pluginOptions.defaultTheme}
      >
        {element}
      </SwitchThemeProvider>
    );
  }

  return element;
};
