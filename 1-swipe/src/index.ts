import { swipe$ } from './swipe';
import { terminalLog } from "../../utils/log-in-terminal";


swipe$.subscribe((direction) => {
    if (direction > 0) {
        terminalLog(`Swipe left`);
        return;
    }
    terminalLog(`Swipe right`);
})
