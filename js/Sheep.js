"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Sheep(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rememberResets();
    // Default sprite
    this.sprite = this.sprite || g_sprites.sheep[0];
    this.currentSprite = this.currentSprite ||g_sprites.sheep[0]
    this._scale = 1;
    this.lookingDirection=0;
};


Sheep.prototype.setup = function (descr) {
    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }    
};

Sheep.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;

};

Sheep.prototype.update = function (du) {
    // Sheep looks left
    if(this.lookingDirection === 0 ) {
        this.currentSprite = g_sprites.sheep[0];
    };
    //Sheep looks right
    if(this.lookingDirection === 1) {
        this.currentSprite = g_sprites.sheep[1];
    };    
    //Sheep looks up
    if(this.lookingDirection === 2) {
        this.currentSprite = g_sprites.sheep[2];
    };      
    //Sheep looks down
    if(this.lookingDirection === 3) {
        this.currentSprite = g_sprites.sheep[3];
    };
};

Sheep.prototype.lookingAtViking = function(vikingCx, vikingCy) {
    // looks right
    if (vikingCx > this.cx && vikingCy === this.cy){
        this.lookingDirection=1;
    }
    // looks left
    if(vikingCx<= this.cx && vikingCy === this.cy){
        this.lookingDirection =0;
    }
    // looks down
    if (vikingCy > this.cy){
        this.lookingDirection = 3;
    }
    // looks up
    if (vikingCy < this.cy){
        this.lookingDirection =2;
    }
}

Sheep.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};

