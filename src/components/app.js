const keypress = require("keypress")
const importJSX = require("import-jsx")
const React = require("react")

const Logo = importJSX("./logo")
const ColorPicker = importJSX("./color-picker")
const SizeWarning = importJSX("./size-warning")

keypress(process.stdin)
process.stdin.setRawMode(true)
process.stdin.resume()

module.exports = class App extends React.Component {
    constructor(props) {
        super(props)
        const isMinSize = (process.stdout.columns / 100) * 50 >= Logo.getWidth() + 8
        const window = isMinSize ? "color-picker" : "size-warning"
        this.state = { window }
    }

    componentDidMount() {
        process.stdout.on("resize", this.handleResize.bind(this))
        process.stdin.on("keypress", this.handleKeypress.bind(this))
    }

    componentWillUnmount() {
        process.stdout.off("resize", this.handleResize.bind(this))
        process.stdin.off("keypress", this.handleKeypress.bind(this))
    }

    render() {
        if (this.state.window === "color-picker") return <ColorPicker />
        else if (this.state.window === "size-warning") return <SizeWarning />
    }

    handleResize() {
        const isMinSize = (process.stdout.columns / 100) * 50 >= Logo.getWidth() + 8
        if (!isMinSize) this.setState({ window: "size-warning" })
        else this.setState({ window: "color-picker" })
    }

    handleKeypress(_, key) {
        if (key && key.ctrl && key.name === "c") process.stdin.pause()
    }
}
