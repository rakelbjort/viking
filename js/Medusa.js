"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Medusa(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.medusa[0];
    this.currentSprite = this.currentSprite ||g_sprites.medusa[0];
    // Starts not angry
    this.angry = 0;
    this._scale = 1;
    this.oneShot = 1;
    // Clear the level
    this.killAllMedusa = false;
    this.explodeMedusa = false;
    this._animation = {
        Frame:1,
        Ticker:0
    };
};

Medusa.prototype = new Entity();

Medusa.prototype.getRadius = function () {
    return (this.sprite.width / 2);
};
Medusa.prototype.canMoveObject = function(){
    return false;
};
Medusa.prototype.collectable = function(){
    return false;
};
Medusa.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
Medusa.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Medusa.prototype.isDead = function(){
    return false;
};
Medusa.prototype.takeDragonHit = function(){
};
Medusa.prototype.canMedusaKillIt = function(){
    return false;
};

// Updates the face of Medusa
Medusa.prototype.update = function (du) {
    spatialManager.unregister(this);
    if(this.killAllMedusa) this._isDeadNow = true;
    if(this._isDeadNow) return entityManager.KILL_ME_NOW;
    // Which direction is it trying to kill the Viking
    if(this.angry === 1){
        var seeEntity = this.findEntityInSameLineAbove();
    };
    if(this.angry === 2){
        var seeEntity = this.findEntityInSameLineDown();
    };
    if(this.angry === 3){
        var seeEntity = this.findEntityInSameLineRight();
    };
    if(this.angry === 4){
        var seeEntity = this.findEntityInSameLineLeft();
    };
    if(this.angry !== 0) {
        this.currentSprite = g_sprites.medusa[1];
    };
    if(this.angry === 0) {
        this.currentSprite = g_sprites.medusa[0];
    };

    if (seeEntity) {
        var canSeeThrough = seeEntity.canMedusaKillIt();
        // If medusa can see through the objects then 
        // the Viking freezes and is killed     
        if(canSeeThrough){
            g_troll_kill.play();
            seeEntity.isFrozen = true;
            this.angry = 'killing';
            this.currentSprite = g_sprites.medusa[2];
            seeEntity._isDeadNow = true;
            this.killViking();
            this.oneShot = 0;
        };
    };
    spatialManager.register(this);
};


Medusa.prototype.killViking = function () {
    if(this.oneShot ===1)entityManager.fireKillStare(this.cx, this.cy, this.direction);
}

// If medusa sees the viking it gets angry
// called from entityManager
Medusa.prototype.seesViking = function(vikingCx, vikingCy) {
    var VikingToTheRight = vikingCx + 32;
    var VikingToTheLeft = vikingCx - 32;
    var VikingUp = vikingCy -32;
    var VikingDown = vikingCy + 32;

    if (vikingCx === this.cx && vikingCy< this.cy){
        this.angry =1;
        this.direction = 'up';
    } 
    else if (vikingCx === this.cx && vikingCy> this.cy){
        this.angry =2;
        this.direction = 'down';
    } 
    else if (vikingCx > this.cx && vikingCy === this.cy){
        this.angry =3;
        this.direction = 'right';
    } 
    else if (vikingCx < this.cx && vikingCy === this.cy){
        this.angry =4;
        this.direction = 'left';
    } 
    // If the viking is half way in the way of the medusa
    else if ((VikingToTheRight >= this.cx) && (VikingToTheLeft<= this.cx) || (VikingUp <= this.cy) && (VikingDown >= this.cy))  {
        this.angry = 5;
    }    
    else {
        this.angry =0;
    }
};

Medusa.prototype.dissapear = function(){
    this.explodeMedusa = true;
};

Medusa.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    if(this.explodeMedusa){
        var sprite_base = g_sprites.explode;
        if(this._animation.Frame > 9) {
            this.killAllMedusa = true;
        };
        this.currentSprite = sprite_base[this._animation.Frame];
        this._animation.Frame +=1;
    };
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx,this.cx,this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};