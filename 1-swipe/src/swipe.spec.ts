import { TestScheduler } from "rxjs/testing";
import { getX } from "./swipe";

function createTouch(clientX: any){
    return new TouchEvent('event', {
        changedTouches: [new Touch({clientX, identifier: 1, target: new EventTarget()})]
    })
}

describe('Example test', () => {
    let testScheduler: TestScheduler
    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected)
        })
    })

    it('some test', () => {

        testScheduler.run(({hot, expectObservable}) => {
            const touch1$ = hot('-a--b----c--|', {
                a: createTouch(10),
                b: createTouch(20),
                c: createTouch(1),
            })
            const sequence2 = '-a--b----c--|'


            expectObservable(
                getX(touch1$)
            ).toBe(sequence2, {
                a: 10,
                b: 20,
                c: 1
            })

        })
    })
})
