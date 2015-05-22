// =====
// UTILS
// =====

function clearCanvas(ctx) {
    // What background to use
    if(currentLevel === level06 || currentLevel === level07 || currentLevel === level08 || 
        currentLevel === level09 || currentLevel === level10){
        ctx.drawImage(g_images.background_snow, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    else if(currentLevel === runeLevel01 || currentLevel === runeLevel02 || currentLevel === runeLevel03
        || currentLevel === runeLevel04){
        ctx.drawImage(g_images.background_runes, 0, 0, ctx.canvas.width, ctx.canvas.height)
    }
    else if(currentLevel === level11 || currentLevel === level12 || currentLevel === level13 || 
        currentLevel === level14 || currentLevel === level15 || currentLevel === level16
        || currentLevel === level17|| currentLevel === level18|| currentLevel === level19 || 
        currentLevel === level20){
        ctx.drawImage(g_images.background_dark, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
	else ctx.drawImage(g_images.background_level01, 0, 0, ctx.canvas.width, ctx.canvas.height);
};

var util ={
    square: function(x) {
        return x*x;
    },
    distSq: function(x1, y1, x2, y2) {
        return this.square(x2-x1) + this.square(y2-y1);
    }
};

// =============
// PRELOAD STUFF
// =============
var g_themeSong = new Audio();
var g_images = {};

var g_collectingHeart = new Audio();
var g_loadingLevel = new Audio();
var g_collectingTreasure = new Audio();
var g_backgroundSoundFirstTheme = new Audio();
var g_backgroundSoundSecondTheme = new Audio();
var g_backgroundSoundThirdTheme = new Audio();
var g_backgroundSoundFourthTheme = new Audio();
var g_backgroundSoundRuneTheme = new Audio();
var g_viking_shoot = new Audio();
var g_troll_kill = new Audio();
var g_dragon_shoot = new Audio();
var g_dead_on_water = new Audio();


var imagesRoot = 'images/64/'

function requestPreloads() {
    
    // SOUNDS

    g_collectingHeart.src = 'sounds/Heart_collecting.wav';
    g_loadingLevel.src ='sounds/Wind.wav';
    g_collectingTreasure.src ='sounds/Treasure_collecting.mp3';
    g_backgroundSoundFirstTheme.src ="sounds/first_theme.mp3";
    g_backgroundSoundSecondTheme.src ="sounds/SecondTheme.mp3";
    g_backgroundSoundThirdTheme.src ="sounds/ThirdTheme.mp3";
    g_backgroundSoundFourthTheme.src ="sounds/fourth-theme.wav";
    g_backgroundSoundRuneTheme.src ="sounds/rune-theme.mp3";
    g_viking_shoot.src ="sounds/viking_shoots.wav";
    g_troll_kill.src ="sounds/troll_kill.mp3";
    g_dragon_shoot.src ="sounds/dragon_fire.wav";
    g_dead_on_water.src ="sounds/dead_on_water.wav";

    // IMAGES

    var requiredImages = {
        background_level01 : imagesRoot + 'background_grass.jpg',
        background_dark : imagesRoot + 'background_dark.png',
        background_snow : imagesRoot + 'background_snow.png',
        background_blueLagoon : imagesRoot + 'background_blueLagoon.png',
        background_runes : imagesRoot + 'background_runes.png',
        fog : imagesRoot + 'fog.png',
        vikingDown   : imagesRoot + "Viking_64_front_spriteSheet.png",
        vikingUp : imagesRoot + 'Viking_64_back_spriteSheet.png',
        vikingLeft : imagesRoot + 'Viking_64_turnleft_spriteSheet.png',
        vikingRight: imagesRoot + 'Viking_64_turnright_spriteSheet.png',
        heart : imagesRoot +'heart_64.png',
        borders_level01 : imagesRoot +'border.png',
        borders_houses : imagesRoot +'borders_house.png',
        borders_dark : imagesRoot +'border_dark.png',
        borders_stone : imagesRoot +'border_stone.png',
        borders_snow : imagesRoot +'border_snow.png',
        door : imagesRoot +'door_64_sprite.png',
        door_gate : imagesRoot +'door_gate.png',
        tree: imagesRoot +'tree_64.png',
        tree_dark : imagesRoot + 'tree_no_leafs_64.png',
        sheep: imagesRoot + 'sheep_64_spriteSheet.png',
        polar_bear: imagesRoot + 'polarBear_64_spriteSheet.png',
        medusa : imagesRoot +'troll_64_sprite.png',
        treasure_box_all : imagesRoot + 'treasure_box_all.png',
        runes_all : imagesRoot + 'rune_all.png',
        block : imagesRoot + 'block.png',
        bullet : imagesRoot + 'bullet.png',
        snowball : imagesRoot + 'snowball.png',
        water : imagesRoot + 'water.png',
        blue_lagoon_water : imagesRoot + 'blue_lagoon_water.png',
        lava: imagesRoot + 'lava_64.png',
        frozen_viking: imagesRoot + 'frozen_viking.png',
        fire_viking: imagesRoot + 'Viking_onfire.png',
        bullet_medusa : imagesRoot + 'killShot.png',
        bridge : imagesRoot + 'bridge.png',
        mountain : imagesRoot + 'mountain_64.png',
        rocks : imagesRoot + 'rocks.png',
        volcano : imagesRoot + 'valcano_64.png',
        lundi : imagesRoot + 'lundi.png',
        lundiGoingLeft : imagesRoot + 'lundi_64_Left_spriteSheet.png',
        lundiGoingRight : imagesRoot + 'lundi_64_Right_spriteSheet.png',
        lundiGoingDown : imagesRoot + 'lundi_64_down_SpriteSheet.png',
        lundiGoingUp : imagesRoot + 'lundi_64_Up_SpriteSheets.png',
        lundiSleepingToTheLeft : imagesRoot + 'lundi_64_sleepingToLeftSprite.png',
        lundiSleepingToTheRight : imagesRoot + 'lundi_64_sleepingToRightSprite.png',
        lundiSleepingDown : imagesRoot + 'lundi_64_downSleep_SpriteSheet.png',
        lundiSleepingUp : imagesRoot + 'lundi_64_upSleep_SpriteSheets.png',
        explode : imagesRoot + 'explode_sprite.png',
        dragon: imagesRoot + 'dragon_64.png',
        dragon_toTheLeft : imagesRoot + 'dragon_toTheLeft_64.png',
        dragonAwake: imagesRoot + 'dragon_awake_64.png',
        dragonAwake_toTheLeft : imagesRoot + 'dragon_awake_toTheLeft_64.png',
        dragonBall : imagesRoot + 'dragonball_totheright.png',
        dragonBall_toTheLeft : imagesRoot + 'dragonball_totheleft.png'
    };

    imagesPreload(requiredImages, g_images, preloadDone);
};

var g_sprites = {};

function preloadDone() {

    var spriteSize = g_images.vikingDown.height;
    var bigSpriteSize = 640;

    //The parameters for Sprite(image,width,height,sx,sy)
    g_sprites.viking  =  {
        down:{
        0:new Sprite(g_images.vikingDown,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.vikingDown,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.vikingDown,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.vikingDown,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.vikingDown,spriteSize,spriteSize,spriteSize*5,0),
        5:new Sprite(g_images.vikingDown,spriteSize,spriteSize,spriteSize*6,0),
        6:new Sprite(g_images.vikingDown,spriteSize,spriteSize,spriteSize*7,0),
        7:new Sprite(g_images.vikingDown,spriteSize,spriteSize,spriteSize*8,0),
        8:new Sprite(g_images.vikingDown,spriteSize,spriteSize,spriteSize*8,0)
        }, 
        up:{
        0:new Sprite(g_images.vikingUp,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.vikingUp,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.vikingUp,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.vikingUp,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.vikingUp,spriteSize,spriteSize,spriteSize*5,0),
        5:new Sprite(g_images.vikingUp,spriteSize,spriteSize,spriteSize*6,0),
        6:new Sprite(g_images.vikingUp,spriteSize,spriteSize,spriteSize*7,0),
        7:new Sprite(g_images.vikingUp,spriteSize,spriteSize,spriteSize*8,0),
        8:new Sprite(g_images.vikingUp,spriteSize,spriteSize,spriteSize*8,0)  
        },
        left:{
        0:new Sprite(g_images.vikingLeft,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.vikingLeft,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.vikingLeft,spriteSize,spriteSize,spriteSize*3,0),
        3:new Sprite(g_images.vikingLeft,spriteSize,spriteSize,spriteSize*4,0),
        4:new Sprite(g_images.vikingLeft,spriteSize,spriteSize,spriteSize*5,0),
        5:new Sprite(g_images.vikingLeft,spriteSize,spriteSize,spriteSize*7,0),
        6:new Sprite(g_images.vikingLeft,spriteSize,spriteSize,spriteSize*7,0),
        7:new Sprite(g_images.vikingLeft,spriteSize,spriteSize,spriteSize*8,0),
        8:new Sprite(g_images.vikingLeft,spriteSize,spriteSize,spriteSize*8,0)  
        },
        right:{
        0:new Sprite(g_images.vikingRight,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.vikingRight,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.vikingRight,spriteSize,spriteSize,spriteSize*3,0),
        3:new Sprite(g_images.vikingRight,spriteSize,spriteSize,spriteSize*4,0),
        4:new Sprite(g_images.vikingRight,spriteSize,spriteSize,spriteSize*5,0),
        5:new Sprite(g_images.vikingRight,spriteSize,spriteSize,spriteSize*7,0),
        6:new Sprite(g_images.vikingRight,spriteSize,spriteSize,spriteSize*7,0),
        7:new Sprite(g_images.vikingRight,spriteSize,spriteSize,spriteSize*8,0),
        8:new Sprite(g_images.vikingRight,spriteSize,spriteSize,spriteSize*8,0)  
        } 
    };
    g_sprites.heart ={
        0:new Sprite(g_images.heart,spriteSize,spriteSize,0,0)
    };
    g_sprites.borders ={
        0:new Sprite(g_images.borders_level01,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.borders_houses,spriteSize,spriteSize,0,0),
        2:new Sprite(g_images.rocks,spriteSize,spriteSize,0,0),
        3:new Sprite(g_images.borders_dark,spriteSize,spriteSize,0,0),
        4:new Sprite(g_images.borders_snow,spriteSize,spriteSize,0,0)
    };
    g_sprites.door ={
        0:new Sprite(g_images.door,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.door,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.door_gate,spriteSize,spriteSize,0,0),
        3:new Sprite(g_images.door_gate,spriteSize,spriteSize,spriteSize,0)
    };
    g_sprites.tree = {
        0:new Sprite(g_images.tree,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.tree_dark,spriteSize,spriteSize,0,0)
    };
    g_sprites.sheep = {
        0:new Sprite(g_images.sheep,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize*3,0), 
        4:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.sheep,spriteSize,spriteSize,spriteSize*7,0),
        8:new Sprite(g_images.sheepFrozen,spriteSize,spriteSize,0,0)
    };
    g_sprites.polar_bear = {
        0:new Sprite(g_images.polar_bear,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.polar_bear,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.polar_bear,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.polar_bear,spriteSize,spriteSize,spriteSize*3,0), 
        4:new Sprite(g_images.polar_bear,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.polar_bear,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.polar_bear,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.polar_bear,spriteSize,spriteSize,spriteSize*7,0)
    };
    g_sprites.medusa ={
        0:new Sprite(g_images.medusa,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.medusa,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.medusa,spriteSize,spriteSize,spriteSize *2,0)
    };    
    g_sprites.treasure_box_all ={
        0:new Sprite(g_images.treasure_box_all,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.treasure_box_all,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.treasure_box_all,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.treasure_box_all,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.treasure_box_all,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.treasure_box_all,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.treasure_box_all,spriteSize,spriteSize,spriteSize*6,0),
    };
    g_sprites.runes_all = {
        0:new Sprite(g_images.runes_all,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.runes_all,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.runes_all,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.runes_all,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.runes_all,spriteSize,spriteSize,spriteSize*4,0)
    };
    g_sprites.block = {
        0:new Sprite(g_images.block,spriteSize,spriteSize,0,0)
    };
    g_sprites.bullet = {
        0:new Sprite(g_images.bullet,spriteSize,spriteSize,0,0)
    };    
    g_sprites.snowball = {
        0:new Sprite(g_images.snowball,spriteSize,spriteSize,0,0)
    };
    g_sprites.water = {
        0:new Sprite(g_images.water,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.water,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.water,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.water,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.water,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.water,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.water,spriteSize,spriteSize,spriteSize*6,0)
    };
    g_sprites.lava = {
        0:new Sprite(g_images.lava,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.lava,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.lava,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.lava,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.lava,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.lava,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.lava,spriteSize,spriteSize,spriteSize*6,0)
        
    };
    g_sprites.blue_lagoon_water = {
        0:new Sprite(g_images.blue_lagoon_water,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.blue_lagoon_water,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.blue_lagoon_water,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.blue_lagoon_water,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.blue_lagoon_water,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.blue_lagoon_water,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.blue_lagoon_water,spriteSize,spriteSize,spriteSize*6,0)
        
    };
    g_sprites.frozen_viking = {
        0:new Sprite(g_images.frozen_viking,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.fire_viking,spriteSize,spriteSize,0,0)
    };    
    g_sprites.bullet_medusa= {
        0:new Sprite(g_images.bullet_medusa,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.bullet_medusa,spriteSize,spriteSize,spriteSize,0)
    };
    g_sprites.bridge = {
        0:new Sprite(g_images.bridge,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.bridge,spriteSize,spriteSize,spriteSize,0)
    };     
    g_sprites.mountain = {
        0:new Sprite(g_images.mountain,spriteSize,spriteSize,0,0)
    }; 
    g_sprites.volcano = {
        0:new Sprite(g_images.volcano,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.volcano,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.volcano,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.volcano,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.volcano,spriteSize,spriteSize,spriteSize*4,0)
    }; 
    g_sprites.explode  = {
        0:new Sprite(g_images.explode,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize*7,0),
        8:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize*8,0),         
        9:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize*9,0),
        10:new Sprite(g_images.explode,spriteSize,spriteSize,spriteSize*10,0)  
    }
    g_sprites.lundi ={
        0:new Sprite(g_images.lundi,spriteSize,spriteSize,0,0)
    };
    g_sprites.lundiGoingLeft = {
        0:new Sprite(g_images.lundiGoingLeft,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.lundiGoingLeft,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.lundiGoingLeft,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.lundiGoingLeft,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.lundiGoingLeft,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.lundiGoingLeft,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.lundiGoingLeft,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.lundiGoingLeft,spriteSize,spriteSize,spriteSize*7,0) 
    };    
    g_sprites.lundiGoingRight = {
        0:new Sprite(g_images.lundiGoingRight,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.lundiGoingRight,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.lundiGoingRight,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.lundiGoingRight,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.lundiGoingRight,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.lundiGoingRight,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.lundiGoingRight,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.lundiGoingRight,spriteSize,spriteSize,spriteSize*7,0) 
    };
    g_sprites.lundiGoingDown ={
        0:new Sprite(g_images.lundiGoingDown,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.lundiGoingDown,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.lundiGoingDown,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.lundiGoingDown,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.lundiGoingDown,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.lundiGoingDown,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.lundiGoingDown,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.lundiGoingDown,spriteSize,spriteSize,spriteSize*7,0)     
    };
    g_sprites.lundiGoingUp ={
        0:new Sprite(g_images.lundiGoingUp,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.lundiGoingUp,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.lundiGoingUp,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.lundiGoingUp,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.lundiGoingUp,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.lundiGoingUp,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.lundiGoingUp,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.lundiGoingUp,spriteSize,spriteSize,spriteSize*7,0)     
    };
    g_sprites.lundiSleepingToTheLeft ={
        0:new Sprite(g_images.lundiSleepingToTheLeft,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.lundiSleepingToTheLeft,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.lundiSleepingToTheLeft,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.lundiSleepingToTheLeft,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.lundiSleepingToTheLeft,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.lundiSleepingToTheLeft,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.lundiSleepingToTheLeft,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.lundiSleepingToTheLeft,spriteSize,spriteSize,spriteSize*7,0) 
    };    
    g_sprites.lundiSleepingToTheRight ={
        0:new Sprite(g_images.lundiSleepingToTheRight,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.lundiSleepingToTheRight,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.lundiSleepingToTheRight,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.lundiSleepingToTheRight,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.lundiSleepingToTheRight,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.lundiSleepingToTheRight,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.lundiSleepingToTheRight,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.lundiSleepingToTheRight,spriteSize,spriteSize,spriteSize*7,0) 
    };
    g_sprites.lundiSleepingDown ={
        0:new Sprite(g_images.lundiSleepingDown,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.lundiSleepingDown,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.lundiSleepingDown,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.lundiSleepingDown,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.lundiSleepingDown,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.lundiSleepingDown,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.lundiSleepingDown,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.lundiSleepingDown,spriteSize,spriteSize,spriteSize*7,0) 
    };
    g_sprites.lundiSleepingUp ={
        0:new Sprite(g_images.lundiSleepingUp,spriteSize,spriteSize,0,0),
        1:new Sprite(g_images.lundiSleepingUp,spriteSize,spriteSize,spriteSize,0),
        2:new Sprite(g_images.lundiSleepingUp,spriteSize,spriteSize,spriteSize*2,0),
        3:new Sprite(g_images.lundiSleepingUp,spriteSize,spriteSize,spriteSize*3,0),
        4:new Sprite(g_images.lundiSleepingUp,spriteSize,spriteSize,spriteSize*4,0),
        5:new Sprite(g_images.lundiSleepingUp,spriteSize,spriteSize,spriteSize*5,0),
        6:new Sprite(g_images.lundiSleepingUp,spriteSize,spriteSize,spriteSize*6,0),
        7:new Sprite(g_images.lundiSleepingUp,spriteSize,spriteSize,spriteSize*7,0) 
    };
    g_sprites.dragon ={
        0:new Sprite(g_images.dragon,spriteSize,spriteSize,0,0)
    };
    g_sprites.dragonAwake ={
        0:new Sprite(g_images.dragonAwake,spriteSize,spriteSize,0,0)
    };
    g_sprites.dragonBall ={
        0:new Sprite(g_images.dragonBall,spriteSize,spriteSize,0,0)
    };
    g_sprites.dragon_toTheLeft ={
        0:new Sprite(g_images.dragon_toTheLeft,spriteSize,spriteSize,0,0)
    };
    g_sprites.dragonAwake_toTheLeft ={
        0:new Sprite(g_images.dragonAwake_toTheLeft,spriteSize,spriteSize,0,0)
    };
    g_sprites.dragonBall_toTheLeft ={
        0:new Sprite(g_images.dragonBall_toTheLeft,spriteSize,spriteSize,0,0)
    };
    g_sprites.fog ={
        0:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,0,0),
        1:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize,0),
        2:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize*2,0),

        3:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,0,bigSpriteSize),
        4:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize,bigSpriteSize),
        5:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize*2,bigSpriteSize),

        6:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,0,bigSpriteSize*2),
        7:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize,bigSpriteSize*2),
        8:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize*2,bigSpriteSize*2),

        9:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,0,bigSpriteSize*3),
        10:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize,bigSpriteSize*3),
        11:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize*2,bigSpriteSize*3),

        12:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,0,bigSpriteSize*4),
        13:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize,bigSpriteSize*4),
        14:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize*2,bigSpriteSize*4),

        15:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,0,bigSpriteSize*5),
        16:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize,bigSpriteSize*5),
        17:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize*2,bigSpriteSize*5),

        18:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,0,bigSpriteSize*6),
        19:new Sprite(g_images.fog,bigSpriteSize,bigSpriteSize,bigSpriteSize,bigSpriteSize*6)
    };
    g_sprites.background_level01 ={
        0:new Sprite(g_images.background_level01,bigSpriteSize,bigSpriteSize,0,0)
    };
    g_sprites.background_blueLagoon ={
        0:new Sprite(g_images.background_blueLagoon,bigSpriteSize,bigSpriteSize,0,0)
    };

    entityManager.init();
    createInitialEverything(currentLevel);
    createWater(currentLevel);
    mainInit();
};