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
        const window = isMinSize ? "color-picker" : "size-warning"
        this.state = { window, detail: "Checking for updates..." }
    }

    componentDidMount() {
        process.stdout.on("resize", this.handleResize.bind(this))
        process.stdin.on("keypress", this.handleKeypress.bind(this))
        this.updateCheck = checkUpdates().then(this.handleUpdateCheck.bind(this))
    }

    componentWillUnmount() {
        process.stdout.off("resize", this.handleResize.bind(this))
        process.stdin.off("keypress", this.handleKeypress.bind(this))
        this.updateCheck.cancel()
    }

    render() {
        const props = {
            detail: this.state.detail,
            update: this.state.update,
            setWindow: this.setWindow.bind(this)
        }

        if (this.state.window === "color-picker") return <ColorPicker {...props} />
        else if (this.state.window === "auto-updater") return <AutoUpdater {...props} />
        else if (this.state.window === "size-warning") return <SizeWarning />
    }

    setWindow(window) {
        this.setState({ window })
    }

    handleResize() {
        if (this.state.window !== "color-picker") return
        const isMinSize = (process.stdout.columns / 100) * 50 >= Logo.getWidth() + 8
        if (!isMinSize) this.setState({ window: "size-warning" })
        else this.setState({ window: "color-picker" })
    }

    handleUpdateCheck(update) {
        if (update.latest) this.setState({ detail: "v" + update.cur })
        else this.setState({ update: update.new, window: "auto-updater" })
    }
}
