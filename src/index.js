#!/usr/bin/env node

const React = require("react")
const Ink = require("ink")
const importJSX = require("import-jsx")
const App = importJSX("./components/App")
const keypress = require("keypress")
const ansi = require("ansi-escapes")

keypress(process.stdin)
process.stdin.setRawMode(true)
process.stdin.resume()

process.stdin.on("keypress", (_, key) => {
    if (key && key.ctrl && key.name === "c") process.exit(0)
})

process.stdout.write(ansi.cursorHide)
Ink.render(React.createElement(App))
