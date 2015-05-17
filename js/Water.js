"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Water(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.water;
    this.currentSprite = this.currentSprite ||g_sprites.water[0]

    this._scale = 1;
    this.collidable = false;
    this._animation = {
        Frame:0,
        Ticker:0
    };  
    // Used to select the correct sprite
    if(currentLevel === level16 || currentLevel === level17 || currentLevel === level18 || 
    currentLevel === level19 || currentLevel === level20 ){
            this.sprite = g_sprites.lava;
    }
    if(currentLevel === level10 || currentLevel === level11 || currentLevel === level12 || 
        currentLevel === level13 || currentLevel === level14 || currentLevel === level15){
            this.sprite = g_sprites.blue_lagoon_water;
    }
};

Water.prototype = new Entity();


Water.prototype.getRadius = function () {
    return (this.currentSprite.width / 2) ;
};

Water.prototype.canMoveObject = function(cx,cy,direction){
    
    return this.collidable;
};
Water.prototype.collectable = function(){
    return false;
};
Water.prototype.canSnowballGoThroughObject = function (){
    return true;
};
Water.prototype.canMedusaSeeThroughThis = function(){
    return true;
};
Water.prototype.isDead = function(){
   return false;
};
Water.prototype.numSubSteps = 1;
Water.prototype.NOMINALS = {
    ANIM_FRAME_RATE :0
};

Water.prototype.update = function (du) {
    spatialManager.unregister(this);
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }
    
    spatialManager.register(this);
};
Water.prototype.computeSubStep = function (du){
    if(this._animation.Ticker < Math.abs(this.NOMINALS.ANIM_FRAME_RATE)){
        this._animation.Ticker +=du;}
    else {
        this.whichSprite();
        this._animation.Ticker = -20;

    }

};

Water.prototype.render = function (ctx) {

    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};

Water.prototype.whichSprite = function (){

    var sprite_base = this.sprite;
    if(this._animation.Frame > 6) this._animation.Frame=0;
    this.currentSprite = sprite_base[this._animation.Frame];
    this._animation.Frame +=1;

};