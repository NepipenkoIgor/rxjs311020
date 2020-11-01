// import '../../assets/css/style.css'
import { EMPTY, interval, of, zip } from "rxjs";
import { catchError, delay, map, retry, retryWhen, switchMap, tap } from "rxjs/operators";

const sequence1$ = interval(500);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');

const sequence$ = zip(sequence1$, sequence2$);

sequence$
    .pipe(
        switchMap(([, y])=>{
            return of(y)
                .pipe(
                    map((y) => {
                        return (y as any).toUpperCase();
                    }),
                    catchError(() => {
                        return  EMPTY// of('0');
                    }),
                )
        })
       //  map(([, y]) => {
       //      // try {
       //      //     return (y as any).toUpperCase();
       //      // } catch (err) {
       //      //     return '0';
       //      // }
       //      return (y as any).toUpperCase();
       //  }),
       //  tap(() => {
       //      console.log('tap before error')
       //  }),
       // // retryWhen((obs)=> obs.pipe(delay(5000))),
       //  // retry(3),
       //  catchError((err) => {
       //      return of('0');
       //  }),
       //  tap(() => {
       //      console.log('tap after error')
       //  }),
    )
    .subscribe(
        (v) => {
            console.log(v);
        }, (err) => {
            console.log(`My ERROR => ${err}`);
        }, () => {
            console.log('completed')
        })
