import * as page from "./pageLayout.js";
import * as click from "./click.js";
import * as shop from "./shop.js";
import * as auto from "./auto.js"

function createItems(){
    shop.createShopItem("Auto Clicker","Does some clicking on its own",20,20,5,1,20,0,0,0,-1,0,0);
    shop.createShopItem("Mouse","You click with it, I'm pretty sure",200,300,50,0,300,"Auto Clicker",2,0,1,1,0);
    shop.createShopItem("Track Shirt","Make sure you go to all the practices",50,200,50,10,200,0,0,0,1,0,0);
    shop.createShopItem("Fig Bar","Do you want this? (please take it)",30,30,0,0,30,0,0,0,-1,0,0);
    shop.createShopItem("Summon Ethab","SUMMON ETHAB",1000,10000,0,0,10000,0,0,0,1,0,true);


}

function drawMain(){
    page.createSection(0,0,window.innerWidth/2,window.innerHeight-200, "#000000", "#FFFFFF", 1);
    page.createSection(window.innerWidth/2,0,window.innerWidth/2,window.innerHeight-200, "#000000", "#FFFFFF", 1);
    page.mainButton()
    page.writeScore()
    page.createSaveButton()
    page.createLoadButton()
    page.summonEthabButton()
    auto.addClicks()
    createItems()

}

function updateMain(){
    page.updateScore()
    page.updateShop()
    requestAnimationFrame(updateMain);
}

drawMain();
updateMain();