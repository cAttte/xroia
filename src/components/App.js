const importJSX = require("import-jsx")
const React = require("react")

const checkUpdates = require("../checkUpdates")
const ColorPicker = importJSX("./ColorPicker")
const SizeWarning = importJSX("./SizeWarning")
const AutoUpdater = importJSX("./AutoUpdater")
const Logo = importJSX("./ColorPicker/Logo")

module.exports = class App extends React.Component {
    constructor(props) {
        super(props)
        const isMinSize = (process.stdout.columns / 100) * 50 >= Logo.getWidth() + 8
        const window = isMinSize ? "ColorPicker" : "SizeWarning"
        this.state = { window, detail: "Checking for updates..." }
    }

    componentDidMount() {
        process.stdout.on("resize", this.handleResize.bind(this))
        this.updateCheck = checkUpdates().then(this.handleUpdateCheck.bind(this))
    }

    componentWillUnmount() {
        process.stdout.off("resize", this.handleResize.bind(this))
        this.updateCheck.cancel()
    }

    render() {
        const props = {
            detail: this.state.detail,
            update: this.state.update,
            setWindow: this.setWindow.bind(this)
        }

        const windowComponents = { ColorPicker, AutoUpdater, SizeWarning }
        const WindowComponent = windowComponents[this.state.window]
        return <WindowComponent {...props} />
    }

    setWindow(window) {
        this.setState({ window })
    }

    handleResize() {
        if (!["ColorPicker", "SizeWarning"].includes(this.state.window)) return
        const isMinSize = (process.stdout.columns / 100) * 50 >= Logo.getWidth() + 8

        if (!isMinSize) this.setState({ window: "SizeWarning" })
        else this.setState({ window: "ColorPicker" })
    }

    handleUpdateCheck(update) {
        if (update.latest) this.setState({ detail: "v" + update.cur })
        else this.setState({ update: update.new, window: "AutoUpdater" })
    }
}
