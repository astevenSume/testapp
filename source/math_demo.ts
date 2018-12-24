///<reference path="./interfaces.d.ts" />

class MathDemo implements MathInterface {
  public PI: number;
  constructor() {
    this.PI = 3.14159265359;
  }
  pow(base: number, exponent: number):number{
    return base+exponent;
  }
}
export {MathDemo};
