import '../../assets/css/style.css';
import  './styles.css';
import { animationDown } from "./animate";
import { terminalLog } from "../../utils/log-in-terminal";

const shape = document.querySelector('div.animated-shape') as HTMLElement;
animationDown(shape)
.subscribe((frame)=>{
    terminalLog(`Position is ${frame} px `)
}, ()=>{}, ()=>{
    console.log('animation completed')
})
