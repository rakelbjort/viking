"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Block(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.block[0];
    this._scale = 1;
};

Block.prototype = new Entity();

Block.prototype.update = function (du) {

};

Block.prototype.render = function (ctx,cx,cy) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, cx, cy, this.rotation);
    this.sprite.scale = origScale;
};

