"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rememberResets();
    // Default sprite
    this.sprite = this.sprite || g_sprites.bullet[0];
    this.currentSprite = this.currentSprite ||g_sprites.bullet[0];
    this._scale = 1;
    this.direction;
};

Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 10;
Bullet.prototype.velY = 10;

Bullet.prototype.setup = function (descr) {
    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }    
};

Bullet.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;

};

Bullet.prototype.update = function (du) {
    // direction of the bullet same direction as the Viking
    this.rotation +=1 * du;

    if (this.direction === 'right'){
        this.cx += this.velX * du;
    }
    if (this.direction === 'left'){
        this.cx -= this.velX * du
    }
    if (this.direction === 'down'){
        this.cy += this.velY * du;
    }
    if(this.direction === 'up'){
        this.cy -= this.velY * du;
    }
};


Bullet.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};

