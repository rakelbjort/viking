"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Dragon(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.dragon[0];
    this.currentSprite = this.currentSprite ||g_sprites.dragon[0];
    // Its angry if it is awake
    this.angry = 0;
    this._scale = 1;
    // One shot at a time
    this.oneShot = 1;
    // Clear the level of dragons
    this.killAllDragon = false;
    this.explodeDragon = false;
    this._animation = {
        Frame:1,
        Ticker:0
    };
    // Awake if Viking has collected all the hearts
    this.awake = false;
    // If Viking shoots it
    this.moveableSnowball = false;
    this.moveable = false;
    this.dead = false;
    // Stuck in the water
    this.stuck= false;
    // State of Dragon when it's doubel shot
    this.shootSnowball=false;
    this.directionOfShootingBall=0;
    // Original position of the dragon
    this.originalCx = this.cx;
    this.originalCy = this.cy;
    // Destination coords
    this.destinationX;
    this.destinationY;
    this.moveSpan = 2000 / NOMINAL_UPDATE_INTERVAL;
    this.vel = 2.65;
    this.rotation =0;
    this.sizeOfSprite = this.currentSprite.height/2;
    this.isCollidingWithViking = false;

};

Dragon.prototype = new Entity();
// CountDown from snowball state to dragon again
Dragon.prototype.lifeSpanAsSnowball = 4000 / NOMINAL_UPDATE_INTERVAL;
// CountDown from when the dragon is killed until it reappears
Dragon.prototype.timeToResetDragon = 4000 / NOMINAL_UPDATE_INTERVAL;

Dragon.prototype.getRadius = function () {
    return (this.sprite.width / 2);
};
Dragon.prototype.canMoveObject = function(){
    return false;
};
Dragon.prototype.collectable = function(){
    return false
};
Dragon.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
Dragon.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Dragon.prototype.isDead = function(){
    return false;
};
// When shot it turns into a snowball
Dragon.prototype.takeBulletHit = function(){
    this.kill();
};

// When the dragon is double shot    
Dragon.prototype.shootSnowballOfScreen = function(direction){
    // If it's in water then we don't wont be able to
    // double shoot it
    if(this.stuck) return;
    this.shootSnowball = true;
    // Direction from the Viking
    this.directionOfShootingBall = direction;
};

Dragon.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Dragon.prototype.canMedusaKillIt = function(){
    return false;
};

// The velocity when Dragon is double shot off the screen
Dragon.prototype.velX = 20;
Dragon.prototype.velY = 20;
Dragon.prototype.snowballRotation = 0.35;

Dragon.prototype.timeBetweenShots = 2000 / NOMINAL_UPDATE_INTERVAL;

// First we move the Dragon, if it does not collide with anything
// then we perform the move in the update
Dragon.prototype.canMoveObject = function(cx,cy,direction){
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
        if(this.lifeSpanAsSnowball<20) {
            this.moveable = false;
        };
        // Return to it's former state
        this.cx = prevX;
        this.cy = prevY;       
    }
    else this.moveable = false;
    spatialManager.register(this);
    return this.moveable;
};

// Updates the face of dragon
Dragon.prototype.update = function (du) {
    // Save previous position
    var prevY = this.cy;
    var prevX = this.cx;
    spatialManager.unregister(this);
    if(this.killAllDragon) return entityManager.KILL_ME_NOW;
    // After the dragon has been double shot and returns to it's original coords
    // and the Viking is in the same coords, then viking can move out of the dragon
    if(this.isCollidingWithViking === true){
        this.moveable = true;
    };
    if(this.moveableSnowball === false && this.isCollidingWithViking === false){
        this.moveable = false;
    };

    //-----------------------------------
    // If the Dragon is hit by a bullet
    //-----------------------------------

    if(this._isDeadNow) {
        this.currentSprite = g_sprites.snowball[0];
        this.moveableSnowball = true;
    };
    // Turns into a snowball
    if(this.moveableSnowball ){
        this.updateSnowball(du);
    };
    // Check if the dragon is colliding with anything
    this.collidingCheck();

    // If the Dragon is double shot
    if(this.shootSnowball){
        this.shootOfScreen(du);  
    };
    // If the Dragon goes of the canvas then it's dead
    if(this.cy > canvas.height || this.cy < 0 ||
        this.cx > canvas.width || this.cx <0){
        this.dead = true;
    };

    //------------------------------------
    // The Dragon is dead! Must revive it!
    //------------------------------------

    if(this.dead){
        // move it outside the canvas, just for a little while!
        this.cx = -this.currentSprite.width;
        this.cy = -this.currentSprite.height;
        this.returnToDragon();
        this.timeToResetDragon -= du;
        if(this.timeToResetDragon<0){
            // Put it in its original coords
            this.originalPos();
            // Initialize the countDown
            this.timeToResetDragon = 3000 / NOMINAL_UPDATE_INTERVAL;
        };
    };
    // The dragon wakes up when all the hearts have been collected
    if(!entityManager._heart.length){
        this.awake = true;
    };

    // updating sprites, is the dragon facing left or right? is it awake or not ?
    if(this.angry !== 0  && this._isDeadNow === false && this.turning_direction === 'right') {
        this.currentSprite = g_sprites.dragonAwake[0];
    };
    if(this.angry === 0 && this._isDeadNow === false && this.turning_direction === 'right') {
        this.currentSprite = g_sprites.dragon[0];
    };
    if(this.angry !== 0  && this._isDeadNow === false && this.turning_direction === 'left') {
        this.currentSprite = g_sprites.dragonAwake_toTheLeft[0];
    };
    if(this.angry === 0 && this._isDeadNow === false && this.turning_direction === 'left') {
        this.currentSprite = g_sprites.dragon_toTheLeft[0];
    };

    // Updating the time between dragon balls are shot
    this.timeBetweenShots -= du;

    if(this.shoot){
        this.killViking();
        this.oneShot = 0;
    };

    if(this.timeBetweenShots<0){   
        this.timeBetweenShots = 2000 / NOMINAL_UPDATE_INTERVAL;
        this.oneShot = 1;
    };

    spatialManager.register(this);
};


Dragon.prototype.killViking = function () {
    if(this.oneShot ===1)entityManager.dragonFire(this.cx, this.cy, this.direction);
};

// If Dragon sees the viking it gets angry
// called from entityManager
Dragon.prototype.seesViking = function(vikingCx, vikingCy) {
    if(this.awake && this.moveableSnowball === false){
        this.angry = 1;
        if (vikingCx > this.cx && vikingCy === this.cy && this.turning_direction === 'right'){
            this.shoot = true;
            this.direction = 'right';
        }
        else if (vikingCx < this.cx && vikingCy === this.cy && this.turning_direction === 'left'){
            this.shoot = true;
            this.direction = 'left';
        }
        else this.shoot=false;
    } 

    else {
        this.angry =0;
    };
};

Dragon.prototype.dissapear = function(){
    this.explodeDragon = true;
};


//-------------------------
// Check for the lifeSpan 
// of the snowball
//-------------------------

Dragon.prototype.updateSnowball = function(du){
    if(this.stuck){
        this.moveable = true;
        this.direction = 0;
    };
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
        // If it's not stuck in water then it returns to it's dragon state
        this.returnToDragon();
    };
};

//-------------------------
// Moving the snowball
//-------------------------

Dragon.prototype.moveTheSnowball = function(du){
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

Dragon.prototype.collidingCheck = function(){
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

Dragon.prototype.checkRight = function(isCollidable,hitEnt){
    if(isCollidable === true && (this.cx >= hitEnt.cx)) {
        this.cx = hitEnt.cx;
        hitEnt.collidable = true;
        this.stuck = true;
        this.moveable = true;
    }
};
Dragon.prototype.checkLeft = function(isCollidable,hitEnt){
    if(isCollidable === true && (this.cx < hitEnt.cx)) {
        this.cx = hitEnt.cx;
        hitEnt.collidable = true;
        this.stuck = true;
        this.moveable = true;
    }
};
Dragon.prototype.checkUp = function (isCollidable,hitEnt){
    if(isCollidable === true && (this.cy <=hitEnt.cy)) {
        this.cy = hitEnt.cy
        hitEnt.collidable = true;
        this.stuck = true;
        this.moveable = true;
    };
};
Dragon.prototype.checkDown = function (isCollidable,hitEnt){
    if(isCollidable === true && (this.cy >=hitEnt.cy)) {
        this.cy = hitEnt.cy
        hitEnt.collidable = true;
        this.stuck = true;
        this.moveable = true;
    };
};

//-----------------------------
// If the Dragon is double shot
//-----------------------------


Dragon.prototype.shootOfScreen = function(du){
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
// the Dragon when it returns from 
// Snowball state
//-------------------------
Dragon.prototype.returnToDragon = function(){
    this.moveableSnowball = false;
    this.moveable = false;
    this.dead = false;
    this.stuck= false;
    this.shootSnowball=false;
    this.lifeSpanAsSnowball = 3000 / NOMINAL_UPDATE_INTERVAL;
    this.currentSprite = g_sprites.dragon[0];
    this._isDeadNow = false;
    this.rotation =0;

};
// Dragon original position in the level
Dragon.prototype.originalPos = function(){
    this.cx = this.originalCx;
    this.cy = this.originalCy;
};

Dragon.prototype.render = function (ctx) {
    // Makes the snowball state fade back into the Dragon state
    if (this.moveableSnowball){
        var fadeThresh = Dragon.prototype.lifeSpanAsSnowball / 3;  
        if (this.lifeSpanAsSnowball < fadeThresh) {
            ctx.globalAlpha = this.lifeSpanAsSnowball / fadeThresh;
        };
    };
    if(this.explodeDragon){
        var sprite_base = g_sprites.explode;
        if(this._animation.Frame > 9) {
            this.killAllDragon = true;

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