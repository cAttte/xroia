const chalk = require("chalk")
const ALL_BLOCKS = require("./blocks")

const blocks = {
    FULL: ALL_BLOCKS.FULL_BLOCK,

    HOR: ALL_BLOCKS.LEFT_HALF_BLOCK,
    HOR_REV: ALL_BLOCKS.RIGHT_HALF_BLOCK,
    HOR_3_8: ALL_BLOCKS.LEFT_THREE_EIGHTHS_BLOCK,
    HOR_1_4: ALL_BLOCKS.LEFT_ONE_QUARTER_BLOCK,
    HOR_1_8: ALL_BLOCKS.LEFT_ONE_EIGHTH_BLOCK,

    VER: ALL_BLOCKS.LOWER_HALF_BLOCK,
    VER_REV: ALL_BLOCKS.UPPER_HALF_BLOCK,
    VER_3_4: ALL_BLOCKS.LOWER_THREE_QUARTERS_BLOCK,
    VER_5_8: ALL_BLOCKS.LOWER_FIVE_EIGHTHS_BLOCK,
    VER_1_4: ALL_BLOCKS.LOWER_ONE_QUARTER_BLOCK,
    VER_1_8: ALL_BLOCKS.LOWER_ONE_EIGHTH_BLOCK,

    QUA_1_4: ALL_BLOCKS.QUADRANT_UPPER_LEFT,
    QUA_2_4: ALL_BLOCKS.QUADRANT_UPPER_RIGHT,
    QUA_3_4: ALL_BLOCKS.QUADRANT_LOWER_LEFT,
    QUA_4_4: ALL_BLOCKS.QUADRANT_LOWER_RIGHT
}

const has = (obj, name) => obj.hasOwnProperty(name)

const rgbArray = rgb => {
    if (Array.isArray(rgb)) return rgb
    else if (rgb && has(rgb, "r") && has(rgb, "g") && has(rgb, "b"))
        return [rgb.r, rgb.g, rgb.b]
    else return [0, 0, 0]
}

module.exports = function subpixel(fg, bg = null, template = "HOR") {
    const char = blocks[template] || blocks.HOR

    let style = chalk.rgb(...rgbArray(fg))
    if (bg) style = style.bgRgb(...rgbArray(bg))
    return style(char)
}
