"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Medusa(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rememberResets();
    // Default sprite
    this.sprite = this.sprite || g_sprites.medusa[1];
    this.currentSprite = this.currentSprite ||g_sprites.medusa[1]
    this.angry = 0;
    this._scale = 1;
};

Medusa.prototype.setup = function (descr) {
    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
};

Medusa.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Medusa.prototype.update = function (du) {
    if(this.angry === 1 ) {
        this.currentSprite = g_sprites.medusa[0];
    };
    if(this.angry === 0) {
        this.currentSprite = g_sprites.medusa[1];
    };
};

// If medusa sees the viking it gets angry
// called from entityManager
Medusa.prototype.seesViking = function(vikingCx, vikingCy) {
    if (vikingCx === this.cx || vikingCy === this.cy){
        this.angry =1;
    } 
    else {
        this.angry =0;
    }
};

Medusa.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx,this.cx,this.cy, this.rotation);
    this.currentSprite.scale = origScale;

};


