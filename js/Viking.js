"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Viking(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rememberResets();
    // Default sprite
    this.sprite = this.sprite || g_sprites.viking.down;
    this.currentSprite = this.currentSprite ||g_sprites.viking.down[0]
    this._scale = 1;
    this._isWarping = false;
    this._animation = {
        Frame:0,
        Ticker:0
    };
    this.currentLevel = background_level01;
    this.direction = 'right';

};

// Viking.prototype.setup = function (descr) {
//     // Apply all setup properies from the (optional) descriptor
//     for (var property in descr) {
//         this[property] = descr[property];
//     }    
//     this._spatialID = spatialManager.getNewSpatialID();

// };

Viking.prototype = new Entity();

Viking.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Viking.prototype.NOMINALS = {
    ANIM_FRAME_RATE :1
};
// Viking.prototype.setPos = function (cx, cy) {
//     this.xBase = cx;
//     this.yBase = cy;
    
// };

// Viking.prototype.getPos = function () {
//     return {posX : this.cx, posY : this.cy};
// }

// Viking.prototype.getSpatialID = function () {
//     return this._spatialID;
// };

// Viking.prototype.kill = function () {
//     console.log('her');
//     spatialManager.unregister(this);
// };



var KEY_S = "S".charCodeAt(0);
var KEY_A= "A".charCodeAt(0);
var KEY_D = "D".charCodeAt(0);
var KEY_W = "W".charCodeAt(0);
var KEY_X = "X".charCodeAt(0);

// numbers are the arrows on the keyboard
Viking.prototype.GO_DOWN_S = KEY_S;
Viking.prototype.GO_DOWN = '40';
Viking.prototype.GO_UP_W = KEY_W;
Viking.prototype.GO_UP = '38';
Viking.prototype.GO_LEFT_A = KEY_A;
Viking.prototype.GO_LEFT = '37';
Viking.prototype.GO_RIGHT_D = KEY_D;
Viking.prototype.GO_RIGHT = '39';
// Shoot snowballs
Viking.prototype.FIRE =  KEY_X;

Viking.prototype.numSubSteps = 1;

Viking.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Viking.prototype.update = function (du) {

    // spatialManager.unregister(this);

    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    //Rembering the last position
    var prevX = this.cx;
    var prevY = this.cy;

    // Check if Viking has finished the level
    this.levelDone();
    
    // Check if Viking is collecting a Heart
    this.currentLevel.collidesWithHeart(this.cx,this.cy);

    // Shots fired, take the direction of the viking,
    // so we know which directionthe bullet should go
    if(eatKey(this.FIRE)){
        entityManager.fireBullet(this.cx, this.cy, this.direction);
    }

    // Viking goes one cell down if it's not colliding with anything
    if (eatKey(this.GO_DOWN) || eatKey(this.GO_DOWN_S) ){
        this.vikingMovesDown(prevY);
    }

    // Viking goes one cell up if it's not colliding with anything
    else if (eatKey(this.GO_UP) || eatKey(this.GO_UP_W)){
        this.vikingMovesUp(prevY);
    }
    // Viking goes one cell left if it's not colliding with anything
    else if (eatKey(this.GO_LEFT ) || eatKey(this.GO_LEFT_A)){
        this.vikingMovesLeft(prevX);
    }

    // Viking goes one cell right if it's not colliding with anything
    else if (eatKey(this.GO_RIGHT) || eatKey(this.GO_RIGHT_D) ){
        this.vikingMovesRight(prevX);
    }
    // spatialManager.register(this);

};


//=====================
//  Moving the Viking
//=====================


Viking.prototype.vikingMovesDown = function (prevY){
    if(this.currentLevel.moveCheckDown(this.cx,this.cy) ===1){
          this.cy = prevY;
    }
    // Checks if there is an Object behind the block
    // Either moves the block or stops it
    else if(this.currentLevel.moveCheckDown(this.cx,this.cy) ===2){}
    else{
        this.cy += this.currentSprite.height ;
    }
    this.direction = 'down';
}

Viking.prototype.vikingMovesUp = function (prevY){
    if(this.currentLevel.moveCheckUp(this.cx,this.cy) ===1)  {
        this.cy = prevY;
    }
    // Checks if there is an Object behind the block
    // Either moves the block or stops it
    else if(this.currentLevel.moveCheckUp(this.cx,this.cy) ===2){}
    else{
        this.cy -= this.currentSprite.height ;
    }
    this.direction = 'up';

}

Viking.prototype.vikingMovesLeft = function(prevX){
    this.cx -= this.currentSprite.width;
    if(this.currentLevel.moveCheckLeft(this.cx,this.cy) ===1){
        this.cx = prevX;
    }
    // Checks if there is an Object behind the block
    // Either moves the block or stops it
    else if(this.currentLevel.moveCheckLeft(this.cx,this.cy) ===2){
        this.cx = prevX;
    }        
    this.direction = 'left';

}

Viking.prototype.vikingMovesRight = function (prevX){
    this.cx += this.currentSprite.width;
    if(this.currentLevel.moveCheckRight(this.cx,this.cy) ===1){
        this.cx = prevX;
    }
    // Checks if there is an Object behind the block
    // Either moves the block or stops it
    else if(this.currentLevel.moveCheckRight(this.cx,this.cy) ===2){
        this.cx = prevX;
    }   
    this.direction = 'right';

}
        

Viking.prototype.computeSubStep = function (du){
    if(this._animation.Ticker < Math.abs(this.NOMINALS.ANIM_FRAME_RATE)){
        this._animation.Ticker +=du;}
    else {
        this.whichSprite();
        this._animation.Ticker = 0;
    }
};


//===============
//  Render
//===============

Viking.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    // pass my scale into the sprite, for drawing
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx,this.cx,this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};

Viking.prototype.whichSprite = function (){
    //Used to select the correct sprite
    var sprite_base = this.sprite;
    if(this._animation.Frame > 7) this._animation.Frame=0;
    this.currentSprite = sprite_base[this._animation.Frame];
    this._animation.Frame +=1;

};

//==================
//  Level Done ?
//==================


var treasureCollected = false;

Viking.prototype.levelDone = function(){
    // Viking collected all the hearts
    if (this.currentLevel.countingHearts() === 0){
        // Check if the Viking is collecting the treasure
        if(this.currentLevel.collectTreasure(this.cx,this.cy) ===1){
            treasureCollected = true
        }
        // Check if the Viking has collected all the hearts and is at the OPEN door
        if(this.currentLevel.goToOpenDoor(this.cx, this.cy)===1 && treasureCollected ===true){
             g_main.gameOver();
        }
    }
}
