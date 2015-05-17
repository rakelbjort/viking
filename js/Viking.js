"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Viking(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.viking.down;
    this.currentSprite = this.currentSprite ||g_sprites.viking.down[0]
    this._scale = 1;
    this._animation = {
        Frame:1,
        Ticker:0
    };  
    // this.currentLevel = background_level01;
    this.direction = 'down';
    // Viking frozen and dead
    this.isFrozen = false;
    this.destination;
    this.destinationX;
    this.itIsMoving = false;
    this.Moving = false;
    this.sizeOfSprite = this.currentSprite.height/2;
    this._isDeadNow = false;
    // Original position of the viking
    this.originalCx = this.cx;
    this.originalCy = this.cy;
    this.changeSprite = false;



};

Viking.prototype = new Entity();

Viking.prototype.NOMINALS = {
    ANIM_FRAME_RATE : 0
};

var KEY_S = "S".charCodeAt(0);
var KEY_A = "A".charCodeAt(0);
var KEY_D = "D".charCodeAt(0);
var KEY_W = "W".charCodeAt(0);
var KEY_X = "X".charCodeAt(0);
var KEY_N = "N".charCodeAt(0);

// Numbers are the arrows on the keyboard
Viking.prototype.GO_DOWN_S = KEY_S;
Viking.prototype.GO_DOWN = '40';
Viking.prototype.GO_UP_W = KEY_W;
Viking.prototype.GO_UP = '38';
Viking.prototype.GO_LEFT_A = KEY_A;
Viking.prototype.GO_LEFT = '37';
Viking.prototype.GO_RIGHT_D = KEY_D;
Viking.prototype.GO_RIGHT = '39';
Viking.prototype.NEXT_LEVEL = KEY_N;
Viking.prototype.vel = 2.65; 

// Shoot snowballs
Viking.prototype.FIRE =  KEY_X;
// Used for countdown for reloading the level when Viking dies
Viking.prototype.lifeSpanThenReload = 1000 / NOMINAL_UPDATE_INTERVAL;
Viking.prototype.moveSpan = 1000 / NOMINAL_UPDATE_INTERVAL;
Viking.prototype.threshold = 0;

Viking.prototype.numSubSteps = 1;
Viking.prototype.getRadius = function () {
    return (this.currentSprite.width / 4);
};
Viking.prototype.canMoveObject = function(){
    return false;
};
Viking.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
Viking.prototype.canSnowballGoThroughObject = function (){
    return false;
};
// If it's called from other object that do kill the Viking
Viking.prototype.isDead = function(){
    return true;
};
// Medusa can kill the Viking
Viking.prototype.canMedusaKillIt = function (){
    return true;
};
Viking.prototype.collectable = function (){
    return false;
};
Viking.prototype.takeDragonHit = function(){
};
Viking.prototype.update = function (du) {
    spatialManager.unregister(this);
    
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    //Rembering the last position
    var prevX = this.cx;
    var prevY = this.cy;
    var prevDirection = this.direction;
    this.threshold++;


    // If viking is not frozen then it can move and shoot
    if(this.isFrozen === false ){
        if(g_heartCollect !==0){
            if(key(this.FIRE)){
                g_viking_shoot.play();
                // g_shooting.play();
                // g_shooting.currentTime = 0;
                // Shots fired, take the direction of the viking,
                // so we know which direction of the bullet
                entityManager.fireBullet(this.cx, this.cy, this.direction);
                g_heartCollect--;
            }
        }
        if(this.cy%32===0 && this.cx%32 ===0){
            if(this.threshold >= 6) {

                // Viking goes one cell down 
                if ((eatKey(this.GO_DOWN) || eatKey(this.GO_DOWN_S)) ){
                    this.tryGoDown(prevDirection,prevX,prevY);
                }
            
                // Viking goes one cell up 
                else if ((eatKey(this.GO_UP) || eatKey(this.GO_UP_W))){
                   this.tryGoUp(prevDirection,prevX,prevY);
                }
                // Viking goes one cell left
                else if ((eatKey(this.GO_LEFT ) || eatKey(this.GO_LEFT_A))) {
                    this.tryToGoLeft(prevDirection,prevX,prevY);
                }
                // Viking goes one cell right
                else if ((eatKey(this.GO_RIGHT) || eatKey(this.GO_RIGHT_D))){
                    this.tryGoRight(prevDirection,prevX,prevY);

                }            
                this.threshold -= this.threshold;

            }


        }

        if(this.itIsMoving){
            // Move the Viking 
            this.moveViking(du);
        }
    }
    if(key(this.NEXT_LEVEL)){
        nextLevel();
        this._isDeadNow = true;
    }
    if(this._isDeadNow === false ) spatialManager.register(this);

}; 

//-------------------------
// Everything you need to 
// move the viking!
//-------------------------


Viking.prototype.tryToGoLeft = function(prevDirection,prevX,prevY){
    this.itIsMoving = true;
    this.direction = 'left';
    if(prevDirection !== this.direction){
        this.itIsMoving =false;
    }
    this.collisionDetectionForObjects(this.cx - this.sizeOfSprite, this.cy)
    if(this.itIsMoving){
        this.destinationX = this.cx - this.sizeOfSprite;
        this.destinationY = null;
    }
};

Viking.prototype.tryGoRight = function(prevDirection,prevX,prevY){
    this.itIsMoving = true;
    this.direction = 'right';
    if(prevDirection !== this.direction){
        this.itIsMoving =false;
    }
    this.collisionDetectionForObjects(this.cx + this.sizeOfSprite, this.cy)
    if(this.itIsMoving){
        this.destinationX = this.cx + this.sizeOfSprite;
        this.destinationY= null;
    }
};
Viking.prototype.tryGoUp = function (prevDirection,prevX,prevY){
    this.itIsMoving = true;
    this.direction = 'up';
    if(prevDirection !== this.direction){
        this.itIsMoving =false;
    }
    this.collisionDetectionForObjects(this.cx, this.cy - this.sizeOfSprite)
    if(this.itIsMoving){
        this.destinationX= null;
        this.destinationY = this.cy - this.sizeOfSprite;
    }
};
Viking.prototype.tryGoDown = function(prevDirection,prevX,prevY){
    this.itIsMoving = true;
    this.direction = 'down';
    if(prevDirection !== this.direction){
        this.itIsMoving =false;
    }
    this.collisionDetectionForObjects(this.cx, this.cy + this.sizeOfSprite);
    if(this.itIsMoving){
        this.destinationX = null;
        this.destinationY = this.cy + this.sizeOfSprite;
    }
};

Viking.prototype.moveViking = function (du){
    if (this.direction === 'down' && this.itIsMoving){
        this.cy += this.vel;
        if(this.cy >= this.destinationY) this.cy = this.destinationY;
    }
    if (this.direction === 'up' && this.itIsMoving){
        this.cy -= this.vel;
        if(this.cy <= this.destinationY) this.cy = this.destinationY;

    }
    if (this.direction === 'left' && this.itIsMoving){
        this.cx -= this.vel;
        if(this.cx <= this.destinationX) this.cx = this.destinationX;

    }
    if (this.direction === 'right' && this.itIsMoving){
        this.cx += this.vel;
        if(this.cx >= this.destinationX) this.cx = this.destinationX;
    }
    // move Viking until it reaches it's destination
    if (this.cy === this.destinationY || this.cx === this.destinationX) {
        this._animation.Frame = 1;
        this.itIsMoving = false;
    }

};


//-------------------------
// Collision detection
//-------------------------



Viking.prototype.collisionDetectionForObjects = function(cx,cy){
    var entityInSpace = spatialManager.findEntityInRange(
    cx, cy, this.getRadius());
    if (entityInSpace)
        {
        // If it collides with anything that is not moveable or 
        // collectable then the Viking doesn't move
        var isCollectable = entityInSpace.collectable();
        var isCollidable = entityInSpace.canMoveObject(this.cx,this.cy,this.direction);
        var isCollectableTreasure = entityInSpace.collectableTreasure;
        var isCollidingWithOpenDoor = entityInSpace.doorIsOpen;
        var isLundi = entityInSpace.isLundiSleeping;

        if(isCollectableTreasure) {
            if (entityInSpace.collectableTreasure() && entityInSpace.treasureGone === false){
                    g_collectingTreasure.play();

                entityInSpace.treasureGone = true;
            }
        }
        if(isCollidingWithOpenDoor){
            if(entityInSpace.doorIsOpen()){

                nextLevel();
                this._isDeadNow = true; 
            }
        }
        if(isLundi){
            entityInSpace.isSleeping = true;
        }
        if(isCollidable === true || isCollectable === true) {
            this.itIsMoving = true;
            }
        
        else {
            this.itIsMoving = false;
        }
    }
};

Viking.prototype.computeSubStep = function (du){
    var thisismysprite = this.direction;
    if(this.isFrozen === false){
        if( this.itIsMoving){
            if(this._animation.Ticker <= Math.abs(this.NOMINALS.ANIM_FRAME_RATE)){
                this._animation.Ticker +=du;
            }
            else {
                this.whichSprite();
                this._animation.Ticker = 0;
            }
        }
        else {
            if(this.direction === 'up'){
                this.currentSprite = g_sprites.viking.up[0];
            }
            else if(this.direction === 'left'){
                this.currentSprite = g_sprites.viking.left[0];
            }
            else if(this.direction === 'right'){
                this.currentSprite = g_sprites.viking.right[0];
            }
            else{
            this.currentSprite = g_sprites.viking.down[0];
            }

        }
    }

    if(this.isFrozen){

        // If the Viking is frozen/dead then change to the 
        // Viking-frozen-sprite and reload the level after countDown
        if(this.changeSprite === true){
            this.currentSprite = g_sprites.frozen_viking[1];
        }
        else this.currentSprite = g_sprites.frozen_viking[0];
        this.lifeSpanThenReload -= du;
        if(this.lifeSpanThenReload < 45){
            g_dead_on_water.play();

        }
        if (this.lifeSpanThenReload < 0) {

            resetLevel();
        }
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
    this.currentSprite.drawCentredAt(ctx,this.cx,this.cy,this.rotation);
    this.currentSprite.scale = origScale;
};

// Which Sprite to use for the Viking
Viking.prototype.whichSprite = function (){

    var sprite_base = this.sprite;

    if(this.direction === 'down'){
        sprite_base = g_sprites.viking.down;
    }
    else if(this.direction === 'up'){
        sprite_base = g_sprites.viking.up;
    }
    else if(this.direction === 'left'){
        sprite_base = g_sprites.viking.left;
    }
    else if(this.direction === 'right'){
        sprite_base = g_sprites.viking.right;
    }
    //Animating the sprite
    if(this._animation.Frame > 7) this._animation.Frame=1;
     // console.log(this._animation.Frame)

    this.currentSprite = sprite_base[this._animation.Frame];
    this._animation.Frame +=1;
};