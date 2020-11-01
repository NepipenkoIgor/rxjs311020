//
// import { UnSubscriber } from "./unsubscriber";
// import { takeUntil } from "rxjs/operators";
//
//
// export class Component1 extends UnSubscriber {
//
//     constructor() {
//         super();
//         popupService.getPopupData()
//             .pipe(takeUntil(this.unsubscribe$$))
//             .subscribe((data) => {
//                 console.log('Component 1 popup data', data)
//             })
//     }
// }
