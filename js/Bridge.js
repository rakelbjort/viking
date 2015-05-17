"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Bridge(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.bridge[0];
    this._scale = 1;
    if(currentLevel === level06 || currentLevel === level07|| currentLevel === level14){
            this.sprite = g_sprites.bridge[1];
    }
};

Bridge.prototype = new Entity();

Bridge.prototype.getRadius = function () {
    return (this.sprite.width / 4);
};
Bridge.prototype.canMoveObject = function(cx,cy,direction){
    if(this.cx === cx || this.cy === cy) return true
    else return false;
};
Bridge.prototype.collectable = function(){
    return false
};
Bridge.prototype.canMedusaSeeThroughThis = function(){
    return true;
};
Bridge.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Bridge.prototype.isDead = function(){
    return false;
};
Bridge.prototype.canMedusaKillIt= function(){
    return false;
};
Bridge.prototype.update = function (du) {
    spatialManager.unregister(this);
    spatialManager.register(this);
};

Bridge.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing

    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.sprite.scale = origScale;
};