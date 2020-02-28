const React = require("react");
const {
  ServerStyleSheet,
  StyleSheetContext,
  ThemeContext
} = require("@css-system/use-css");

const stylesheets = new Map();

const StyleSheetProvider = ({ children, pathname }) => {
  const stylesheet = new ServerStyleSheet();

  stylesheets.set(pathname, stylesheet);

  return (
    <StyleSheetContext.Provider value={stylesheet}>
      {children}
    </StyleSheetContext.Provider>
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
  const stylesheet = stylesheets.get(pathname);

  if (stylesheet) {
    setHeadComponents([
      React.createElement("style", {
        dangerouslySetInnerHTML: { __html: stylesheet.rules.join(" ") }
      })
    ]);
    stylesheets.delete(pathname);
  }
};
