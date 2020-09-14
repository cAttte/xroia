const importJSX = require("import-jsx")
const React = require("react")
const Ink = require("ink")

const Logo = importJSX("./logo")
const HueController = importJSX("./hue-controller")

module.exports = class ColorPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: { h: 0, s: 100, l: 50 },
            focus: "hue"
        }
    }

    render() {
        const contentWidth = Math.max(process.stdout.columns / 2 - 8, 0)
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
                <Logo color={this.state.color} />
                <HueController
                    focused={this.state.focus === "hue"}
                    width={contentWidth}
                    color={this.state.color}
                    setColor={this.setColor.bind(this)}
                />
                <Ink.Box marginTop={1}>
                    <Ink.Text>{colorString}</Ink.Text>
                    <Ink.Box flexGrow={1} />
                    <Ink.Text>{this.props.detail}</Ink.Text>
                </Ink.Box>
            </Ink.Box>
        )
    }

    setColor(h = this.state.color.h, s = this.state.color.s, l = this.state.color.l) {
        this.setState({ color: { h, s, l } })
    }
}
