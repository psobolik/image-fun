import {byteClamp, percent} from "./helpers.ts";
export type Callback = (rgba: Rgba) => Rgba;

export default class Rgba {
    constructor(red = 0, green = 0, blue = 0, alpha = 0) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    _red: number = 0;

    get red(): number {
        return this._red;
    }

    set red(value: number) {
        this._red = byteClamp(Math.round(value));
    }

    _green: number = 0;

    get green(): number {
        return this._green;
    }

    set green(value: number) {
        this._green = byteClamp(Math.round(value));
    }

    _blue: number = 0;

    get blue(): number {
        return this._blue;
    }

    set blue(value: number) {
        this._blue = byteClamp(Math.round(value));
    }

    _alpha: number = 255;

    get alpha(): number {
        return this._alpha;
    }

    set alpha(value: number) {
        this._alpha = byteClamp(value);
    }

    negative() {
        return new Rgba(255 - this.red, 255 - this.green, 255 - this.blue, this.alpha);
    }

    blackAndWhite() {
        const average = ((this.red + this.green + this.blue) / 3) % 255;
        return new Rgba(average, average, average, this.alpha);
    }

    posterized() {
        const filter = (n: number): number => {
            return n < 64 ? 0
                : n < 128 ? 64
                    : n < 192 ? 128
                        : 192;

        }
        return new Rgba(filter(this.red), filter(this.green), filter(this.blue), this.alpha);
    }

    highContrast() {
        const filter = (n: number): number => {
            return n < 96 ? 0 : 255;
        }
        return new Rgba(filter(this.red), filter(this.green), filter(this.blue), this.alpha);
    }

    colorLevel(redness: number, greenness: number, blueness: number) {
        return new Rgba(
            this.red * percent(redness / 255),
            this.green * percent(greenness / 255),
            this.blue * percent(blueness / 255),
            this.alpha
        );
    }
}