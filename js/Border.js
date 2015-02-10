"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Border(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rememberResets();
    // Default sprite
    this.sprite = this.sprite || g_sprites.border[0];
    this._scale = 1;
};

Border.prototype.setup = function (descr) {
    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }    
};

Border.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Border.prototype.update = function (du) {
};

Border.prototype.render = function (ctx,cx,cy) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, cx, cy, this.rotation);
    this.sprite.scale = origScale;
};

