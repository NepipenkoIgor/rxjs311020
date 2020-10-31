import '../../assets/css/style.css';
import { fromEvent, iif, merge, Observable, of, zip } from "rxjs";
import { filter, map, pluck, switchMap } from "rxjs/operators";


const touchStart$ = getX(
    merge(
        fromEvent<TouchEvent>(document, 'touchstart'),
        fromEvent<MouseEvent>(document, 'mousedown'),
    ))
const touchEnd$ = getX(
    merge(
        fromEvent<TouchEvent>(document, 'touchend'),
        fromEvent<MouseEvent>(document, 'mouseup'),
    ))


export function getX(source$: Observable<TouchEvent | MouseEvent>): Observable<number> {
    return source$
        .pipe(
            switchMap((event: TouchEvent | MouseEvent) => {
                return iif(
                    () => event instanceof TouchEvent,
                    of(event as TouchEvent).pipe(pluck('changedTouches', '0', 'clientX')),
                    of(event as MouseEvent).pipe(pluck('clientX')),
                )
            })
            // map((event) => {
            //     if (event instanceof TouchEvent) {
            //         return event.changedTouches[0].clientX
            //     }
            //     return event.clientX
            // })
        )
}


export function swipe(source1$: Observable<[number, number]>) {
    return source1$.pipe(
        map(([starX, endX]) => starX - endX),
        filter(value => value !== 0)
    )
}

export const swipe$ = swipe(zip(touchStart$, touchEnd$))
