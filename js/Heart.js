"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Heart(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.heart[0];
    this._scale = 1;
};

Heart.prototype = new Entity();
Heart.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};
Heart.prototype.takeBulletHit = function(){
    // return false;
}
Heart.prototype.collectable = function(){
    this.kill();
    return true;
}
Heart.prototype.collidable = function(){
    return false;
}

Heart.prototype.update = function (du) {
    spatialManager.unregister(this);

    if(this._isDeadNow) return entityManager.KILL_ME_NOW;
    
    spatialManager.register(this);
};


Heart.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.sprite.scale = origScale;
};