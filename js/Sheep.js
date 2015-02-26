"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Sheep(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.sheep[0];
    this.currentSprite = this.currentSprite ||g_sprites.sheep[0]
    this._scale = 1;
    this.lookingDirection=0;
    this.moveableSnowball = false;
    this.moveable = false;
};

Sheep.prototype = new Entity();
Sheep.prototype.lifeSpanAsSnowball = 1500 / NOMINAL_UPDATE_INTERVAL;
Sheep.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};
Sheep.prototype.collectable = function(){
    return false
}

Sheep.prototype.takeBulletHit = function(){
    this.kill();
}

// First we check if we move the sheep if it collides with anything
// then we perform the move in the update
Sheep.prototype.collidable = function(direction){
    this.direction = direction;

    spatialManager.unregister(this);
    var prevY = this.cy;
    var prevX = this.cx;

    if(this.moveableSnowball === true){
        this.moveable = true;
        if (this.direction === 'right'){
            this.cx +=this.sprite.width;
        }
        if (this.direction === 'left'){
            this.cx -=this.sprite.width;
        }
        if (this.direction === 'down'){
            this.cy +=this.sprite.width;
        }
        if (this.direction === 'up'){
            this.cy -=this.sprite.width;
        }
        
        var hitEntity = this.findHitEntity();
        if (hitEntity) {
            this.moveable = false;
            this.direction =0;
        }
    }
    this.cx = prevX;
    this.cy = prevY;       

    spatialManager.register(this);

    return this.moveable;
}




Sheep.prototype.update = function (du) {
    spatialManager.unregister(this);
    //has it been shot
    if(this.moveableSnowball){
        // decrease lifeSpan of the snowball
        this.lifeSpanAsSnowball -= du;
        if (this.lifeSpanAsSnowball < 0) {
            this.resetSheep();
        }
    }
    //---------------------
    // Direction of eyes
    //----------------------

    // Sheep looks left
    if(this.lookingDirection === 0 ) {
        this.currentSprite = g_sprites.sheep[0];
    };
    //Sheep looks right
    if(this.lookingDirection === 1) {
        this.currentSprite = g_sprites.sheep[1];
    };    
    //Sheep looks up
    if(this.lookingDirection === 2) {
        this.currentSprite = g_sprites.sheep[2];
    };      
    //Sheep looks down
    if(this.lookingDirection === 3) {
        this.currentSprite = g_sprites.sheep[3];
    };

    //-----------------------------------
    // If the sheep is hit by a bullet
    //-----------------------------------
    if(this._isDeadNow) {
        this.currentSprite = g_sprites.snowball[0];
        this.moveableSnowball = true;
    }
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) canTakeHit.call(hitEntity); 
        // stop drawing the bullet if there is a hit!
        this.takeBulletHit();
    }

    //-----------------------------------
    // move the sheep if it's a snowball
    //-----------------------------------

    if(this.moveableSnowball=== true){
        var prevY = this.cy;
        var prevX = this.cx;
        if (this.direction === 'right'){
            this.cx +=this.sprite.width;
        }
        if (this.direction === 'left'){
            this.cx -=this.sprite.width;
        }
        if (this.direction === 'down'){
            this.cy +=this.sprite.width;
        }
        if (this.direction === 'up'){
            this.cy -=this.sprite.width;
        }

        var hitEntity = this.findHitEntity();
        if (hitEntity) {
            this.moveable = false;
            this.cx = prevX;
            this.cy = prevY;

        }
    }
    //reset the direction of the sheep
    this.direction=0;
    
    spatialManager.register(this);
};

Sheep.prototype.resetSheep = function(){
    this._isDeadNow = false;
    this.currentSprite = g_sprites.sheep[0];
    this.moveableSnowball = false;
    this.moveable = false;
    this.lifeSpanAsSnowball = 1500 / NOMINAL_UPDATE_INTERVAL;
}
// called from entityManager
Sheep.prototype.lookingAtViking = function(vikingCx, vikingCy) {
    // looks right
    if (vikingCx > this.cx && vikingCy === this.cy){
        this.lookingDirection=1;
    }
    // looks left
    if(vikingCx<= this.cx && vikingCy === this.cy){
        this.lookingDirection =0;
    }
    // looks down
    if (vikingCy > this.cy){
        this.lookingDirection = 3;
    }
    // looks up
    if (vikingCy < this.cy){
        this.lookingDirection =2;
    }
}

Sheep.prototype.render = function (ctx) {
    if (this.moveableSnowball){
        var fadeThresh = Sheep.prototype.lifeSpanAsSnowball / 3;  
        if (this.lifeSpanAsSnowball < fadeThresh) {
            ctx.globalAlpha = this.lifeSpanAsSnowball / fadeThresh;
        }
    }
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
    ctx.globalAlpha = 1;

};

