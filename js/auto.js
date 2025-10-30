import * as click from './click.js'

let intervalStarted = false

export function detectedClick(){
    click.updateScore(click.score + click.ACPS)
}

export function addClicks(){
    if (!intervalStarted) {
        setInterval(detectedClick, 1000)
        intervalStarted = true;
    }
    requestAnimationFrame(addClicks)
}
