type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type ColorString = RGB | RGBA | HEX;

class Color {
    private color: ColorString;

    constructor(color: ColorString) {
        this.color = color;
    }

    toString(): string {
        return this.color;
    }
}

export default Color;