import '../../assets/css/style.css';
import { interval } from "rxjs";
import { skipLimit } from "./skip-limit";
import { terminalLog } from "../../utils/log-in-terminal";

/*
   sequence1$ ---0---1---2---3---4---5---6---7--
    skipLimit(2,3)
              -----------2---3---4-----------7--

 */


interval(1000)
    .pipe(skipLimit(2, 3))
    .subscribe((v) => {
        terminalLog(v);
    })
