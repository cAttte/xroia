const importJSX = require("import-jsx")
const React = require("react")
const Ink = require("ink")

const Logo = importJSX("./logo")

module.exports = class App extends React.Component {
    render() {
        return (
            <Ink.Box>
                <Logo />
            </Ink.Box>
        )
    }
}
