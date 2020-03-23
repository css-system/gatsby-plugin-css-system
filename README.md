# gatsby-plugin-css-system

[![npm package][npm-badge]][npm]

## Getting started

You can download `gatsby-plugin-css-system` from the NPM registry via the
`npm` or `yarn` commands

```shell
yarn add @css-system/gatsby-plugin-css-system
# OR
npm install @css-system/gatsby-plugin-css-system --save
```

## Usage

Add the plugin in your `gatsby-config.js` file with a `theme` object following the [theme ui specifications](https://github.com/system-ui/theme-specification):

```js
module.exports = {
  plugins: [
    {
      resolve: "@css-system/gatsby-plugin-css-system",
      options: {
        theme: {
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
      }
    }
  ]
};
```

> For advanced configuration, please checkout [documentation](./docs/advanced.md)

[npm-badge]: https://img.shields.io/npm/v/@css-system/gatsby-plugin-css-system.svg?style=flat-square
[npm]: https://www.npmjs.org/package/@css-system/gatsby-plugin-css-system 
