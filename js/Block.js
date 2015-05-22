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
    // Destionation coords
    this.destinationX;
    this.destinationY;
    this.itIsMoving= false;
    this.vel = 2.65;
    this.moveSpan = 1000 / NOMINAL_UPDATE_INTERVAL;
};

Block.prototype = new Entity();

Block.prototype.getRadius = function () {
    return (this.sprite.width / 2);
};
// Bullet stops if it hits the Block
Block.prototype.takeBulletHit = function(){
};
// Can't collect Blocks
Block.prototype.collectable = function(){
    return false;
};
// Can block Medusa killer-stare
Block.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
// Snowball can't go into the Block
Block.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Block.prototype.isDead = function(){
    return false;
};
Block.prototype.canMedusaKillIt = function(){
    return false;
};
// Dragon ball stops if it hits the Block
Block.prototype.takeDragonHit = function(){
};

// First we check if we move the block if it collides with anything
// then we perform the move in the update
Block.prototype.canMoveObject = function(cx,cy,direction){
    if (cx === this.cx || cy === this.cy) {
        this.direction = direction;
        this.moveable = true;

        spatialManager.unregister(this);
        // Save the position
        var prevY = this.cy;
        var prevX = this.cx;
        
        if (this.direction === 'right'){
            this.cx +=this.sprite.width/2;
            this.destinationX = this.cx;
            this.destinationY = null;
        };
        if (this.direction === 'left'){
            this.cx -=this.sprite.width/2;
            this.destinationX = this.cx;
            this.destinationY = null;
        };
        if (this.direction === 'down'){
            this.cy +=this.sprite.width/2;
            this.destinationY = this.cy;
            this.destinationX = null;
        };
        if (this.direction === 'up'){
            this.cy -=this.sprite.width/2;
            this.destinationY = this.cy;
            this.destinationX = null;
        };
        
        var hitEntity = this.findHitEntity();
        if (hitEntity) {
            this.moveable = false;
        };

        // Return to its former position
        this.cx = prevX;
        this.cy = prevY;       
        spatialManager.register(this);
    }
    else this.moveable = false;

    return this.moveable;
};

Block.prototype.update = function (du) {

    spatialManager.unregister(this);
    if (this.moveable){
        var prevY = this.cy;
        var prevX = this.cx;
        if (this.direction === 'right'){
            this.cx += this.vel;
            if(this.cx >= this.destinationX) this.cx = this.destinationX;
        };
        if (this.direction === 'left'){
            this.cx -= this.vel;
            if(this.cx <= this.destinationX) this.cx = this.destinationX;
        };
        if (this.direction === 'down'){
            this.cy += this.vel;
            if(this.cy >= this.destinationY) this.cy = this.destinationY;
        };
        if (this.direction === 'up'){
            this.cy -= this.vel;
            if(this.cy <= this.destinationY) this.cy = this.destinationY;
        };
        if(this.cx === this.destinationX || this.cy === this.destinationY){
            this.direction = 0;
        };
        
        var hitEntity = this.findHitEntity();
        if (hitEntity) {
            this.moveable = false;
            this.cx = prevX;
            this.cy = prevY;
        };
    };
    spatialManager.register(this);
};

Block.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.sprite.scale = origScale;
};