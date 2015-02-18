
var g_canvas = document.getElementById("myCanvas");//.style.backgroundImage = "url('Background.png')";
 
var g_ctx = g_canvas.getContext("2d");
// =============
// GATHER INPUTS
// =============
var posx;
var posy;

// Go through the level 2D array and create the viking where '!' is
function createInitialViking() {

    for(var bx = 0; bx < background_level01.character.length; bx++) {
    //First value of matrix designates row so below we multiply by bx
        for(var by = 0; by < background_level01.character[bx].length; by++) {
            posx = background_level01.xBase + (background_level01.cellWidth*by);
            posy = background_level01.yBase + (background_level01.cellHeight*bx);
            if(background_level01.character[bx][by]=== '!') {
                entityManager.generateViking({
                    cx : posx,
                    cy : posy
                });
            }
        }
    };
}
// Go through the level 2D array and create medusa where 'm' is
function createMedusa() {

    for(var bx = 0; bx < background_level01.character.length; bx++) {
    //First value of matrix designates row so below we multiply by bx
        for(var by = 0; by < background_level01.character[bx].length; by++) {
            posx = background_level01.xBase + (background_level01.cellWidth*by);
            posy = background_level01.yBase + (background_level01.cellHeight*bx);
            if(background_level01.character[bx][by]=== 'm') {
                entityManager.generateMedusa({
                    cx : posx,
                    cy : posy
                });
            }
        }
    };    
}
// Go through the level 2D array and create sheeps where 's' is
function createSheep(){
        for(var bx = 0; bx < background_level01.character.length; bx++) {
    //First value of matrix designates row so below we multiply by bx
        for(var by = 0; by < background_level01.character[bx].length; by++) {
            posx = background_level01.xBase + (background_level01.cellWidth*by);
            posy = background_level01.yBase + (background_level01.cellHeight*bx);
            if(background_level01.character[bx][by]=== 's') {
                entityManager.generateSheep({
                    cx : posx,
                    cy : posy
                });
            }
        }
    };
}
// Go through the level 2D array and create sheeps where 'o' is
function createTreasureBox(){
        for(var bx = 0; bx < background_level01.character.length; bx++) {
    //First value of matrix designates row so below we multiply by bx
        for(var by = 0; by < background_level01.character[bx].length; by++) {
            posx = background_level01.xBase + (background_level01.cellWidth*by);
            posy = background_level01.yBase + (background_level01.cellHeight*bx);
            if(background_level01.character[bx][by]=== 'o') {
                entityManager.generateTreasureBox({
                    cx : posx,
                    cy : posy
                });
            }
        }
    };
}

// Go through the level 2D array and create sheeps where '=' is
function createDoor(){
        for(var bx = 0; bx < background_level01.character.length; bx++) {
    //First value of matrix designates row so below we multiply by bx
        for(var by = 0; by < background_level01.character[bx].length; by++) {
            posx = background_level01.xBase + (background_level01.cellWidth*by);
            posy = background_level01.yBase + (background_level01.cellHeight*bx);
            if(background_level01.character[bx][by]=== '=') {
                entityManager.generateDoor({
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
    background_level01.update(du);
    entityManager.update(du);
}

// =================
// RENDER SIMULATION
// =================

//When Viking collides with Heart
function renderGameStatus(){
    document.getElementById('heartCollect').innerHTML = g_heartCollect;
}


 
function renderSimulation(ctx) {
    background_level01.render(ctx);
    entityManager.render(ctx);
    renderGameStatus();
}
 
// Kick it off
function mainInit() {
    g_main.init();

}

// =============
// PRELOAD STUFF
// =============

var g_images = {};
var g_background = new Image();
var g_background_level01 = new Image();

var imagesRoot = 'images/64/'

function requestPreloads() {
	g_background_level01.src = imagesRoot + 'test_background_grass.jpg';
	g_background = g_background_level01;

    var requiredImages = {
        viking   : imagesRoot + "Viking_64_front_spriteSheetWhole.png",
        heart : imagesRoot +'heart_64.png',
        borders_level01 : imagesRoot +'border.png',
        door : imagesRoot +'door_64_sprite.png',
        tree: imagesRoot +'Tree_64.png',
        sheep: imagesRoot + 'sheep_64_spriteSheet.png',
        medusa : imagesRoot +'medusa.png',
        treasure_box : imagesRoot + 'Treasure_Box.png',
        block : imagesRoot + 'block.png',
        bullet : imagesRoot + 'Bullet.png'
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    var spriteSize = g_images.viking.height;

    //The parameters for Sprite(image,width,height,sx,sy)
    g_sprites.viking  =  {
        down:{
        0:new Sprite(g_images.viking,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.viking,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.viking,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.viking,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.viking,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.viking,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.viking,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.viking,spriteSize,spriteSize,spriteSize*7,0),
        8:new Sprite(g_images.viking,spriteSize,spriteSize,spriteSize*8,0)
        }  
    };
    g_sprites.heart ={
        0:new Sprite(g_images.heart,spriteSize,spriteSize,0,0)
    };
    g_sprites.border ={
        0:new Sprite(g_images.borders_level01,spriteSize,spriteSize,0,0)
    };
    g_sprites.door ={
        0:new Sprite(g_images.door,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.door,spriteSize,spriteSize,spriteSize,0),
    };
    g_sprites.tree = {
        0:new Sprite(g_images.tree,spriteSize,spriteSize,0,0)
    };
    g_sprites.sheep = {
        0:new Sprite(g_images.sheep,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize*3,0)
    };
    g_sprites.medusa ={
        0:new Sprite(g_images.medusa,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.medusa,spriteSize,spriteSize,spriteSize,0)
    };    
    g_sprites.treasure_box ={
        0:new Sprite(g_images.treasure_box,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.treasure_box,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.treasure_box,spriteSize,spriteSize,spriteSize*2,0)
    };
    g_sprites.block = {
        0:new Sprite(g_images.block,spriteSize,spriteSize,0,0)
    };
    g_sprites.bullet = {
        0:new Sprite(g_images.bullet,spriteSize,spriteSize,0,0)
    };

    entityManager.init();

    createInitialViking();
    createMedusa();
    createSheep();
    createTreasureBox();
    createDoor();

    mainInit();
}

// Kick it off
requestPreloads();
