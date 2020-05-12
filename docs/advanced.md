# Advanced configuration

## Add the plugin in your `gatsby-config.js` file:

```js
module.exports = {
  plugins: ["@css-system/gatsby-plugin-css-system"],
}
```

## Create a `theme.js` file describing your theme:

> The `theme` object must follow the [theme ui specifications](https://github.com/system-ui/theme-specification).

```js
export const theme: {
  breakpoints: {
    s: "40em",
    m: "52em",
    l: "64em"
  },
  space: [0, 4, 8, 16, 32],
  fontSizes: [12, 14, 16, 20, 24],
  colors: {
    // your colors
  }
}
```

## Wrap pages with `ThemeProvider` in `gatsby-browser.js`

```js
const React = require("react")
const {ThemeContext} = require("css-system")
const {theme} = require("./theme")

exports.wrapPageElement = ({element}) => {
  return <ThemeContext.Provider value={theme}>{element}</ThemeContext.Provider>
}
```

## Wrap pages with `ThemeProvider` in `gatsby-ssr.js`

```js
const React = require("react")
const {ThemeContext} = require("css-system")
const {theme} = require("./theme")

exports.wrapPageElement = ({element}) => {
  return <ThemeContext.Provider value={theme}>{element}</ThemeContext.Provider>
}
```
