import { ajax } from "rxjs/ajax";
import { concatAll, pluck, shareReplay, switchMap, toArray } from "rxjs/operators";
import { timer } from "rxjs";

class UserService {
    public uniqueNameSequence$ = timer(0, 16000)
        .pipe(
            switchMap(() => {
                return ajax('http://learn.javascript.ru/courses/groups/api/participants?key=dzteou')
                    .pipe(
                        pluck('response'),
                        concatAll(),
                        pluck('profileName'),
                        toArray(),
                    )
            }),
            shareReplay()
        )
}

export const userService = new UserService();
