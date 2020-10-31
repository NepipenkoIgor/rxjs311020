import '../../assets/css/style.css';
import { terminalLog } from "../../utils/log-in-terminal";
import { fromEvent, interval, Observable, of, Subscriber, Subscription } from "rxjs";
// callback
// promise (async/await)
// generator


// const sequence = new Promise((res) => {
//     let count = 1;
//     setInterval(() => {
//         res(count++);
//     }, 1000)
// })
// sequence.then((v) => terminalLog(v));
// sequence.then((v) => terminalLog(v));
// sequence.then((v) => terminalLog(v));
// sequence.then((v) => terminalLog(v));


// const fn = function* iteratorFunction() {
//     let item = 1;
//     while (true) {
//         yield item++;
//     }
// }
// const sequence = fn();
//
// terminalLog(sequence.next().value);
// terminalLog(sequence.next().value);
// terminalLog(sequence.next().value);
// terminalLog(sequence.next().value);
// terminalLog(sequence.next().value);
// terminalLog(sequence.next().value);
// terminalLog(sequence.next().value);
// terminalLog(sequence.next().value);


// Observable - lazy push collection

// const sequence = interval(1000)
//     .subscribe((item) => {
//         terminalLog(item);
//     })

// setTimeout(()=>{
//     sequence.subscribe((item) => {
//         console.log(item);
//     })
// }, 5000)

// const sequence = interval(1000)
//     .subscribe((item) => {
//         console.log(item);
//     }, (err) => {
//
//     }, () => {
//         console.log('Completed ')
//     })

// const sequence = of({a: 1}, {b: 2});
// let obj: any;
// sequence.subscribe((item) => {
//     console.log('Sub 1', item);
//     obj = item;
// })
//
// setTimeout(() => {
//     sequence.subscribe((item) => {
//         console.log('Sub 2', obj === item);
//     })
// }, 5000)


// const sequence = fromEvent<MouseEvent>(document, 'click');
// sequence.subscribe((e: MouseEvent) => {
//     terminalLog(`Sub 1 => ${e.clientX}`);
// })
//
// setTimeout(() => {
//     sequence.subscribe((e: MouseEvent) => {
//         terminalLog(`Sub 2 => ${e.clientX}`);
//     })
// }, 5000)

const sequence = new Observable((subscriber: Subscriber<number>) => {
    terminalLog('Observable init')
    //let count = 1;
    // const intervalId = setInterval(() => {
    //     subscriber.next(count++);
    // }, 1000)
    //
    // return () => {
    //     terminalLog('unsubscribe');
    //     clearInterval(intervalId);
    // }
    const fn = (e: MouseEvent) => {
        subscriber.next(e.clientX)
    }
    document.addEventListener('click', fn)

    return () => {
        terminalLog('unsubscribe');
        document.removeEventListener('click', fn);
    }
})

const sub1: Subscription = sequence.subscribe((item: number) => {
    terminalLog(`Sub 1 => ${item}`);
})

setTimeout(() => {
   // sub1.unsubscribe();
    sequence.subscribe((item: number) => {
        terminalLog(`Sub 2 => ${item}`);
    })
}, 5000)
