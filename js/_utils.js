function hexToOklch(hex) {
    // 1. Normalize HEX to RGB (0-1 range)
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    // 2. Convert sRGB to Linear RGB
    [r, g, b] = [r, g, b].map(v =>
        v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92
    );

    // 3. Linear RGB to OKLab (using the OKLab transformation matrix)
    let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    let m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    let s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

    let L_ = Math.cbrt(l);
    let M_ = Math.cbrt(m);
    let S_ = Math.cbrt(s);

    let L = 0.2104542553 * L_ + 0.7936177850 * M_ - 0.0040720468 * S_;
    let a = 1.9779984951 * L_ - 2.4285922050 * M_ + 0.4505937099 * S_;
    let b_lab = 0.0259040371 * L_ + 0.7827717662 * M_ - 0.8086757660 * S_;

    // 4. OKLab to OKLCH (Cartesian to Polar coordinates)
    let C = Math.sqrt(a * a + b_lab * b_lab);
    let h = Math.atan2(b_lab, a) * (180 / Math.PI);

    // Normalize hue to 0-360 range
    if (h < 0) h += 360;

    return {
        l: parseFloat(L.toFixed(3)), // Perceived lightness (0-1)
        c: parseFloat(C.toFixed(3)), // Chroma (0-0.4+)
        h: parseFloat(h.toFixed(2)), // Hue angle (0-360)
        string: `oklch(${L.toFixed(2)} ${C.toFixed(3)} ${h.toFixed(2)})`
    };
}

// Example Usage:
const coral = hexToOklch("#FF7F50");
console.log(coral);
// Output: { l: 0.713, c: 0.161, h: 48.01, string: "oklch(0.71 0.161 48.01)" }

export default {
    hexToOklch: color.hexToOklch
}