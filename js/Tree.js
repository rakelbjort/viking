"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Tree(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.tree[0];
    this._scale = 1;
};

Tree.prototype = new Entity();


Tree.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};
Tree.prototype.takeBulletHit = function(){
    // this.kill();
}
Tree.prototype.collidable = function(){
    return false;

}
Tree.prototype.collectable = function(){
    return false
}

Tree.prototype.update = function (du) {
    spatialManager.unregister(this);
    spatialManager.register(this);
};

Tree.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.sprite.scale = origScale;
};

