const chalk = require("chalk")
const gradient = require("tinygradient")
const blend = require("color-blend").normal
const React = require("react")
const Ink = require("ink")

const FULL = "█"
const EMPTY = " "
const FIRST_HALF = "▌"
const SECOND_HALF = "▐"

const hues = [0, 60, 120, 180, 240, 300, 360]
const HUE_GRADIENT = gradient(hues.map(h => `hsl(${h}, 100%, 50%)`))

module.exports = class HueController extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const props = this.props.focused
            ? { paddingX: 1, borderStyle: "round" }
            : { marginX: 1 } // take up space border would take

        return (
            <Ink.Box {...props}>
                <Ink.Text>{this.renderSlider()}</Ink.Text>
            </Ink.Box>
        )
    }

    renderSlider() {
        const sliderWidth = this.props.width - 4
        const percentageHue = this.props.color.h / (360 / 100) / 100
        const position = percentageHue * sliderWidth - 1
        const index = Math.max(Math.floor(position), 0)
        const roundedPosition = Math.floor(position * 2) / 2 // round to nearest .5
        const cursor = roundedPosition - index === 0.5 ? SECOND_HALF : FIRST_HALF

        let characters = FULL.repeat(sliderWidth).split("")
        characters[index] = cursor

        const colors = HUE_GRADIENT.rgb(characters.length)
        let blendedWhite = chalk.rgb(250, 250, 250)
        const slider = characters
            .map((char, i) => {
                const { r, g, b } = colors[i].toRgb()
                if (char === cursor) {
                    const white = { r: 250, g: 250, b: 250, a: 0.8 }
                    const b = blend(white, { r, g, b, a: 0.2 })
                    blendedWhite = chalk.rgb(b.r, b.g, b.b)
                    return blendedWhite.bgRgb(r, g, b)(char)
                } else {
                    return chalk.rgb(r, g, b)(char)
                }
            })
            .join("")

        const marker = EMPTY.repeat(index) + blendedWhite(cursor)
        return [marker, slider, marker].join("\n")
    }

    handleKeypress(_, key) {
        let step = 1
        if (key.ctrl) step += 5
        if (key.shift) step += 15

        if (key.name === "left" && this.props.color.h >= 0)
            this.props.setColor(Math.max(this.props.color.h - step, 0))
        else if (key.name === "right" && this.props.color.h <= 360)
            this.props.setColor(Math.min(this.props.color.h + step, 360))
        else if (key.name === "home") this.props.setColor(0)
        else if (key.name === "end") this.props.setColor(360)
    }
}
