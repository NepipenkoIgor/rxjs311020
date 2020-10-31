//import '../../assets/css/style.css';
import { interval, of, zip } from "rxjs";
import { concatAll, filter, last, map, skip, take } from "rxjs/operators";

//const sequence1$ = interval(1000);

/*
sequence1$  ---0---1---2---3---4---5---
   map((x)=>x*3)
            ---0---3---6---9---12---15---
   filter((x)=>x%2===0)
            ---0-------6-------12-------
   take(3)
            ---0-------6-------12|
   last()
sequence$   -------------------12|
 */


// const sequence$ = sequence1$
//     .pipe(
//         map((x) => x * 3),
//         filter((x) => x % 2 === 0),
//         take(3),
//         last()
//     )


// sequence$.subscribe((v) => {
//     console.log(v);
// })

// const sequence2$ = of(['Igor', 'Dima', 'Nikita']);
// /*
//    sequence2$  ['Igor', 'Dima', 'Nikita']|
//      concatAll()
//    sequence$   (Igor,'Dima','Nikita')|
//  */
//
// sequence2$.pipe(map((arr)=>{})).subscribe((v) => {
//     console.log(v);
// })


const sequence1$ = of('r', 'x', 'j', 's');
const sequence2$ = interval(400).pipe(take(4));

/*
  sequence1$ (rxjs)|
  sequence2$ ---0---1---2---3|
    zip(sequence1$,sequence2$)
              ---([r,0])---([x,1])---([j,2])---([s,3])|
   map(([l]) => l)
              ---r---x---j---s|
 */
zip(sequence1$, sequence2$)
    .pipe(map(([l]) => l))
    .subscribe((v) => {
        console.log(v);
    })
