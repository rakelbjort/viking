"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Border(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.borders[0];
    this.currentSprite = this.currentSprite || g_sprites.borders[0];

    if(currentLevel === level06 || currentLevel === level07 || currentLevel === level08 || 
        currentLevel === level09 || currentLevel === level10){
        this.currentSprite = g_sprites.borders[4];
    }
    if(currentLevel === runeLevel01 || currentLevel === runeLevel02 || currentLevel === runeLevel03
        || currentLevel === runeLevel04){
        this.currentSprite = g_sprites.borders[3];
    }
    if(currentLevel === level11 || currentLevel === level12 || currentLevel === level13 || 
        currentLevel === level14 || currentLevel === level15){
        this.currentSprite = g_sprites.borders[2];
    }
    this._scale = 1;
    this.originalCx = this.cx;
    this.originalCy = this.cy;
    if((currentLevel === level01 || currentLevel === level02 || currentLevel === level03 || 
        currentLevel === level04  || currentLevel === level05) && this.originalCy<64){
        this.currentSprite = g_sprites.borders[1];
    }
};

Border.prototype = new Entity();

Border.prototype.getRadius = function () {
    return (this.sprite.width / 2);
};
// Bullet stops if it hits the Border
Border.prototype.takeBulletHit = function(){
    // this.kill();
};
Border.prototype.canMoveObject = function(){
    return false;
};
Border.prototype.collectable = function(){
    return false
};
Border.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
Border.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Border.prototype.isDead = function(){
    return false;
};
Border.prototype.canMedusaKillIt= function(){
    return false;
}
// Dragon ball stops if it hits the Border
Border.prototype.takeDragonHit = function(){
};

Border.prototype.update = function (du) {
    spatialManager.unregister(this);
    spatialManager.register(this);
};

Border.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing

    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};