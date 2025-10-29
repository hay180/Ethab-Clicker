import { addClicks } from "./auto.js";
import * as click from "./click.js";


export let items = []

export function createShopItem(NOI, desc, bmark, base, increment, Aclicks, cPrice, boostName, boostBy, boost, sale, c, summon){
    let item = {
        Name: NOI,
        Description: desc,
        Benchmark: bmark,
        BasePrice: base,
        Add: increment,
        Autoclicks: Aclicks,
        Have: 0,
        Price: cPrice,
        Boost: boostName,
        By: boostBy,
        Boosted: boost,
        InStock: sale,
        Clicks: c,
        SummonImage: summon
    }
    items.push(item);
    
}

export function boostItem(){

}

export function buyItem(thing){
    items.forEach((item) => {
        if (item.Name === thing) {
            let score = click.getScore();
            if (score >= item.Price) {
                
                if (item.InStock === 0) {
                    return;
                }

                score = score - item.Price;
                item.Have++;
                item.Price = item.BasePrice + (item.Add * item.Have)
                const thisItemBoost = item.Boost
                const thisItemBoostBy = item.By

                let effectiveACPS = item.Autoclicks;

                items.forEach(booster => {
                    if (booster.Boost === item.Name && booster.Have > 0) {
                        effectiveACPS = effectiveACPS * booster.By;
                    }
                });
                click.setCPS(click.CPS + item.Clicks)
                click.updateACPS(effectiveACPS)
                click.updateScore(score)

                if (item.InStock > 0) {
                    item.InStock--;
                }

                if (thisItemBoost) {
                    items.forEach(otherItem => {
                        if(otherItem.Name === thisItemBoost && otherItem.Have > 0){
                            const additionalACPS = otherItem.Autoclicks * (thisItemBoostBy - 1) * otherItem.Have;
                            click.updateACPS(additionalACPS);
                        }
                    })
                }

                if (item.SummonImage) {
                    let img = document.createElement("img")
                    if(item.Name === "Summon Ethab"){
                        img.src = "../images/ETHAB.png"
                    }
                    document.body.appendChild(img)
                }
            }
        }
    })
}

