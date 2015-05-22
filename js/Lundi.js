"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Lundi(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.lundi;
    this.currentSprite = this.currentSprite ||g_sprites.lundi[0]
    this._scale = 1;
    this._animation = {
        Frame:0,
        Ticker:-0.5
    };  
    this.isSleeping = false;
    // Starting direction
    this.direction = 'right';
    // Clear the level
    this.explodeLundi = false;
    // Destination Coords
    this.destinationY;
    this.destinationX;
    this.itIsMoving = true;
    this.sizeOfSprite = this.currentSprite.height/2;
};

Lundi.prototype = new Entity();

Lundi.prototype.NOMINALS = {
    ANIM_FRAME_RATE : 1
};
// Slower then the Viking
Lundi.prototype.vel = 1.3; 

Lundi.prototype.numSubSteps = 1;
Lundi.prototype.getRadius = function () {
    return (this.sizeOfSprite);
};
//Viking can't move it
Lundi.prototype.canMoveObject = function(){
    return false;
};
Lundi.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
Lundi.prototype.canSnowballGoThroughObject = function (){
    return false;
};
Lundi.prototype.takeBulletHit = function(){
};
Lundi.prototype.canMedusaKillIt = function(){
    return false;
};
// If only!
Lundi.prototype.collectable = function(){
    return false;
};
// Viking can make the Lundi sleep by colliding with it
Lundi.prototype.isLundiSleeping = function(){
    return true;
};
Lundi.prototype.takeDragonHit = function(){
};
Lundi.prototype.isDead = function(){
    return false;
}
Lundi.prototype.update = function (du) {

    spatialManager.unregister(this);
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }
    // If the Treasure is collected, then kill the Lundi
    if(this.killAllLundi) return entityManager.KILL_ME_NOW;

    //Rembering the last position and direction
    var prevX = this.cx;
    var prevY = this.cy;
    var prevDirection = this.direction;

    // If Lundi is not sleeping then it can walk
    if(this.isSleeping === false){
        
        if(this.cy%32===0 && this.cx%32 ===0){
            if (this.direction ==='down' ){
                // Lundi checks if it can go to the right
                this.tryGoRight(prevX,prevY);
                if(this.itIsMoving === false){
                    // If not, then try to go down
                    this.tryGoDown(prevX,prevY);
                }
            }
            else if (this.direction ==='up' ){
                // Lundi checks if it can go to the left
                this.tryToGoLeft(prevX,prevY);
                if(this.itIsMoving === false){
                    // If not, then try to go up
                    this.tryGoUp(prevX,prevY);
                }
            }
            else if (this.direction ==='left' ) {
                // Lundi checks if it can go down
                this.tryGoDown(prevX,prevY);
                if(this.itIsMoving === false){
                // Lundi checks if it can go down
                    this.tryToGoLeft(prevX,prevY);
                }
            }
            else if (this.direction ==='right' ){
                // Lundi checks if it can go down
                this.tryGoUp(prevX,prevY);
                if(this.itIsMoving === false){
                // Lundi checks if it can go right
                    this.tryGoRight(prevX,prevY);
                }
            }                   
        }

        if(this.itIsMoving){
            // Move the Lundi 
            this.moveLundi(du);
        }
        if(this.isSleeping) this.direction =  prevDirection;    
    }
    spatialManager.register(this);
}; 

//-------------------------
// Everything you need to 
// move the Lundi!
//-------------------------


Lundi.prototype.tryToGoLeft = function(prevX,prevY){
    this.itIsMoving = true;
    this.direction = 'left';
    // Check if it's hitting anything in the next step
    this.collisionDetectionForObjects(this.cx - this.sizeOfSprite, this.cy);
    if(this.itIsMoving){
        this.destinationX = this.cx - this.sizeOfSprite;
        this.destinationY = null;
    }
    // If it's hitting something on the left then change direction
    else this.direction = 'up';
    return this.direction;
};

Lundi.prototype.tryGoRight = function(prevX,prevY){
    this.itIsMoving = true;
    this.direction = 'right';
    // Check if it's hitting anything in the next step
    this.collisionDetectionForObjects(this.cx + this.sizeOfSprite, this.cy);
    if(this.itIsMoving){
        this.destinationX = this.cx + this.sizeOfSprite;
        this.destinationY= null;
    }
    // If it's hitting something on the right then change direction
    else this.direction = 'down';
    return this.direction;

};
Lundi.prototype.tryGoUp = function (prevX,prevY){
    this.itIsMoving = true;
    this.direction = 'up';
     // Check if it's hitting anything in the next step
    this.collisionDetectionForObjects(this.cx, this.cy - this.sizeOfSprite);
    if(this.itIsMoving){
        this.destinationX= null;
        this.destinationY = this.cy - this.sizeOfSprite;
    }
    // If it's hitting something on top then change direction
    else this.direction = 'right';
    return this.direction;

};
Lundi.prototype.tryGoDown = function(prevX,prevY){
    this.itIsMoving = true;
    this.direction = 'down';
    // Check if it's hitting anything in the next step
    this.collisionDetectionForObjects(this.cx, this.cy + this.sizeOfSprite);
    if(this.itIsMoving){
        this.destinationX = null;
        this.destinationY = this.cy + this.sizeOfSprite;
    }
    // If it's hitting something on the bottom then change direction
    else this.direction = 'left';
    return this.direction;

};

Lundi.prototype.moveLundi = function (du){
    if (this.direction === 'down'){
        this.cy += this.vel *du;
        if(this.cy >= this.destinationY) this.cy = this.destinationY;
    }
    if (this.direction === 'up'){
        this.cy -= this.vel*du;
        if(this.cy <= this.destinationY) this.cy = this.destinationY;
    }
    if (this.direction === 'left'){
        this.cx -= this.vel *du;
        if(this.cx <= this.destinationX) this.cx = this.destinationX;
    }
    if (this.direction === 'right'){
        this.cx += this.vel *du;
        if(this.cx >= this.destinationX) this.cx = this.destinationX;
    }
    // move Lundi until it reaches it's destination
    if (this.cy === this.destinationY || this.cx === this.destinationX) {
        this._animation.Frame = 0;
        this.itIsMoving = false;
    }

};


Lundi.prototype.dissapear = function(){
    this.explodeLundi = true;
};

//-------------------------
// Collision detection
//-------------------------

Lundi.prototype.collisionDetectionForObjects = function(cx,cy){
    var entityInSpace = spatialManager.findEntityInRange(
    cx, cy, this.getRadius());
    if (entityInSpace){
        // If it's hitting anything then it changes direction
        this.itIsMoving = false;
        // If it hits a Viking then the Lundi sleeps
        var isViking = entityInSpace.isDead();
        if(isViking){
            this.isSleeping  = true;
        };
    };
};

Lundi.prototype.computeSubStep = function (du){
    var thisismysprite = this.direction;
    if(this.isSleeping === false){
        if(this._animation.Ticker <= Math.abs(this.NOMINALS.ANIM_FRAME_RATE)){
            this._animation.Ticker +=du;
        }
        else {
            this.whichSprite();
            this._animation.Ticker = -0.5;
        }
    };
    if(this.isSleeping){
        if(this._animation.Ticker <= Math.abs(this.NOMINALS.ANIM_FRAME_RATE)){
            this._animation.Ticker +=du;
        }
        else {
            this.whichSprite();
            this._animation.Ticker = -5;
        }
    };
    if(this.explodeLundi){
        if(this._animation.Ticker <= Math.abs(this.NOMINALS.ANIM_FRAME_RATE)){
            this._animation.Ticker +=du;
        }
        else {
            this.whichSprite();
            this._animation.Ticker = 0;
        }
    };
};

//===============
//  Render
//===============

Lundi.prototype.render = function (ctx) {
    var origScale = 1;
    // pass my scale into the sprite, for drawing
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx,this.cx,this.cy,this.rotation);
    this.currentSprite.scale = origScale;
};

// Which Sprite to use for the Lundi
Lundi.prototype.whichSprite = function (){

    var sprite_base = this.sprite;
    if(this.explodeLundi){
        var sprite_base = g_sprites.explode;
        if(this._animation.Frame > 7) {
            this.killAllLundi = true;
        }
    }
    else if(this.isSleeping === false){
        if(this.direction === 'down'){
            sprite_base = g_sprites.lundiGoingDown;
        }
        else if(this.direction === 'up'){
            sprite_base = g_sprites.lundiGoingUp;
        }
        else if(this.direction === 'left'){
            sprite_base = g_sprites.lundiGoingLeft;
        }    
        
        else if(this.direction === 'right'){
            sprite_base = g_sprites.lundiGoingRight;
        }
    }
    else if(this.isSleeping){
        if(this.direction === 'left'){
            sprite_base = g_sprites.lundiSleepingToTheLeft;
        }          
        if(this.direction === 'right'){
            sprite_base = g_sprites.lundiSleepingToTheRight;
        }         
        if(this.direction === 'down'){
            sprite_base = g_sprites.lundiSleepingDown;
        } 
        if(this.direction ==='up'){
            sprite_base = g_sprites.lundiSleepingUp;
        }
    }

    // Animating the sprite
    if(this._animation.Frame > 7) this._animation.Frame=0;

    this.currentSprite = sprite_base[this._animation.Frame];
    this._animation.Frame +=1;
};