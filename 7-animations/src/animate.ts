// return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * Math.pow(2, -10 * percentage) + 1;


import { animationFrameScheduler, asapScheduler, asyncScheduler, defer, interval } from "rxjs";
import { map, takeWhile, tap } from "rxjs/operators";

function timeLine(scheduler = animationFrameScheduler) {
    return defer(() => {
        const start = scheduler.now();
        return interval(0, scheduler)
            .pipe(map(() => scheduler.now() - start))
    })
}

function duration(ms: number, scheduler = animationFrameScheduler) {
    return timeLine(scheduler)
        .pipe(
            map((time) => time / ms),
            takeWhile((percentage) => percentage <= 1)
        )
}

function distance(px: number) {
    return (percentage: number) => percentage * px;
}

function animation(percentage: number) {
    return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * Math.pow(2, -10 * percentage) + 1;
}

export function animationDown(element: HTMLElement) {
    return duration(20000)
        .pipe(
            map(animation),
            map(distance(100)),
            tap((frame) => {
                element.style.transform = `translate3d(0,${frame}px,0)`
            })
        )
}
