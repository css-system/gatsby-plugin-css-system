const React = require("react");
const {
  ServerStyleSheetManager,
  StyleSheetManagerContext,
  ThemeContext
} = require("css-system");

const stylesheets = new Map();

const StyleSheetProvider = ({ children, pathname }) => {
  const stylesheetManager = new ServerStyleSheetManager();

  stylesheets.set(pathname, stylesheetManager);

  return (
    <StyleSheetManagerContext.Provider value={stylesheetManager}>
      {children}
    </StyleSheetManagerContext.Provider>
  );
};

exports.wrapRootElement = ({ element, pathname }, pluginOptions = {}) => {
  if (!pluginOptions.theme) {
    return (
      <StyleSheetProvider pathname={pathname}>{element}</StyleSheetProvider>
    );
  }

  return (
    <ThemeContext.Provider value={pluginOptions.theme}>
      <StyleSheetProvider pathname={pathname}>{element}</StyleSheetProvider>
    </ThemeContext.Provider>
  );
};

exports.onRenderBody = ({ setHeadComponents, pathname }) => {
  const stylesheetManager = stylesheets.get(pathname);

  if (stylesheetManager) {
    setHeadComponents(stylesheetManager.getStyleComponents());
    stylesheets.delete(pathname);
  }
};
