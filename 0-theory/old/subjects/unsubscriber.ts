import { Subject } from "rxjs";

export class UnSubscriber {
    public unsubscribe$$ = new Subject()

    public ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete()
    }
}
