//import '../../assets/css/style.css';

import { defer, from, generate, iif, of, range, timer } from "rxjs";
import { concatAll, filter, map, pluck } from "rxjs/operators";
import { terminalLog } from "../../utils/log-in-terminal";
import { ajax } from "rxjs/ajax";

// const sequence$ = of({name: 'Ihor'}, {name: 'Eugene'});
// const sequence$ = from([{name: 'Ihor'}, {name: 'Eugene'}]);
// const sequence$ = range(0,10);
// const sequence$ = timer(5000,1000);
// const sequence$ = generate(1, (v) => v < 4, (v) => v + 2);
// const random = Math.round(Math.random() * 10);
// const sequence$ = iif(() => {
//     return random > 5;
// }, of(`First number is ${random}`), of(`Second number is ${random}`))
//
// sequence$.subscribe((v) => {
//     console.log(v);
// })
//
// const sequence$ = defer(() => {
//     return random >= 5
//         ? random >= 8
//             ? of(`First number is ${random}`)
//             : of(`Second number is ${random}`)
//         : of(`Third number is ${random}`)
// })
// sequence$.subscribe((v) => {
//     console.log(v);
// })


// from(fetch('http://learn.javascript.ru/courses/groups/api/participants?key=dzteou')
//     .then((res) => res.json()))
// ajax('http://learn.javascript.ru/courses/groups/api/participants?key=dzteou')
//     .pipe(
//         pluck('response'),
//         concatAll(),
//         map((data: any) => `${data.firstName} ${data.surname}`))
//     .subscribe((data) => {
//         terminalLog(data)
//     })


import fs from 'fs';
import util from 'util';

const promisifiedRead = util.promisify(fs.readFile)
const read$ = from(promisifiedRead(`${__dirname}/text`))

read$
    .pipe(
        map((buffer) => {
            const str = buffer.toString();
            const regExp = />([^<]+)</;
            console.log(regExp.exec(str))
            return regExp.exec(str);
        }),
        filter(Boolean),
        pluck('1'),
        map((str: any) => str.trim())
    )
    .subscribe((v) => {
        console.log(v);
    })

