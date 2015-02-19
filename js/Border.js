"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Border(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.border[0];
    this._scale = 1;
};

Border.prototype = new Entity();

Border.prototype.update = function (du) {
};

Border.prototype.render = function (ctx,cx,cy) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, cx, cy, this.rotation);
    this.sprite.scale = origScale;
};

