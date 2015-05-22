"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Mountain(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.mountain[0];
    this.currentSprite = this.currentSprite ||g_sprites.mountain[0];
    this._scale = 1;
    this.collidable = false;
    this._animation = {
        Frame:0,
        Ticker:0
    };  
};

Mountain.prototype = new Entity();

Mountain.prototype.getRadius = function () {
    return (this.currentSprite.width / 2) ;
};
Mountain.prototype.canMoveObject = function(cx,cy,direction){
    return false;
};
Mountain.prototype.collectable = function(){
    return false;
};
Mountain.prototype.canSnowballGoThroughObject = function (){
    return false;
};
Mountain.prototype.canMedusaSeeThroughThis = function(){
    return false;
};
Mountain.prototype.canMedusaKillIt = function(){
    return false;
};
Mountain.prototype.isDead = function(){
   return false;
};
Mountain.prototype.takeDragonHit = function(){
};
Mountain.prototype.numSubSteps = 1;
Mountain.prototype.NOMINALS = {
    ANIM_FRAME_RATE :0
};

Mountain.prototype.update = function (du) {
    spatialManager.unregister(this);
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }
    spatialManager.register(this);
};

Mountain.prototype.computeSubStep = function (du){
    if(this._animation.Ticker < Math.abs(this.NOMINALS.ANIM_FRAME_RATE)){
        this._animation.Ticker +=du;}
    else {
        this.whichSprite();
        this._animation.Ticker = -20;
    }
};

Mountain.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};

Mountain.prototype.whichSprite = function (){
    // Used to select the correct sprite
    if( currentLevel !== level06 || currentLevel !== level07 ) this.currentSprite = g_sprites.mountain[0];
    if( currentLevel === level16 || currentLevel === level17 || currentLevel === level18 ||
        currentLevel === level19 || currentLevel === level20 ){
        var sprite_base = g_sprites.volcano;
        // this.currentSprite = g_sprites.valcano[0];

        if(this._animation.Frame > 4) this._animation.Frame=0;
        this.currentSprite = sprite_base[this._animation.Frame];
        this._animation.Frame +=1;
    };
};