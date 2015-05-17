"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Treasure_Box(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.treasure_box_all[0];
    this.currentSprite = this.currentSprite || g_sprites.treasure_box_all[0];
    this.open = false;
    this._scale = 1;
    this.treasureGone = false;

};

Treasure_Box.prototype = new Entity();
Treasure_Box.prototype.getRadius = function () {
    if(this.open){ 
        return this.sprite.width / 4
    }
    if(this.open === false){
        return (this.sprite.width / 2);
    }
};
Treasure_Box.prototype.takeBulletHit = function(){
    // this.kill();
};
Treasure_Box.prototype.canMoveObject = function(){
    return this.open;
};
Treasure_Box.prototype.collectable = function(){
    return this.open;
};
Treasure_Box.prototype.collectableTreasure = function(){
    return this.open;
};
Treasure_Box.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
Treasure_Box.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Treasure_Box.prototype.canMedusaKillIt = function(){
    return false;
};
Treasure_Box.prototype.isDead = function() {
    return false
};
Treasure_Box.prototype.takeDragonHit = function(){
};
Treasure_Box.prototype.update = function (du) {
    // if all hearts are collected
    spatialManager.unregister(this);

    if(!entityManager._heart.length){
        this.open = true;
    }
    if(this.open) {
        if(currentLevel === level01 || currentLevel === level06 || currentLevel === level11 || 
            currentLevel === level16){
            this.currentSprite = g_sprites.treasure_box_all[1]
        }
        if(currentLevel === level02 || currentLevel === level07 || currentLevel === level12 ||
            currentLevel === level17){
            this.currentSprite = g_sprites.treasure_box_all[2]
        }
        if(currentLevel === level03 || currentLevel === level08 || currentLevel === level13 || 
            currentLevel === level18){
            this.currentSprite = g_sprites.treasure_box_all[3]
        }
        if(currentLevel === level04 || currentLevel === level09 || currentLevel === level14 || 
            currentLevel === level19){
            this.currentSprite = g_sprites.treasure_box_all[4]
        }
        if(currentLevel === level05 || currentLevel === level10 || currentLevel === level15
            || currentLevel === level20 ){
            this.currentSprite = g_sprites.treasure_box_all[5]
        }
        
        if(currentLevel === runeLevel01){
            this.currentSprite = g_sprites.runes_all[0];
        }
        if(currentLevel === runeLevel02){
            this.currentSprite = g_sprites.runes_all[2];
        }
        if(currentLevel === runeLevel03){
            this.currentSprite = g_sprites.runes_all[3];
        }
        if(currentLevel === runeLevel04){
            this.currentSprite = g_sprites.runes_all[4];
        }
        
    };   
    if(this.treasureGone && (currentLevel !== runeLevel01 || currentLevel !== runeLevel02|| currentLevel !== runeLevel03)){
        this.currentSprite = g_sprites.treasure_box_all[6];
    }
    if(this.treasureGone && (currentLevel === runeLevel01 || currentLevel === runeLevel02 || currentLevel === runeLevel03
        || currentLevel === runeLevel04)){
         this.currentSprite = g_sprites.runes_all[1]; 
     }
     
    
    spatialManager.register(this);

};

// If the treasure box is open and the viking collides with
// the treasure box
// called from entityManager
Treasure_Box.prototype.takeTreasure = function(){
    return this.treasureGone;
};

Treasure_Box.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};