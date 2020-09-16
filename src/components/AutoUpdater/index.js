const xroia = require("../../../package.json")
const React = require("react")
const Ink = require("ink")

module.exports = class AutoUpdater extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selection: true, status: "prompt" }
    }

    componentDidMount() {
        process.stdin.on("keypress", this.handleKeypress.bind(this))
    }

    componentWillUnmount() {
        process.stdin.off("keypress", this.handleKeypress.bind(this))
    }

    render() {
        let type = "unknown"
        const curSemver = xroia.version.split(".")
        const newSemver = this.props.update.split(".")
        if (curSemver[0] !== newSemver[0]) type = "major update"
        else if (curSemver[1] !== newSemver[1]) type = "feature"
        else if (curSemver[2] !== newSemver[2]) type = "bug fix"

        let content
        if (this.state.status === "prompt")
            content = (
                <>
                    <Ink.Text>
                        A new version of Xroia (v{this.props.update} — {type}) is
                        available. Update?
                    </Ink.Text>
                    <Ink.Box marginTop={1}>
                        <Ink.Text inverse={this.state.selection}> Yes </Ink.Text>
                        <Ink.Text inverse={!this.state.selection}> No </Ink.Text>
                    </Ink.Box>
                </>
            )
        else if (this.state.status === "fail")
            content = (
                <Ink.Text>
                    Failed to update.
                    <Ink.Newline />
                    <Ink.Newline />
                    You can try updating manually with the command:
                    <Ink.Newline />
                    <Ink.Text bold>npm i -g {xroia.repository}</Ink.Text>
                </Ink.Text>
            )
        else if (this.state.status === "done") this.props.setWindow("ColorPicker")
        return (
            <Ink.Box
                flexDirection="column"
                borderStyle="round"
                paddingX={3}
                paddingY={1}
                width="50%"
            >
                {content}
            </Ink.Box>
        )
    }

    update() {
        this.setState({ status: "fail" })
    }

    ignore() {
        this.finish()
    }

    finish() {
        this.props.setWindow("ColorPicker")
    }

    handleKeypress(_, key) {
        if (key && ["up", "down", "left", "right", "tab"].includes(key.name))
            this.setState({ selection: !this.state.selection })
        else if (key && ["space", "return"].includes(key.name))
            this.state.selection ? this.update() : this.ignore()
    }
}
