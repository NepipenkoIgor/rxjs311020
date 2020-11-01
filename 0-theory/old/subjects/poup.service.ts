import { ReplaySubject, Subject } from "rxjs";

class PopupService {
    private popupSequence$$ = new ReplaySubject()

    public getPopupData() {
        return this.popupSequence$$.asObservable();
    }

    public openPopup(data: any): void {
        this.popupSequence$$.next(data)
    }
}

export const popupService = new PopupService();
