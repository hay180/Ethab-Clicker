export let score = 0;
export let CPS = 1;
export let ACPS = 0;

export function detectedClick() {
    score = score + CPS;
}

export function getScore() {
    return score;
}

export function updateScore(newScore){
    score = newScore;
}
export function updateACPS(newACPS){
    ACPS = ACPS + newACPS;
}

export function setACPS(newACPS){
    ACPS = newACPS;
}

export function setCPS(newCPS){
    CPS = newCPS;
}