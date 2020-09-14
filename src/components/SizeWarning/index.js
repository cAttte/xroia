const React = require("react")
const Ink = require("ink")

module.exports = class SizeWarning extends React.Component {
    render() {
        return (
            <Ink.Box
                flexDirection="column"
                borderStyle="round"
                paddingX={3}
                paddingY={1}
                width="50%"
            >
                <Ink.Text>Please resize your terminal.</Ink.Text>
            </Ink.Box>
        )
    }
}
