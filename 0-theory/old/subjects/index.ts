//  import '../../assets/css/style.css'
//
//
// // Observable + Observer = Subject
// import { Component1 } from "../old/subjects/component-1";
// import { Component3 } from "../old/subjects/component-3";
// //
// // setTimeout(()=>{
// //     new Component1();
// // }, 4000)
// // new Component3();
// import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
// import { ajax } from "rxjs/ajax";
//
// // const sequence$ = new ReplaySubject(Number.POSITIVE_INFINITY, 500)
// //
// // setTimeout(() => {
// //     sequence$.next(1);
// // }, 400)
// // setTimeout(() => {
// //     sequence$.next(4);
// // }, 600)
// // setTimeout(() => {
// //     sequence$.next(5);
// // }, 800)
// //
// // setTimeout(() => {
// //     sequence$.subscribe((v) => {
// //         console.log(v);
// //     })
// // }, 1000)
// //
// //
// // sequence$.next(6);
// // sequence$.next(4);
// // sequence$.next(2);
//
//
// // const sequence = new BehaviorSubject({name: 'Ihor'});
// //
// // sequence.next({name: 'Eugene'})
// // setTimeout(()=>{
// //     console.log(sequence.value)
// // }, 3000)
//
// // const sequence = new AsyncSubject();
// // sequence.subscribe((v) => {
// //     console.log(v);
// // })
// // sequence.next({name: 'Eugene'})
// // sequence.next({name: 'Ihor'})
// // sequence.next({name: 'Olena'})
// //
// // setTimeout(()=>{
// //     sequence.complete();
// // }, 5000)
// //
// // setTimeout(()=>{
// //     sequence.subscribe((v) => {
// //         console.log(v);
// //     })
// // }, 10000)
//
//
// function getUsers(url: string) {
//     let subject: AsyncSubject<any>;
//     return new Observable((subscriber) => {
//         if (!subject) {
//             subject = new AsyncSubject();
//             ajax(url).subscribe(subject);
//         }
//         return subject.subscribe(subscriber)
//     })
// }
//
// const users = getUsers('http://learn.javascript.ru/courses/groups/api/participants?key=dzteou')
// users.subscribe((u)=>{
//     console.log(u);
// })
//
// setTimeout(()=>{
//     users.subscribe((u)=>{
//         console.log(u);
//     })
// }, 7000)
