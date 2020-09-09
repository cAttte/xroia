const xroia = require("../../package.json")

const React = require("react")
const Ink = require("ink")

const Gradient = require("ink-gradient")

// gradient is rendered differently for last line otherwise
const s = " ".repeat(xroia.version.length)
// made with figlet, using "Elite" font
// https://github.com/xero/figlet-fonts/blob/master/Elite.flf
// https://web.archive.org/web/20120819044459/http://www.roysac.com/thedrawfonts-tdf.asp
const logo = `
▐▄• ▄ ▄▄▄         ▪   ▄▄▄· ${s}
 █▌█▌▪▀▄ █·▪     ██ ▐█ ▀█  ${s}
 ·██· ▐▀▀▄  ▄█▀▄ ▐█·▄█▀▀█  ${s}
▪▐█·█▌▐█•█▌▐█▌.▐▌▐█▌▐█ ▪▐▌ ${s}
•▀▀ ▀▀.▀  ▀ ▀█▄▀▪▀▀▀ ▀  ▀ v${xroia.version}
`.slice(1) // remove first newline

module.exports = class Logo extends React.Component {
    render() {
        return (
            <Gradient name="pastel">
                <Ink.Text>{logo}</Ink.Text>
            </Gradient>
        )
    }

    static getWidth() {
        let width = 0
        for (const line of logo.split("\n")) if (line.length > width) width = line.length
        return width
    }
}
