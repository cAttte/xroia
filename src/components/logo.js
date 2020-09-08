const React = require("react")
const Ink = require("ink")

const Gradient = require("ink-gradient")

// made with figlet, using "Elite" font
// https://github.com/xero/figlet-fonts/blob/master/Elite.flf
// https://web.archive.org/web/20120819044459/http://www.roysac.com/thedrawfonts-tdf.asp
const logo = `
▐▄• ▄ ▄▄▄        ▪   ▄▄▄·
 █▌█▌▪▀▄ █·▪     ██ ▐█ ▀█
 ·██· ▐▀▀▄  ▄█▀▄ ▐█·▄█▀▀█
▪▐█·█▌▐█•█▌▐█▌.▐▌▐█▌▐█ ▪▐▌
•▀▀ ▀▀.▀  ▀ ▀█▄▀▪▀▀▀ ▀  ▀
`

module.exports = class Logo extends React.Component {
    render() {
        return (
            <Gradient name="pastel">
                <Ink.Text>{logo}</Ink.Text>
            </Gradient>
        )
    }
}
