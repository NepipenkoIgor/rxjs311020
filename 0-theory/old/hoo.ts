import '../../assets/css/style.css'
import { fromEvent, interval, of } from "rxjs";
import { concatMap, exhaustMap, map, mergeAll, mergeMap, pluck, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// const sequence$ = interval(2000)
//     .pipe(
//         mergeMap((v) => {
//             return of(v * 2)
//         }),
//         // map+ mergeAll() => mergeMap
//     )
//
// sequence$.subscribe((value) => {
//     console.log(value)
// })

const sequence$ = fromEvent(document, 'click')
    .pipe(
        exhaustMap((v) => {
            return ajax('http://learn.javascript.ru/courses/groups/api/participants?key=dzteou')
                .pipe(pluck('response'))
        }),
        // map+ mergeAll() => mergeMap
        // map+ switchAll() => mergeMap
        // map+ concatMap() => concatMap
        // map+ exhaust() => exhaustMap
    )

sequence$.subscribe((value) => {
    console.log(value)
})
