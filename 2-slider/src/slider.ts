import { combineLatest, fromEvent, Observable } from "rxjs";
import { map, pluck, startWith, tap, withLatestFrom } from "rxjs/operators";

type SideCbType = (v: { element: any, value: number }) => void;

const qualitySlider = $('#quality').slider();
const ratingSlider = $('#rating').slider();
const actualSlider = $('#actual').slider();


const quality$ = getValue(
    fromEvent(qualitySlider, 'change'),
    {element: getInitialElement(qualitySlider), value: 5},
    redrawSlider
)
const rating$ = getValue(
    fromEvent(ratingSlider, 'change'),
    {element: getInitialElement(ratingSlider), value: 5},
    redrawSlider
)
const actual$ = getValue(
    fromEvent(actualSlider, 'change'),
    {element: getInitialElement(actualSlider), value: 5},
    redrawSlider
)

const resultButton = document.querySelector('#send-result') as HTMLButtonElement

export const sliderResultSequence$ = fromEvent(resultButton, 'click')
    .pipe(
        withLatestFrom(sliderSequence(quality$, rating$, actual$)),
        pluck('1')
    )


export function sliderSequence(...scores: Observable<number>[]): Observable<number> {
    return combineLatest<number[]>(scores)
        .pipe(map(([quality, rating, actual]: number[]) => {
            return Math.round((quality + rating + actual) / 3 * 10)
        }))
}


export function getInitialElement(element: any) {
    return element.parent().children(':first-child')[0]
}


export function getValue(source$: Observable<any>, initialValue: any, sideCb: SideCbType) {
    return source$
        .pipe(
            map(({delegateTarget: {previousElementSibling}, value: {newValue}}) => {
                return {
                    value: newValue,
                    element: previousElementSibling
                }
            }),
            startWith(initialValue),
            tap(sideCb),
            map(({value}) => value)
        )
}


function redrawSlider({element, value}: any): void {
    const sliderTrack = element.querySelector('.slider-track');
    const valuePercentage = value * 10;
    sliderTrack.classList.remove('bad', 'good', 'warn');
    if (valuePercentage < 40) {
        sliderTrack.classList.add('bad');
        return
    }
    if (valuePercentage >= 40 && valuePercentage < 70) {
        sliderTrack.classList.add('warn');
        return
    }

    sliderTrack.classList.add('good');
}
