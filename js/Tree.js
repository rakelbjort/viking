"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Tree(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.tree[0];
    this.currentSprite = this.currentSprite || g_sprites.tree[0];
    this._scale = 1;
    if(currentLevel === level06 || currentLevel === level07 || currentLevel === level08 || 
    currentLevel === level09 || currentLevel === level10 || currentLevel === level11|| 
    currentLevel === level12 || currentLevel === level13 || currentLevel === level14||
    currentLevel === level15 || currentLevel === level16 || currentLevel === level17 || 
    currentLevel === level18 || currentLevel === level19 || currentLevel === level20 ){
            this.currentSprite = g_sprites.tree[1];
    }
    else this.currentSprite = g_sprites.tree[0];

};

Tree.prototype = new Entity();

Tree.prototype.getRadius = function () {
    return (this.sprite.width / 2) ;
};
Tree.prototype.takeBulletHit = function(){
    // this.kill();
};
Tree.prototype.canMoveObject = function(){
    return false;
};
Tree.prototype.collectable = function(){
    return false
};
Tree.prototype.canMedusaSeeThroughThis = function(){
    return true;
};
Tree.prototype.isDead = function(){
    return false;
};
Tree.prototype.takeDragonHit = function(){
};
Tree.prototype.canMedusaKillIt = function(){
    return false;
};
Tree.prototype.update = function (du) {
    spatialManager.unregister(this);
    spatialManager.register(this);
};
Tree.prototype.canSnowballGoThroughObject = function(){
    return false;
};

Tree.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};