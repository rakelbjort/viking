"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Door(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.door[0];
    this.currentSprite = this.currentSprite || g_sprites.door[0];
    this.doorOpened = 0;
};

Door.prototype = new Entity();
Door.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};
Door.prototype.takeBulletHit = function(){
    // this.kill();
}
Door.prototype.collectable = function(){
    return false
}
Door.prototype.collidable = function(){
    if (this.doorOpened === 0){return false}
    if (this.doorOpened === 1){return true}

}

Door.prototype.update = function (du) {
    spatialManager.unregister(this);

    if (this.doorOpened ===1){
        this.currentSprite = g_sprites.door[1];
    }
    spatialManager.register(this);

};

// Opens the door
// Called from entityManager
Door.prototype.openDoor = function(){
    this.doorOpened =1;
}

Door.prototype.render = function (ctx) {

    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};

