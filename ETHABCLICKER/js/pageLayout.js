import * as click from "./click.js";
import {buyItem, items} from "./shop.js"
import * as save from "./save.js";

export const S1x = 0;
export const S1y = 0;
export const S1w = window.innerWidth/2
export const S1h = window.innerHeight-200;
export const S2x = window.innerWidth/2;
export const S2y = 0;
export const S2w = window.innerWidth/2
export const S2h = window.innerHeight-200;
export let shopCount = 0;

export function createSection(x,y,w,h,bColor,color,bW){
    const section = document.createElement("div")
    section.classList.add("section")
    section.style.position = "absolute";
    section.style.left = x+"px";
    section.style.top = y+"px";
    section.style.width = w+"px";
    section.style.height = h+"px";
    section.style.background = color;
    section.style.border = bW+"px solid " + bColor;
    document.body.appendChild(section);
}

export function writeScore(){
    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("scoreDiv");
    scoreDiv.style.position = "absolute";
    scoreDiv.style.top = "20px"
    scoreDiv.style.left = "20px"
    scoreDiv.style.color = "black";
    scoreDiv.style.fontSize = "32px";
    scoreDiv.style.fontFamily = "monospace";
    scoreDiv.style.zIndex = "1";
    document.body.appendChild(scoreDiv);

}

export function updateScore(){
    const scoreDiv = document.querySelector(".scoreDiv");
    if(scoreDiv) scoreDiv.textContent = click.getScore().toString();
}

export function mainButton(){
    const ClickBtn = document.createElement("button");
    const buttonX = S1w/2 - 250;
    const buttonY = S1h/2 - 50;
    ClickBtn.classList.add("clickBtn");
    ClickBtn.setAttribute("id", "mainButton");
    ClickBtn.style.position = "absolute";
    ClickBtn.style.top = buttonY + "px";
    ClickBtn.style.left = buttonX + "px";
    ClickBtn.style.width = "500px";
    ClickBtn.style.height = "100px";
    ClickBtn.style.zIndex = "1";
    ClickBtn.textContent = "Click Me"
    ClickBtn.style.borderColor = "#FFFFFF"
    ClickBtn.addEventListener("click",click.detectedClick);
    document.body.appendChild(ClickBtn);
}

export function updateShop(){
    items.forEach((item) => {
        const exist = document.getElementById(item.Name);

        // Check if item is out of stock and should be removed
        if (exist && item.InStock === 0) {
            exist.remove();
            return;
        }

        // Always update existing buttons
        if (exist) {
            exist.innerText = item.Name + " " + item.Price;
            // Disable button if out of stock
            if (item.InStock === 0) {
                exist.disabled = true;
                exist.innerText = item.Name + " (OUT OF STOCK)";
            }
        }

        // Create new buttons if benchmark is met and item is in stock
        if(item.Benchmark <= click.score && !exist && item.InStock !== 0){
            const newItem = document.createElement("button");
            const down = S2y + (shopCount * 70)
            newItem.setAttribute("id", item.Name);
            newItem.innerText = item.Name + " " + item.Price;
            newItem.classList.add("newItem");
            newItem.style.position = "absolute";
            newItem.style.top = down + "px";
            newItem.style.left = S2x + "px";
            newItem.style.width = "200px";
            newItem.style.height = "50px";
            newItem.addEventListener("click", () => buyItem(item.Name));
            newItem.setAttribute("data-tooltip", item.Description);
            document.body.appendChild(newItem);
            shopCount++;
        }
    })
}

export function createSaveButton(){
    const saveButton = document.createElement("button")
    saveButton.innerText = "Save";
    saveButton.classList.add("saveButton");
    saveButton.style.position = "absolute";
    saveButton.style.top = "90%";
    saveButton.style.left = "10%";
    saveButton.style.width = "50px";
    saveButton.style.height = "30px";
    saveButton.style.transform = "(-25px, -15px)";
    saveButton.addEventListener("click",() => save.save(items,click.score,click.CPS,click.ACPS));
    document.body.appendChild(saveButton);

}

export function createLoadButton(){
    const loadButton = document.createElement("input")
    loadButton.setAttribute("type", "file");
    loadButton.setAttribute("id", "fileInput");
    loadButton.classList.add("loadButton");
    loadButton.style.position = "absolute";
    loadButton.style.top = "90%";
    loadButton.style.left = "90%";
    loadButton.style.width = "90px";
    loadButton.style.height = "30px";
    loadButton.style.transform = "(-45px, -15px)";
    loadButton.style.zIndex = "1";
    loadButton.addEventListener("change", () => save.readFile());
    document.body.appendChild(loadButton);


}

export function summonEthabButton(){
    const summonEthabButton = document.createElement("a")
    summonEthabButton.setAttribute("id", "summonEth");
    summonEthabButton.setAttribute("href", "https://ethab.netlify.app");
    summonEthabButton.classList.add("summonEthabButton");
    summonEthabButton.innerText = "Summon Ethab";
    summonEthabButton.style.position = "absolute";
    summonEthabButton.style.top = "90%";
    summonEthabButton.style.left = "45%";
    summonEthabButton.style.width = "50px";
    summonEthabButton.style.height = "50px";
    document.body.appendChild(summonEthabButton);


}


