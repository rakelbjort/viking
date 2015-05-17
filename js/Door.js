"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Door(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.door[0];
    this.currentSprite = this.currentSprite || g_sprites.door[0];
    // The door is closed when we start the level
    this.doorOpened = false;
};

Door.prototype = new Entity();

Door.prototype.getRadius = function () {
    return (this.sprite.width / 4);
};
// Bullet stops if it hits the Door
Door.prototype.takeBulletHit = function(){
    // this.kill();
};
Door.prototype.collectable = function(){
    return false;
};
Door.prototype.canMoveObject = function(){
    return this.doorOpened;
};
Door.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Door.prototype.isDead = function(){
    return false;
};
Door.prototype.doorIsOpen = function(){
    return this.doorOpened;
};
Door.prototype.canMedusaSeeThroughThis = function(){
    return true;
};
Door.prototype.takeDragonHit = function(){
};
Door.prototype.update = function (du) {
    spatialManager.unregister(this);
    spatialManager.register(this);
};

// Opens the door
// Called from entityManager
Door.prototype.openDoor = function(){
    this.doorOpened = true;
};

Door.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    // If door is closed 
    
        this.currentSprite = g_sprites.door[2];
    
    // If the door is open
    if (this.doorOpened){
        this.currentSprite = g_sprites.door[3];
    }
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};