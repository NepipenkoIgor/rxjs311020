//import '../../assets/css/style.css';


import { interval, Observable, Subscriber } from "rxjs";
import { take } from "rxjs/operators";

// function doNothing<T>(source: Observable<T>) {
//     return source;
// }
//
// function toText<T>(source: Observable<T>) {
//     return new Observable((subscriber) => {
//         subscriber.next('RxJS awesome ')
//         subscriber.complete();
//     });
// }
//
// function double(source: Observable<number>): Observable<number> {
//     return new Observable((subscriber) => {
//         source.subscribe({
//             next(value) {
//                 subscriber.next(value * 2)
//             },
//             error(err) {
//                 subscriber.error(err);
//             },
//             complete() {
//                 subscriber.complete();
//             },
//         })
//     });
// }
//
//
// interval(1000)
//     .pipe(doNothing, take(4), double)
//     .subscribe((v) => {
//         console.log(v)
//     }, () => {
//     }, () => {
//         console.log('completed')
//     })


// const o$ = new Observable();
//
// o$.source = interval(1000);
//
// o$.operator = {
//     call(subscriber: Subscriber<unknown>, source: any): void {
//         source.subscribe(subscriber);
//     }
// }
//
// o$.subscribe((v) => console.log(v));

class DoubleSubscriber extends Subscriber<number> {
    next(value: number) {
        super.next(value * 2);
    }
}

function double(source: Observable<number>): Observable<number> {
    return source.lift({
        call(subscriber: Subscriber<number>, source: any): void {
            source.subscribe(new DoubleSubscriber(subscriber));
        }
    })
    // const o$ = new Observable<number>();
    //
    // o$.source = source;
    //
    // o$.operator = {
    //     call(subscriber: Subscriber<unknown>, source: any): void {
    //         source.subscribe(new DoubleSubscriber(subscriber));
    //     }
    // }
    // return o$;
}

const pipe = (...fns: Function[]) => (source: Observable<any>) => fns.reduce(
    (acc, fn) => fn(acc), source
)
let take4double = pipe(take(4), double)

interval(1000)
    .pipe(take4double)
    .subscribe((v) => {
        console.log(v)
    }, () => {
    }, () => {
        console.log('completed')
    });

