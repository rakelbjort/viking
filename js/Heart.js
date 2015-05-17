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
    return (this.sprite.width / 4);
};
Heart.prototype.takeBulletHit = function(){
    // return false;
};
Heart.prototype.collectable = function(){
    this.kill();
    g_collectingHeart.play();

    // if(currentLevel===level01){
    //     g_heartCollect +=2;
    // }
    // else 
        g_heartCollect +=1;
    return true;
};
Heart.prototype.canMoveObject = function(){
    return false;
};
Heart.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
Heart.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Heart.prototype.isDead = function(){
    return false;
};
Heart.prototype.canMedusaKillIt = function(){
    return false;
};
Heart.prototype.takeDragonHit = function(){
};

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