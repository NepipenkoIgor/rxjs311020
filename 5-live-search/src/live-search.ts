import { EMPTY, Observable, of } from "rxjs";
import {
    bufferCount, catchError,
    concatAll,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    pluck, reduce,
    switchMap
} from "rxjs/operators";
import { AjaxResponse } from "rxjs/ajax";


// export interface IResult {
//     name: string;
//     description: string,
//     owner: {
//         avatar_url: string
//     }
// }

class ResultItem {
    public name: string;
    public description: string;
    public avatar_url: string;

    constructor({name, description, owner: {avatar_url}}: any) {
        this.name = name;
        this.description = description;
        this.avatar_url = avatar_url;
    }
}


export function liveSearch(source1$: Observable<InputEvent>, sourceFn: (text: string) => Observable<any>) {
    return source1$.pipe(
        debounceTime(300),
        pluck<InputEvent, string>('target', 'value'),
        map((text: string) => text.trim()),
        filter((text) => text.length > 3),
        distinctUntilChanged(),
        switchMap(sourceFn)
    )
}

export function request(source$: Observable<AjaxResponse>): Observable<any> {
    return source$
        .pipe(
            pluck<AjaxResponse, any[]>('response', 'items'),
            concatAll(),
            map((item) => new ResultItem(item)),
            map(createCard),
            bufferCount(3),
            reduce((resultStr: string, htmlStrs: string[]) => {
                return `${resultStr}${createRow(htmlStrs)}`
            }, ''),
            map((htmlStr) => htmlStr.trim().replace(/\s+(<)/g, '<')),
            catchError(() => {
                return  EMPTY
            }),
        )
}


function createCard(item: ResultItem) {
    return `<div class="col-md-4 col-sm-6">
       <div class="card">
           <img  class="card-img-top" src=${item.avatar_url} alt=${item.name} />
           <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
           </div>
       </div>
    </div>
    `
}


function createRow(htmlStrs: string[]): string {
    return `<div class="row">${htmlStrs.join(' ')}</div>`
}
