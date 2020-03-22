const React = require("react");
const { ThemeContext } = require("css-system");

exports.wrapRootElement = ({ element }, pluginOptions = {}) => {
  if (!pluginOptions.theme) {
    return element;
  }

  return (
    <ThemeContext.Provider value={pluginOptions.theme}>
      {element}
    </ThemeContext.Provider>
  );
};
