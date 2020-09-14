#!/usr/bin/env node

const React = require("react")
const Ink = require("ink")
const importJSX = require("import-jsx")
const App = importJSX("./components/App")

Ink.render(React.createElement(App))
