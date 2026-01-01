import { InferPolynomial } from "../index.mjs"

describe("InferPolynomial tests", () => {
    describe("infer()", () => {
        /**
         *
         * @param {(a: number) => number} p
         * @param {number[]} points
         * @param {number} [roundFactor=1e0]
         * @returns
         */
        const render = (p, points, roundFactor = 1e0) => {
            return Object.fromEntries(points.map(i => [i, Math.round(p(i) * roundFactor) / roundFactor]))
        }

        it("can infer a trivial case", () => {
            const renderPoints1 = {1: 1, 2: 3}
            expect(InferPolynomial.infer(renderPoints1)).toStrictEqual([-1, 2])
        })
        it("can infer a complex case", () => {
            /**
             *
             * @param {number} x
             * @returns
             */
            const p2 = InferPolynomial.polyFunction([4, 3, 2, 1])

            const inPoints = [0.1, 0.5, 0.6, 0.7]
            const renderPoints2 = render(p2, inPoints, 1e1)

            const po = InferPolynomial.infer(renderPoints2)
            const p3 = InferPolynomial.polyFunction(po)
            expect(render(p3, inPoints, 1e1)).toStrictEqual(renderPoints2)
        })
    })
    describe("infer2d()", () => {
        /**
         *
         * @param {(a: number) => number} p
         * @param {number[]} points
         * @param {number} [roundFactor=1e0]
         * @returns
         */
        const render = (p, points, roundFactor = 1e0) => {
            return Object.fromEntries(points.map(i => [i, Math.round(p(i) * roundFactor) / roundFactor]))
        }

        it("can infer a trivial case", () => {
            const renderPoints1 = {1: [1,2], 2: [3,4]}
            // ???
            expect(InferPolynomial.infer2d(renderPoints1)).toStrictEqual([-1, 0, 2, 2])
        })
        it("can infer a complex case", () => {
            /**
             *
             * @param {number} x
             * @returns
             */
            const p2 = InferPolynomial.polyFunction([4, 3, 2, 1])

            const inPoints = [0.1, 0.5, 0.6, 0.7]
            const renderPoints2 = render(p2, inPoints, 1e1)

            const po = InferPolynomial.infer(renderPoints2)
            const p3 = InferPolynomial.polyFunction(po)
            expect(render(p3, inPoints, 1e1)).toStrictEqual(renderPoints2)
        })
    })
})