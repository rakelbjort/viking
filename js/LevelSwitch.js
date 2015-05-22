"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function LevelSwitch(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.fog[0];
    this.currentSprite = this.currentSprite ||g_sprites.fog[0]
    this._animation = {
        Frame:0,
        Ticker:0
    };
};

LevelSwitch.prototype = new Entity();

LevelSwitch.prototype.update = function (du) {
    spatialManager.unregister(this);
    if(this.killFog) this._isDeadNow = true;
    if(this._isDeadNow) return entityManager.KILL_ME_NOW;
    spatialManager.register(this);
};


LevelSwitch.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    
    var sprite_base = g_sprites.fog;
    if(this._animation.Frame > 18) {
        this.killFog = true;
    };
    
    this.currentSprite = sprite_base[this._animation.Frame];
    this._animation.Frame +=1;
    
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx,this.cx,this.cy, this.rotation);
    this.currentSprite.scale = origScale;

};