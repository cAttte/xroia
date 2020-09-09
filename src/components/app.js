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
        this.hueRef = React.createRef()
        this.state = {
            color: { h: 0, s: 100, l: 50 },
            focus: this.hueRef,
            terminalWidth: process.stdout.columns,
            terminalHeight: process.stdout.rows,
            isMinSize: (process.stdout.columns / 100) * 50 >= Logo.getWidth() + 8
        }
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
        const contentWidth = Math.max(this.state.terminalWidth / 2 - 8, 0)
        const { h, s, l } = this.state.color
        const colorString = `hsl(${h}, ${s}, ${l})`

        return (
            <Ink.Box
                flexDirection="column"
                borderStyle="round"
                borderColor={colorString}
                paddingX={3}
                paddingY={1}
                width="50%"
            >
                {this.state.isMinSize ? (
                    <>
                        <Logo />
                        <HueController
                            ref={this.hueRef}
                            focused={this.state.focus === "hue"}
                            width={contentWidth}
                            color={this.state.color}
                            setColor={this.setColor.bind(this)}
                        />
                        <Ink.Text>
                            <Ink.Newline />
                            {colorString}
                        </Ink.Text>
                    </>
                ) : (
                    <Ink.Text>Please resize your terminal.</Ink.Text>
                )}
            </Ink.Box>
        )
    }

    setColor(h = this.state.color.h, s = this.state.color.s, l = this.state.color.l) {
        this.setState({ color: { h, s, l } })
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
        if (this.state.focus === "hue") this.hueRef.current.handleKeypress(char, key)
    }
}
