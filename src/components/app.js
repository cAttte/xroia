const keypress = require("keypress")
const importJSX = require("import-jsx")
const React = require("react")
const Ink = require("ink")

const Logo = importJSX("./logo")
const HueController = importJSX("./hue-controller")

keypress(process.stdin)
keypress.enableMouse(process.stdout)
process.stdin.setRawMode(true)
process.stdin.resume()
process.on("exit", () => keypress.disableMouse(process.stdout))

module.exports = class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: [0, 100, 50],
            focus: "hue",
            terminalWidth: process.stdout.columns,
            terminalHeight: process.stdout.rows,
            isMinSize: (process.stdout.columns / 100) * 50 >= Logo.getWidth() + 8
        }
        this.hueControllerRef = React.createRef()
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
        return (
            <Ink.Box
                flexDirection="column"
                borderStyle="round"
                borderColor={`hsl(${this.state.color.join(",")})`}
                paddingX={3}
                paddingY={1}
                width="50%"
            >
                {this.state.isMinSize ? (
                    <>
                        <Logo />
                        <HueController
                            ref={this.hueControllerRef}
                            focused={this.state.focus === "hue"}
                            width={Math.max(this.state.terminalWidth / 2 - 8, 0)}
                            hue={this.state.color[0]}
                            setHSL={this.setHSL.bind(this)}
                        />
                        <Ink.Text>
                            <Ink.Newline />
                            hsl({this.state.color.join(", ")})
                        </Ink.Text>
                    </>
                ) : (
                    <Ink.Text>Please resize your terminal.</Ink.Text>
                )}
            </Ink.Box>
        )
    }

    setHSL(h = this.state.color[0], s = this.state.color[1], l = this.state.color[2]) {
        if (!this.state.isMinSize) return
        this.setState({ color: [h, s, l] })
    }

    handleResize() {
        this.setState({
            terminalWidth: process.stdout.columns,
            terminalHeight: process.stdout.rows,
            isMinSize: (process.stdout.columns / 100) * 50 >= Logo.getWidth() + 8
        })
    }

    handleKeypress(char, key) {
        if (!this.state.isMinSize) return

        if (key && key.ctrl && key.name === "c") process.stdin.pause()
        if (this.state.focus === "hue")
            this.hueControllerRef.current.handleKeypress(char, key)
    }
}
