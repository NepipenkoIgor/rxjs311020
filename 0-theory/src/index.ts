import '../../assets/css/style.css'
// console.log('start');
// setTimeout(()=>console.log('time1'));
// setTimeout(()=>console.log('time2'));
// Promise.resolve().then(()=>console.log('promise1'));
// Promise.resolve().then(()=>console.log('promise2'));
// console.log('end');


// asap - microtask
// async - macrotask
// queue  - sync iteration
// animation  - animationFrame

import { asap, asapScheduler, asyncScheduler, combineLatest, from, of, queueScheduler, Subject } from "rxjs";
import { map, observeOn, subscribeOn, take, tap } from "rxjs/operators";

// console.log('start');
// of(1, 2, 3)
//     .pipe(
//         tap((v) => {
//             console.log('tap1', v)
//         }),
//         observeOn(asyncScheduler),
//         tap((v) => {
//             console.log('tap2', v)
//         }),
//         subscribeOn(asyncScheduler)
//     )
//     .subscribe((v) => {
//         console.log(v)
//     })
// setTimeout(() => console.log('time1'));
// setTimeout(() => console.log('time2'));
// console.log('end');

/*
  Macro-------Macro---------Macro------Macro------Macro----
  start       subscribe     time1      time2      tap2-1
  end         tap1-1                              1
               tap1-2                              .....
                tap1-3

 */


/*
  Macro-------Macro-----Macro------Macro------Macro----
  start       time1     time2
  end
  promise1
  promise2
 */

// const a$ = from([1, 2], asapScheduler);
// const b$ = of(10);
//
// const c$ = combineLatest([a$, b$])
//     .pipe(map(([v1, v2]) => v1 + v2))
//
//
// c$.subscribe((v) => {
//     console.log(v);
// })

const signal = new Subject<number>();
let count = 0;
const someCalc = (count: number) => console.log('do calc with', count);

console.log('start')
signal.pipe(observeOn(queueScheduler), take(5000))
    .subscribe((v: number) => {
        someCalc(v);
        signal.next(v);
    })
signal.next(count++);
console.log('end')
