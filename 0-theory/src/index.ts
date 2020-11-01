//import '../../assets/css/style.css'
import { ConnectableObservable, interval, ReplaySubject, Subject, Subscription } from "rxjs";
import { multicast, publish, refCount, share } from "rxjs/operators";

// const control$$ = new ReplaySubject(2);
//
// const sequence = interval(1000)
//
// const connectableObservable = sequence
//     .pipe(
//         // multicast(control$$)
//         publish() // multicast + subject,
//
//     ) as ConnectableObservable<any>
//
// connectableObservable.subscribe((v) => {
//     console.log('Sub 1 ==>', v);
// })
// connectableObservable.connect();
//
// // setTimeout(() => {
// //     connectableObservable.connect();
// // }, 5000)
//
//
// setTimeout(() => {
//     connectableObservable.subscribe((v) => {
//         console.log('Sub 2 ==>', v);
//     })
// }, 5000)


const sequence = interval(1000)

const regularObservable = sequence
    .pipe(
        // multicast(control$$)
        // publish(), // multicast + subject,
        // refCount()
        share() // multicast + subject + refCount
    )
let sub1: Subscription;
let sub2: Subscription;
sub1 = regularObservable.subscribe((v) => {
    console.log('Sub 1 ==>', v);
})

// setTimeout(() => {
//     connectableObservable.connect();
// }, 5000)


setTimeout(() => {
    sub2 = regularObservable.subscribe((v) => {
        console.log('Sub 2 ==>', v);
    })
}, 5000)

setTimeout(() => {
    sub1.unsubscribe();
    sub2.unsubscribe();
}, 7000)

setTimeout(() => {
    regularObservable.subscribe((v) => {
        console.log('Sub 3 ==>', v);
    })
}, 10000)
