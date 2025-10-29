import * as click from './click.js'
import {items} from './shop.js'
import {setACPS} from "./click.js";

export function ethabFileDownload(filename, content){
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

export function save(items,score,cps,acps){
    const saveload = {
        Items: items,
        score: score,
        acps: acps,
        cps: cps
    }

    const saveloadStringify = JSON.stringify(saveload);

    const b64 = btoa(saveloadStringify);

    ethabFileDownload("save.ethab",b64);
}

export function readFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;
            load(fileContent);
        };

        reader.onerror = function(e) {
            alert("Error reading file: " + e);
        };

        reader.readAsText(file);
    } else {
        alert("No file selected.");
    }
}

export function load(b64JSON){
    const JSONStringify = atob(b64JSON);
    const parsed = JSON.parse(JSONStringify);
    click.setACPS(parsed.acps);
    click.updateScore(parsed.score);
    click.setCPS(parsed.cps)
    let itemName = []
    let itemHas = []
    let itemBoost = []

    parsed.items.forEach(item => {
        itemName.push(item.Name);
        itemHas.push(item.Have);
        itemBoost.push(item.Boost);
    })

    items.forEach(item => {
        let index = itemName.indexOf(item.name)
        if (index > -1) {
            item.Have = itemHas.at(index);
            item.Boost = item.at(index)
        }
    })


}