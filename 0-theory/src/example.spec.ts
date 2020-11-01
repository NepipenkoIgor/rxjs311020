import { TestScheduler } from "rxjs/testing";
import { delay, map } from "rxjs/operators";

describe('Example test', () => {
    let testScheduler: TestScheduler
    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected)
        })
    })

    it('some test', () => {

        testScheduler.run(({cold, expectObservable}) => {
            const sequence1 = cold('---a--b--c---|', {
                a: 2,
                b: 2,
                c: 10
            })

            const sequence2 = ' 9s ---d--e--r---|'


            expectObservable(
                sequence1
                    .pipe(
                        delay(9000),
                        map((x) => x ** 2)
                    )
            ).toBe(sequence2, {d: 4, e:4, r: 100})

        })


        expect(1).toEqual(1);
    })
})
