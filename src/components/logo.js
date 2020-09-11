const React = require("react")
const Ink = require("ink")

// made with figlet, using "Elite" font
// https://github.com/xero/figlet-fonts/blob/master/Elite.flf
// https://web.archive.org/web/20120819044459/http://www.roysac.com/thedrawfonts-tdf.asp
const logo = `
▐▄• ▄ ▄▄▄         ▪   ▄▄▄·
 █▌█▌▪▀▄ █·▪     ██ ▐█ ▀█
 ·██· ▐▀▀▄  ▄█▀▄ ▐█·▄█▀▀█
▪▐█·█▌▐█•█▌▐█▌.▐▌▐█▌▐█ ▪▐▌
•▀▀ ▀▀.▀  ▀ ▀█▄▀▪▀▀▀ ▀  ▀
`.slice(1)

module.exports = class Logo extends React.Component {
    render() {
        const { h, s, l } = this.props.color
        return <Ink.Text color={`hsl(${h}, ${s}, ${l})`}>{logo}</Ink.Text>
    }

    static getWidth() {
        let width = 0
        for (const line of logo.split("\n")) if (line.length > width) width = line.length
        return width
    }
}
