"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MathDemo = (function () {
    function MathDemo() {
        this.PI = 3.14159265359;
    }
    MathDemo.prototype.pow = function (base, exponent) {
        return base + exponent;
    };
    return MathDemo;
}());
exports.MathDemo = MathDemo;
