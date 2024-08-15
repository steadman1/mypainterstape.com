// credit to LucHighwalker on GitHub for this class

export class Color {
  static readonly contrastFactor = 50;
  static readonly rBrightVal = 0.21;
  static readonly gBrightVal = 0.72;
  static readonly bBrightVal = 0.07;

  static readonly hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{0,2})$/i;

  static get random(): Color {
    return new Color(...Color.randomRgb());
  }
  static get transparent(): Color {
    return new Color(0, 0, 0, 0);
  }
  static get white(): Color {
    return new Color(255, 255, 255);
  }
  static get black(): Color {
    return new Color(0, 0, 0);
  }
  static get grey(): Color {
    return new Color('#d2d9d8');
  }
  static get lightGrey(): Color {
    return new Color('#f4f6f6');
  }
  static get darkGrey(): Color {
    return new Color('#949494');
  }
  static get red(): Color {
    return new Color(255, 0, 0);
  }
  static get green(): Color {
    return new Color(0, 255, 0);
  }
  static get blue(): Color {
    return new Color(0, 0, 255);
  }

  static get rdRed(): Color {
    return new Color('#dd385b');
  }
  static get rdLightRed(): Color {
    return new Color('#de7287');
  }
  static get rdLighterRed(): Color {
    return new Color('#f1dadd');
  }
  static get rdGrey(): Color {
    return new Color('#d2d9d8');
  }
  static get rdLightGrey(): Color {
    return new Color('#f4f6f6');
  }
  static get rdBlack(): Color {
    return new Color('#2b363f');
  }
  static get rdTeal(): Color {
    return new Color('#66bcab');
  }
  static get rdBlue(): Color {
    return new Color('#2b363f');
  }

  private hexVal: string;
  private strVal: string;
  private rgbVal: number[];
  private rgbaVal: number[];
  private invVal: number[];
  private pBrightVal: number;

  private rVal: number;
  private gVal: number;
  private bVal: number;
  private aVal: number;

  public get hex() {
    return this.hexVal;
  }
  public set hex(hex: string) {
    this.setHex(hex);
  }

  public get str() {
    return this.strVal;
  }

  public get rgb() {
    return this.rgbVal;
  }
  public set rgb(rgb: number[]) {
    this.setRgb(rgb[0] || 0, rgb[1] || 0, rgb[2] || 0, 1);
  }
  public get rgba() {
    return this.rgbaVal;
  }
  public set rgba(rgba: number[]) {
    this.setRgb(rgba[0] || 0, rgba[1] || 0, rgba[2] || 0, rgba[3] || 1);
  }

  public get inverted() {
    return this.invVal;
  }
  public get brightness() {
    return this.pBrightVal;
  }

  public get r() {
    return this.rVal;
  }
  public set r(r: number) {
    this.rVal = r;
    this.validate();
  }
  public get g() {
    return this.gVal;
  }
  public set g(g: number) {
    this.gVal = g;
    this.validate();
  }
  public get b() {
    return this.bVal;
  }
  public set b(b: number) {
    this.bVal = b;
    this.validate();
  }
  public get a() {
    return this.aVal;
  }
  public set a(a: number) {
    this.aVal = a;
    this.validate();
  }

  // tslint:disable: no-bitwise
  static rgbFromString(str: string): [number, number, number] {
    const rgb: [number, number, number] = [0, 0, 0];
    if (str.length === 0) {
      return rgb;
    }

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 255;
      rgb[i] = value;
    }
    return rgb;
  }
  // tslint:enable: no-bitwise

  static hexFromString(str: string): string {
    return Color.rgbToHex(...Color.rgbFromString(str));
  }

  static hexToRgba(hex: string): number[] {
    const result = Color.hexRegEx.exec(hex);

    if (result === null) {
      throw new Error('Invalid hex value.');
    }

    const alpha = parseInt(result[4] || 'ff', 16) / 255;

    return result ? [parseInt(result[1], 16), parseInt(result[2] || '00', 16), parseInt(result[3] || '00', 16), alpha] : [];
  }

  static rgbToHex(r: number, g: number, b: number, a: number = 1): string {
    return `#${Color.numToHex(r)}${Color.numToHex(g)}${Color.numToHex(b)}${Color.numToHex(Math.floor(a * 255))}`;
  }

  static fromString(str: string): Color {
    return new Color(...Color.rgbFromString(str));
  }

  static randomRgb(): [number, number, number] {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return [r, g, b];
  }

  static randomRgba(): [number, number, number, number] {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = Math.floor(Math.random() * 100) / 100;
    return [r, g, b, a];
  }

  static randomHex(): string {
    const rgb = Color.randomRgb();
    return Color.rgbToHex(rgb[0], rgb[1], rgb[2]);
  }

  private static numToHex(num: number) {
    const hex = num.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  constructor(rOrHex: number | string = 0, g: number = 0, b: number = 0, a: number = 1) {
    if (typeof rOrHex === 'string') {
      this.setHex(rOrHex);
    } else {
      this.setRgb(rOrHex, g, b, a);
    }
  }

  private validate() {
    this.clamp();

    this.hexVal = this.toHex();
    this.strVal = this.toString();

    this.rgbVal = [this.rVal, this.gVal, this.bVal, this.aVal];
    this.invVal = [255 - this.rVal, 255 - this.gVal, 255 - this.bVal];
    this.pBrightVal = (Color.rBrightVal * this.rVal + Color.gBrightVal * this.gVal + Color.bBrightVal * this.bVal) / 3;
  }

  private clamp(): void {
    for (const val of ['rVal', 'gVal', 'bVal']) {
      this[val] = Math.floor(this[val]);
      if (this[val] > 255) {
        this[val] = 255;
      } else if (this[val] < 0) {
        this[val] = 0;
      }
    }

    if (this.aVal > 1) {
      this.aVal = 1;
    } else if (this.aVal < 0) {
      this.aVal = 0;
    }
  }

  public setHex(hex: string) {
    const rgba = Color.hexToRgba(hex);
    this.rVal = rgba[0] || 0;
    this.gVal = rgba[1] || 0;
    this.bVal = rgba[2] || 0;
    this.aVal = rgba[3] || 1;

    this.validate();
  }

  public setRgb(r: number, g: number, b: number, a: number = 1) {
    this.rVal = r;
    this.gVal = g;
    this.bVal = b;
    this.aVal = a;

    this.validate();
  }

  public invert() {
    this.rgb = this.invVal;
  }

  public toRgbString(): string {
    return `rgb(${this.rVal}, ${this.gVal}, ${this.bVal})`;
  }

  public toRgbaString(): string {
    return `rgba(${this.rVal}, ${this.gVal}, ${this.bVal}, ${this.aVal})`;
  }

  public toHex(): string {
    return Color.rgbToHex(this.rVal, this.gVal, this.bVal, this.aVal);
  }

  public shouldContrast(): boolean {
    return this.pBrightVal < Color.contrastFactor;
  }

  public contrast(): Color {
    return this.shouldContrast() ? Color.rdLightGrey : Color.rdBlack;
  }

  public distanceFrom(color: Color): number {
    const rDist = this.rVal - color.r;
    const gDist = this.gVal - color.g;
    const bDist = this.bVal - color.b;
    return (rDist + gDist + bDist) / 3;
  }

  public darken(amount: number): Color {
    return new Color(this.r - amount, this.g - amount, this.b - amount);
  }

  public brighten(amount: number): Color {
    return new Color(this.r + amount, this.g + amount, this.b + amount);
  }

  public transparentize(opacity: number): Color {
    return new Color(this.r, this.g, this.b, opacity);
  }
}
