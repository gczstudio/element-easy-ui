## element-easy-ui
  Simplified version of element UI component library(Vue.js 2.0)
  In projects using elment UI, custom components can be written into documents for team development.
  The document is written in markdown
## Install
```shell
npm install element-ui -S
```

## Quick Start
Create new examples from the project root directory

```shell
exampels
  --demo-styles
  --docs
  --nav.config.js
```

pacakge.json

```shell
  "scripts": {
    "dev:docs": "element-easy-ui --config examples",
    "build:docs": "cross-env NODE_ENV=production element-easy-ui --config examples"
  }
```

## Browser Support
Modern browsers and Internet Explorer 10+.



  