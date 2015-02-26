"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Treasure_Box(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.treasure_box[0];
    this.currentSprite = this.currentSprite || g_sprites.treasure_box[0];
    this.open = 0;
    this._scale = 1;

};

Treasure_Box.prototype = new Entity();
Treasure_Box.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};
Treasure_Box.prototype.takeBulletHit = function(){
    // this.kill();
}
Treasure_Box.prototype.collidable = function(){
    if(this.open === 0){ return false}
    if (this.open ===1){ return true};

}
Treasure_Box.prototype.collectable = function(){
    return false
}

Treasure_Box.prototype.update = function (du) {
    // if all hearts are collected
    spatialManager.unregister(this);

    if(background_level01.countingHearts() === 0){
        this.open =1;
    }
    if(this.open === 1) {
        this.currentSprite = g_sprites.treasure_box[1];
    };   
    if(this.treasureGone ===1){
        this.currentSprite = g_sprites.treasure_box[2];
    } 
    spatialManager.register(this);

};

// If the treasure box is open and the viking collides with
// the treasure box
// called from entityManager
Treasure_Box.prototype.takeTreasure = function(vikingCx, vikingCy){

    if (vikingCx === this.cx && vikingCy === this.cy && this.open ===1){
        this.treasureGone =1;
        return this.treasureGone;
    } 
};

Treasure_Box.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};