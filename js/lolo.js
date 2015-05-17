
var g_canvas = document.getElementById("myCanvas");//.style.backgroundImage = "url('Background.png')";
 
var g_ctx = g_canvas.getContext("2d");

// =============
// GATHER INPUTS
// =============
var posx;
var posy;
var i =0;
var currentLevelArray = [
    level01, level02, level03, level04, level05, runeLevel01,
    level06, level07, level08, level09, level10, runeLevel02,
    level11, level12, level13, level14, level15, runeLevel03,
    level16, level17, level18, level19, level20, runeLevel04,

    ]
var currentLevel = currentLevelArray[i];

var g_pause = { text:'Press P to Play'}

g_pause.render = function (ctx) {
    ctx.save();    
    ctx.font = "bold 30px Arial";
    // Draws Pause-text in the middle of the canvas
    ctx.fillStyle="white";
    ctx.strokeStyle="black";
    ctx.textAlign = "center"; 
    ctx.fillText(g_pause.text, g_canvas.width/2, g_canvas.height/2);
    ctx.strokeText(g_pause.text, g_canvas.width/2, g_canvas.height/2);
    ctx.restore();
};

function nextLevel (){
    this.makeFog();
    i++;
    if(i >= currentLevelArray.length){
        i = 0;
        g_levelStatus = 0;
    }
    // Don't update the level count when we go into the rune room
    if(currentLevel !== level05 && currentLevel !== level10 && currentLevel !== level15 && currentLevel !== level20){
        g_levelStatus++;
    }
    g_heartCollect =0
    currentLevel = currentLevelArray[i];
    entityManager.killEverything();
    createInitialEverything(currentLevel);
    createWater(currentLevel);




}
function resetLevel (){
    // g_switchingLevels.play();
    this.makeFog();
    g_heartCollect =0
    // currentLevel = currentLevelArray[i];
    entityManager.killEverything();
    createInitialEverything(currentLevel);
    createWater(currentLevel);

}

function makeFog(){
    g_loadingLevel.play();

  entityManager.generateLevelSwitch({
        cx : 320,
        cy : 320
    });
}

// Go through the level 2D array and create the viking where '!' is
function createInitialEverything(currentLevel) {
    for(var bx = 0; bx < currentLevel.character.length; bx++) {
    //First value of matrix designates row so below we multiply by bx
        for(var by = 0; by < currentLevel.character[bx].length; by++) {
            posx = currentLevel.xBase + (currentLevel.cellWidth*by);
            posy = currentLevel.yBase + (currentLevel.cellHeight*bx);
            // Viking
            if(currentLevel.character[bx][by]=== '!') {
                entityManager.generateViking({
                    cx : posx,
                    cy : posy
                });
            }
            // Sheep
            if(currentLevel.character[bx][by]=== 's') {
                entityManager.generateSheep({
                    cx : posx,
                    cy : posy
                });
            }
            // Medusa
            if(currentLevel.character[bx][by]=== 'm') {
                entityManager.generateMedusa({
                    cx : posx,
                    cy : posy
                });
            }
            // Treasure Box
            if(currentLevel.character[bx][by]=== 'o') {
                entityManager.generateTreasureBox({
                    cx : posx,
                    cy : posy
                });
            }
            // Door
            if(currentLevel.character[bx][by]=== '=') {
                entityManager.generateDoor({
                    cx : posx,
                    cy : posy
                });
            }
            // Borders
            if(currentLevel.character[bx][by]=== '-') {
                entityManager.generateBorder({
                    cx : posx,
                    cy : posy
                });
            }
            // Tree
            if(currentLevel.character[bx][by]=== '*') {
                entityManager.generateTree({
                    cx : posx,
                    cy : posy
                });
            }
            // Heart
            if(currentLevel.character[bx][by]=== 'h') {
                entityManager.generateHeart({
                    cx : posx,
                    cy : posy
                });
            }
            // Block
            if(currentLevel.character[bx][by]=== '#') {
                entityManager.generateBlock({
                    cx : posx,
                    cy : posy
                });
            }
            // Bridge
            if(currentLevel.character[bx][by]=== '%') {
                entityManager.generateBridge({
                    cx : posx,
                    cy : posy
                });
            }
            // Mountain
            if(currentLevel.character[bx][by]=== '@') {
                entityManager.generateMountain({
                    cx : posx,
                    cy : posy
                });
            }
            // Lundi
            if(currentLevel.character[bx][by]=== 'e') {
                entityManager.generateLundi({
                    cx : posx,
                    cy : posy
                });
            }
            // Dragon
            if(currentLevel.character[bx][by]=== 'r') {
                entityManager.generateDragon({
                    turning_direction : 'right',
                    cx : posx,
                    cy : posy
                });
            }
            // Dragon
            if(currentLevel.character[bx][by]=== 'l') {
                entityManager.generateDragon({
                    turning_direction : 'left',
                    cx : posx,
                    cy : posy
                });
            }
            //  if(background_level01.character[bx][by]=== ':') {
            //     entityManager.generateWater({
            //         cx : posx,
            //         cy : posy
            //     });
            // }

        }
    };
}

function createWater(currentLevel) {
    for(var bx = 0; bx < currentLevel.character.length; bx++) {
    //First value of matrix designates row so below we multiply by bx
        for(var by = 0; by < currentLevel.character[bx].length; by++) {
            posx = currentLevel.xBase + (currentLevel.cellWidth*by);
            posy = currentLevel.yBase + (currentLevel.cellHeight*bx);
            if(currentLevel.character[bx][by]=== ':') {
                entityManager.generateWater({
                    cx : posx,
                    cy : posy
                });
            }
        }
    };
}


function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

function updateSimulation(du) {
    // background_level01.update(du);
    soundManager.update(du);

    entityManager.update(du);
}

// =================
// RENDER SIMULATION
// =================

//When Viking collides with Heart
function renderGameStatus(){
    document.getElementById('heartCollect').innerHTML = g_heartCollect;
    document.getElementById('levelStatus').innerHTML = g_levelStatus;

}


 
function renderSimulation(ctx) {
    
    // background_level01.render(ctx);
    entityManager.render(ctx);
    renderGameStatus();
}
 
// Kick it off
function mainInit() {
    g_themeSong.play();
    g_themeSong.loop = true;
    g_main.init();

}


// Kick it off
requestPreloads();

