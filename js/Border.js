"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Border(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.borders[0];
    this._scale = 1;
};

Border.prototype = new Entity();

Border.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};
Border.prototype.takeBulletHit = function(){
    // this.kill();
}
Border.prototype.collidable = function(){
    return false;

}
Border.prototype.collectable = function(){
    return false
}

Border.prototype.update = function (du) {
    spatialManager.unregister(this);
    
    spatialManager.register(this);
};

Border.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.sprite.scale = origScale;
};

