import { TestScheduler } from "rxjs/testing";
import { skipLimit } from "./skip-limit";

describe('Example test', () => {
    let testScheduler: TestScheduler
    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected)
        })
    })

    it('some test', () => {

        testScheduler.run(({cold, expectObservable}) => {
            const sequence1 = cold('-a--b----c----d---e-|', {
                a: 1,
                b: 2,
                c: 3,
                d: 10,
                e: 5
            })

            const sequence2 = '---------c----d-----|'


            expectObservable(
                sequence1
                    .pipe(
                        skipLimit(2, 2)
                    )
            ).toBe(sequence2, {
                c: 3,
                d: 10,
            })

        })
    })
})
