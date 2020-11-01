import { fromEvent, Observable } from "rxjs";
import { concatMap, map, takeUntil, tap } from "rxjs/operators";

export const box = document.querySelector('.draggable') as HTMLDivElement;

const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup');

export const drag$ = drag(mousedown$, mousemove$, mouseup$);

export function drag(
    source1$: Observable<MouseEvent>,
    source2$: Observable<MouseEvent>,
    source3$: Observable<MouseEvent>,
) {
    return source1$
        .pipe(
            concatMap((start: MouseEvent) => {
                return source2$
                    .pipe(
                        tap((move) => {
                            move.preventDefault()
                        }),
                        map((move: MouseEvent) => {
                            return {
                                left: move.clientX - start.offsetX,
                                top: move.clientY - start.offsetY,
                            }
                        }),
                        takeUntil(source3$)
                    )
            })
        )
}
