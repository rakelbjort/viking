"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Sheep(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.sheep[0];
    this.currentSprite = this.currentSprite ||g_sprites.sheep[0];
    this._scale = 1;
    // Looking at the viking
    this.lookingDirection=0;
    // If its a snowball it's moveable
    this.moveableSnowball = false;
    this.moveable = false;
    this.dead = false;
    // Stuck in the water
    this.stuck= false;
    // State of Sheep when it's doubel shot
    this.shootSnowball=false;
    this.directionOfShootingBall=0;
    // Original position of the sheep
    this.originalCx = this.cx;
    this.originalCy = this.cy;
    this.destinationX;
    this.destinationY;
    this.moveSpan = 2000 / NOMINAL_UPDATE_INTERVAL
    this.vel = 2.65;
    this.rotation =0;
    this.sizeOfSprite = this.currentSprite.height/2;
    this.killAllSheep = false
    this.explodeSheep = false;
    this._animation = {
        Frame:1,
        Ticker:0
    }; 
    this.isCollidingWithViking = false;
};

Sheep.prototype = new Entity();
// CountDown from snowball state to sheep again
Sheep.prototype.lifeSpanAsSnowball = 4000 / NOMINAL_UPDATE_INTERVAL;
// CountDown from when the sheep is killed until it reappears
Sheep.prototype.timeToResetSheep = 4000 / NOMINAL_UPDATE_INTERVAL;

Sheep.prototype.getRadius = function () {
    return (this.sizeOfSprite * 0.92);
};
// Medusa only kills Viking
Sheep.prototype.canMedusaKillIt = function(){
    return false;
};
// Medusa can't kill through Sheep
Sheep.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
// NO you can't collect Sheeps
Sheep.prototype.collectable = function(){
    return false;
};
// Can't kill the sheep, it always reappears
Sheep.prototype.isDead = function() {
    return false;
};
// When Sheep is double shot or gets stuck in the water
Sheep.prototype.killSnowball = function(){
    this.dead = true;
};
// When shot it turns into a snowball
Sheep.prototype.takeBulletHit = function(){
    this.kill();
};
// When the sheep is double shot    
Sheep.prototype.shootSnowballOfScreen = function(direction){
    // If it's in water then we don't wont be able to
    // double shoot it
    if(this.stuck) return;
    this.shootSnowball = true;
    // Direction from the Viking
    this.directionOfShootingBall =direction;
};
Sheep.prototype.canSnowballGoThroughObject = function(){
    return false;
};

// The velocity when Sheep is double shot off the screen
Sheep.prototype.velX = 20;
Sheep.prototype.velY = 20;
Sheep.prototype.snowballRotation = 0.35;
Sheep.prototype.takeDragonHit = function(){
};

// First we move the sheep, if it does not collide with anything
// then we perform the move in the update
Sheep.prototype.canMoveObject = function(cx,cy,direction){
    // Save the direction from the Viking
    this.direction = direction;

    spatialManager.unregister(this);

    // Save position
    var prevY = this.cy;
    var prevX = this.cx;
    if(this.cx === cx || this.cy === cy){
        if(this.moveableSnowball === true && this.stuck === false){
            this.moveable = true;
            if (this.direction === 'right'){
                this.cx +=this.sizeOfSprite;
                this.destinationX = this.cx;
                this.destinationY = null;
            };
            if (this.direction === 'left'){
                this.cx -=this.sizeOfSprite;
                this.destinationX = this.cx;
                this.destinationY = null;
            };
            if (this.direction === 'down'){
                this.cy +=this.sizeOfSprite;
                this.destinationX = null;
                this.destinationY = this.cy;
            };
            if (this.direction === 'up'){
                this.cy -=this.sizeOfSprite;
                this.destinationX = null;
                this.destinationY = this.cy;
            };
            // Check if snowball will hit anything that it can't go through
            var hitEntity = this.findHitEntity();
            if (hitEntity){ 
                var isCollidable = hitEntity.canSnowballGoThroughObject();

                if(isCollidable === false ){
                    this.direction =0;
                    this.moveable = false;
                };
            };
        };
        if(this.lifeSpanAsSnowball<20)this.moveable = false
    
        // Return to it's former state
        this.cx = prevX;
        this.cy = prevY;       
    }
    else this.moveable = false;

    spatialManager.register(this);
    return this.moveable;
};

Sheep.prototype.update = function (du) {
    var prevY = this.cy;
    var prevX = this.cx;
    spatialManager.unregister(this);

    if(this.killAllSheep) return entityManager.KILL_ME_NOW;

    this.updateEyes();

    if(this.isCollidingWithViking === true){
        this.moveable = true;
    }
    if(this.moveableSnowball === false && this.isCollidingWithViking === false){
        this.moveable = false;
    }

    //-----------------------------------
    // If the sheep is hit by a bullet
    //-----------------------------------

    if(this._isDeadNow) {
        this.currentSprite = g_sprites.snowball[0];
        this.moveableSnowball = true;
    }
    // Turns into a snowball
    if(this.moveableSnowball ){
        this.updateSnowball(du);
    }
    // Check if the sheep is colliding with anything
    this.collidingCheck();

    // If the Sheep is double shot
    if(this.shootSnowball){
        this.shootOfScreen(du);
        
    }
    // If the Sheep goes of the canvas then it's dead
    if(this.cy > canvas.height || this.cy < 0 ||
        this.cx > canvas.width || this.cx <0){
        this.dead = true;
    }

    //------------------------------------
    // The Sheep is dead! Must revive it!
    //------------------------------------

    if(this.dead){
        // move it outside the canvas, just for a little while!
        this.cx = -this.currentSprite.width;
        this.cy = -this.currentSprite.height;
        this.returnToSheep();
        this.timeToResetSheep -= du;
        if(this.timeToResetSheep<0){
            // Put it in its original coords
            this.originalPos();
            // Initialize the countDown
            this.timeToResetSheep = 3000 / NOMINAL_UPDATE_INTERVAL;
        };
    };
    spatialManager.register(this) 
};

//---------------------
// Direction of eyes
//----------------------

// Called from entityManager
// TODO : more accuracy in the direction of the eyes of the Sheep
Sheep.prototype.lookingAtViking = function(vikingCx, vikingCy) {
    var sheepToTheLeft = this.cx - this.sizeOfSprite;
    var sheepToTheRight = this.cx + this.sizeOfSprite;
    var sheepOnTop = this.cy - this.sizeOfSprite;
    var sheepOnBottom = this.cy + this.sizeOfSprite;

    if( (this.cy > vikingCy) && 
        (this.cx === vikingCx || (sheepToTheLeft<= vikingCx && vikingCx<= sheepToTheRight))){
            this.lookingDirection = 'up';
    }
    else if( (this.cy < vikingCy) && 
        (this.cx === vikingCx || (sheepToTheLeft<= vikingCx && vikingCx<= sheepToTheRight))){
        this.lookingDirection = 'down';
    }

    else if( (this.cx > vikingCx) && 
        (this.cy === vikingCy || (sheepOnTop<= vikingCy && vikingCy<= sheepOnTop))){
            this.lookingDirection = 'left';
    }
    else if( (this.cx < vikingCx) && 
        (this.cy === vikingCy || (sheepOnTop<= vikingCy && vikingCy<= sheepOnTop))){
            this.lookingDirection = 'right';
    }
    else if(sheepToTheLeft> vikingCx && sheepOnTop>= vikingCy){
        this.lookingDirection ='up-left';
    }     
    else if(sheepToTheLeft> vikingCx && sheepOnBottom<= vikingCy){
        this.lookingDirection ='down-left';
    }
    else if(sheepToTheRight< vikingCx && sheepOnTop>= vikingCy){
        this.lookingDirection ='up-right';
    }
    else if(sheepToTheRight< vikingCx && sheepOnBottom<= vikingCy){
        this.lookingDirection ='down-right';
    }
};

Sheep.prototype.updateEyes = function(){
    if(this.lookingDirection === 'left') {
        this.currentSprite = g_sprites.sheep[0];
    };
    if(this.lookingDirection === 'right') {
        this.currentSprite = g_sprites.sheep[1];
    };    
    if(this.lookingDirection === 'up') {
        this.currentSprite = g_sprites.sheep[2];
    };      
    if(this.lookingDirection === 'down') {
        this.currentSprite = g_sprites.sheep[3];
    };    
    if(this.lookingDirection === 'up-left') {
        this.currentSprite = g_sprites.sheep[4];
    };
    if(this.lookingDirection === 'up-right') {
        this.currentSprite = g_sprites.sheep[5];
    };
    if(this.lookingDirection === 'down-right') {
        this.currentSprite = g_sprites.sheep[6];
    };
    if(this.lookingDirection === 'down-left') {
        this.currentSprite = g_sprites.sheep[7];
    };
    if(currentLevel === level06 || currentLevel === level07 || 
        currentLevel === level08 || currentLevel === level09 ||
        currentLevel === level10){
        if(this.lookingDirection === 'left') {
            this.currentSprite = g_sprites.polar_bear[0];
        };
        if(this.lookingDirection === 'right') {
            this.currentSprite = g_sprites.polar_bear[1];
        };    
        if(this.lookingDirection === 'up') {
            this.currentSprite = g_sprites.polar_bear[2];
        };      
        if(this.lookingDirection === 'down') {
            this.currentSprite = g_sprites.polar_bear[3];
        };    
        if(this.lookingDirection === 'up-left') {
            this.currentSprite = g_sprites.polar_bear[4];
        };
        if(this.lookingDirection === 'up-right') {
            this.currentSprite = g_sprites.polar_bear[5];
        };
        if(this.lookingDirection === 'down-right') {
            this.currentSprite = g_sprites.polar_bear[6];
        };
        if(this.lookingDirection === 'down-left') {
            this.currentSprite = g_sprites.polar_bear[7];
        };
    };

};

//-------------------------
// Check for the lifeSpan 
// of the snowball
//-------------------------

Sheep.prototype.updateSnowball = function(du){
    if(this.stuck){
        this.direction = 0;
        this.moveable = true;
    }

    this.moveTheSnowball(du);
    // Decrease lifeSpan of the snowball
    this.lifeSpanAsSnowball -= du;

    // If the snowball is stuck in the water
    if(this.lifeSpanAsSnowball<10 && this.stuck){
        var hitEnt = this.findHitEntity();
        if (hitEnt){ 
            if(currentLevel === level16 || 
                currentLevel === level17 || currentLevel === level18 || 
                currentLevel === level19 || currentLevel === level20 ){
                            hitEnt.changeSprite = true;

            };
            hitEnt.collidable = false;
            hitEnt.isFrozen = true;
            hitEnt._isDeadNow = true;
        };
    };

    if(this.lifeSpanAsSnowball<0 && this.stuck){
        // If it's stuck in water then it's dead
        this.dead = true;  
    };
    if (this.lifeSpanAsSnowball < 0 && this.stuck === false ) {
        // If it's not stuck in water then it returns to it's sheep state
        this.returnToSheep();
    };
};

//-------------------------
// Moving the snowball
//-------------------------

Sheep.prototype.moveTheSnowball = function(du){
    if(this.moveable){
        if (this.direction === 'right'){
            this.rotation +=this.snowballRotation * du;
            this.cx +=this.vel;
            if(this.cx >= this.destinationX) this.cx = this.destinationX;
        };
        if (this.direction === 'left'){
            this.rotation -=this.snowballRotation * du;
            this.cx -=this.vel;
            if(this.cx <= this.destinationX) this.cx = this.destinationX;

        };
        if (this.direction === 'down'){
            this.rotation -=this.snowballRotation* du;
            this.cy +=this.vel;
            if(this.cy >= this.destinationY) this.cy = this.destinationY;
        };
        if (this.direction === 'up'){
            this.rotation +=this.snowballRotation * du;
            this.cy -=this.vel;
            if(this.cy <= this.destinationY) this.cy = this.destinationY;
        };
    };
    // Until it reaches its destination coords
    if(this.cx === this.destinationX || this.cy === this.destinationY){
        // Initialize the direction
        this.direction=0;
        this.rotation =0;
    };
};

Sheep.prototype.collidingCheck = function(){
// If the snowball is in the water then it's stuck
    var hitEnt = this.findHitEntity();
    if (hitEnt){ 
        var isCollidable = hitEnt.canSnowballGoThroughObject();
        if(this.direction === 'right'){
            this.destinationX = this.destinationX + this.sizeOfSprite;
            this.checkRight(isCollidable,hitEnt);
        };
        if(this.direction === 'left'){
            this.destinationX = this.destinationX - this.sizeOfSprite;

            this.checkLeft(isCollidable,hitEnt);
        };
        if(this.direction === 'up'){
            this.destinationY = this.destinationY - this.sizeOfSprite;
            this.checkUp(isCollidable,hitEnt);
        };
        if(this.direction === 'down'){
            this.destinationY = this.destinationY + this.sizeOfSprite;
            this.checkDown(isCollidable,hitEnt);
        };  
    };
};

//-------------------------
// When the snowball goes 
// in the water
//-------------------------

Sheep.prototype.checkRight = function(isCollidable,hitEnt){
    if(isCollidable === true && (this.cx >= hitEnt.cx)) {
        this.cx = hitEnt.cx;
        hitEnt.collidable = true;
        this.stuck = true;
        this.moveable = true;
    };
};
Sheep.prototype.checkLeft = function(isCollidable,hitEnt){
    if(isCollidable === true && (this.cx < hitEnt.cx)) {
        this.cx = hitEnt.cx;
        hitEnt.collidable = true;
        this.stuck = true;
        this.moveable = true;
    };

};
Sheep.prototype.checkUp = function (isCollidable,hitEnt){
    if(isCollidable === true && (this.cy <=hitEnt.cy)) {
        this.cy = hitEnt.cy
        hitEnt.collidable = true;
        this.stuck = true;
        this.moveable = true;
    };
};
Sheep.prototype.checkDown = function (isCollidable,hitEnt){
    if(isCollidable === true && (this.cy >=hitEnt.cy)) {
        this.cy = hitEnt.cy
        hitEnt.collidable = true;
        this.stuck = true;
        this.moveable = true;
    };
};

//-----------------------------
// If the Sheep is double shot
//-----------------------------

Sheep.prototype.shootOfScreen = function(du){
    this.moveableSnowball = false;
    if (this.directionOfShootingBall === 'right'){
        this.cx += this.velX *du;
    };
    if (this.directionOfShootingBall === 'left'){
        this.cx -= this.velX * du;
    };
    if (this.directionOfShootingBall === 'down'){
        this.cy += this.velY * du;
    };
    if (this.directionOfShootingBall === 'up'){
        this.cy -= this.velY * du;
    };
};

//-----------------------------
// Initialize everything about 
// the Sheep when it returns from 
// Snowball state
//-------------------------
Sheep.prototype.returnToSheep = function(){
    this.moveableSnowball = false;
    this.moveable = false;
    this.dead = false;
    this.stuck= false;
    this.shootSnowball=false;
    this.lifeSpanAsSnowball = 3000 / NOMINAL_UPDATE_INTERVAL;
    if(currentLevel === level06 || currentLevel === level07 || 
        currentLevel === level08 || currentLevel === level09 ||
        currentLevel === level10){
        this.currentSprite = g_sprites.polar_bear[0];

    }
    else this.currentSprite = g_sprites.sheep[0];
    this._isDeadNow = false;
    this.rotation =0;
};
// Sheeps original position in the level
Sheep.prototype.originalPos = function(){
    this.cx = this.originalCx;
    this.cy = this.originalCy;
};

//-------------------------
// When the Viking collects 
// the treasure
//-------------------------

Sheep.prototype.dissapear = function(){
    this.explodeSheep = true;
};

Sheep.prototype.render = function (ctx) {
    // Makes the snowball state fade back into the Sheep state
    if (this.moveableSnowball){
        var fadeThresh = Sheep.prototype.lifeSpanAsSnowball / 3;  
        if (this.lifeSpanAsSnowball < fadeThresh) {
            ctx.globalAlpha = this.lifeSpanAsSnowball / fadeThresh;
        };
    };
    if(this.explodeSheep){
        var sprite_base = g_sprites.explode;
        if(this._animation.Frame > 9) {
            this.killAllSheep = true;
        };
        this.currentSprite = sprite_base[this._animation.Frame];
        this._animation.Frame +=1;
    };

    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
    ctx.globalAlpha = 1;
};