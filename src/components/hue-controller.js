const gradient = require("tinygradient")
const blend = require("color-blend").normal
const React = require("react")
const Ink = require("ink")
const subpixel = require("../util/subpixel")

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
        const sliderWidth = Math.floor(this.props.width - 4)
        const percentageHue = this.props.color.h / (360 / 100) / 100
        let cursorPosition = Math.floor(percentageHue * (sliderWidth * 2))
        if (cursorPosition === sliderWidth * 2) cursorPosition--

        let white
        const hues = [0, 60, 120, 180, 240, 300, 360]
        const hueGradient = gradient(hues.map(h => `hsl(${h}, 100%, 50%)`))
        const colors = hueGradient.rgb(sliderWidth * 2)

        const sliderCharacters = []
        for (let i = 0; i < colors.length; i++) {
            const firstRGB = colors[i].toRgb()
            const secondRGB = (colors[i + 1] || colors[i]).toRgb()

            if (i === cursorPosition) {
                white = blend({ r: 250, g: 250, b: 250, a: 0.8 }, { ...firstRGB, a: 0.2 })
                if (i % 2 === 0) sliderCharacters.push(subpixel(white, secondRGB, "HOR"))
                else sliderCharacters.splice(-1, 1, subpixel(white, firstRGB, "HOR_REV"))
            } else if (i % 2 === 0) {
                sliderCharacters.push(subpixel(firstRGB, secondRGB))
            }
        }

        const slider = sliderCharacters.join("")
        const marker =
            " ".repeat(cursorPosition / 2) +
            subpixel(white, null, cursorPosition % 2 === 0 ? "HOR" : "HOR_REV")

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
