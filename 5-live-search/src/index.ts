import 'bootstrap';
import '../../assets/css/style.css';
import './styles.css';
import { fromEvent } from "rxjs";
import { liveSearch, request } from "./live-search";
import { ajax } from "rxjs/ajax";

const inputEl = document.querySelector('#search') as HTMLInputElement;
const container = document.querySelector('.container') as HTMLDivElement;

liveSearch(
    fromEvent<InputEvent>(inputEl, 'input'),
    (text) => request(ajax(`http://api.github.com/search/repositories?q=${text}`)))
    .subscribe((htmlStr: string) => {
        container.innerHTML = htmlStr;
    })
