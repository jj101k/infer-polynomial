import {Matrix, inverse} from "ml-matrix"

/**
 *
 */
export class InferPolynomial {
    /**
     * <x> . P<w>(in) = out
     * <x> = out . P<w>(in)-1
     *
     * Example:
     * given in points of (1, 2), the counterpart unit polynomials of the same length (2)
     * are: 1 . 1^0 + 1 . 1^1 (thus, (1, 1)) and 1 . 2^0 + 1 . 2^1 (thus, (2, 1)).
     * So P<w>(in) is:
     * (1 1)
     * (1 2)
     *
     * Inverse of that:
     * (2 -1)
     * (-1 1)
     *
     * Given counterpart "out" values of ((1), (3)), you get:
     *
     * (2 . 1 -1 . 3) -> -1
     * (-1 . 1 +1 . 3) -> 2
     *
     * So the polynomial is -1x^0 + 2x^1.
     *
     * Putting the original values back in, -1 . 1^0 + 2 . 1^1 = 2 - 1 = 1; and -1 .
     * 2^0 + 2 . 2^1 = -1 + 4 = 3.
     *
     * @param {Record<number, number>} renderPoints
     * @returns The detected polynomial factors. This might not exactly match, but will
     * work correctly.
     */
    static getPoly(renderPoints) {
        const inPoints = [...Object.keys(renderPoints).map(k => +k)]
        const renderPointsCount = Object.keys(renderPoints).length
        const outPointsM = Matrix.from1DArray(renderPointsCount, 1, [...Object.values(renderPoints)])

        const p_w_in = new Matrix(0, renderPointsCount)
        for(const ip of inPoints) {
            p_w_in.addRow([...new Array(renderPointsCount)].map((_, i) => Math.pow(ip, i)))
        }

        const inv_p_w_in = inverse(p_w_in)
        return [...inv_p_w_in.mmul(outPointsM)].map(i => i[2])
    }

    /**
     *
     * @param {number[]} polyPoints eg. [2, 3] means 2x^0 + 3x^1
     * @returns A function which will "run" the polynomial against a supplied
     * value of x
     */
    static polyFunction(polyPoints) {
        return (x) => polyPoints.map((v, i) => v * Math.pow(x, i)).reduce((c, i) => c + i, 0)
    }
}