import { getX } from "./swipe";
import { hot } from "jasmine-marbles";

function createTouch(clientX: any) {
    return new TouchEvent('event', {
        changedTouches: [new Touch({clientX, identifier: 1, target: new EventTarget()})]
    })
}

describe('Example test', () => {

    it('some test', () => {
        const touch1$ = hot('-a--b----c--|', {
            a: createTouch(10),
            b: createTouch(20),
            c: createTouch(1),
        })
        const sequence2 = hot('-a--b----c--|', {
            a: 10,
            b: 20,
            c: 1
        })
        expect(getX(touch1$)).toBeObservable(sequence2)
    })
})
