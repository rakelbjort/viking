"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Block(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.block[0];
    this._scale = 1;
    this.moveable = false;
    this.direction;
    console.log('Created a block');
};

Block.prototype = new Entity();
Block.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};
Block.prototype.takeBulletHit = function(){
};
Block.prototype.collectable = function(){
    return false
};

// First we check if we move the block if it collides with anything
// then we perform the move in the update
Block.prototype.collidable = function(direction){
    this.direction = direction;
    this.moveable = true;

    spatialManager.unregister(this);

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
    }
    this.cx = prevX;
    this.cy = prevY;       
    spatialManager.register(this);

    return this.moveable;
}


Block.prototype.update = function (du) {

    spatialManager.unregister(this);

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
    // reset the direction
    this.direction=0;

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        this.moveable = false;
        this.cx = prevX;
        this.cy = prevY;

    }
    spatialManager.register(this);
};

Block.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.sprite.scale = origScale;
};

