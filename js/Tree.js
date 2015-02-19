"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Tree(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.tree[0];
    this._scale = 1;
};

Tree.prototype = new Entity();

Tree.prototype.update = function (du) {

};

Tree.prototype.render = function (ctx,cx,cy) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, cx, cy, this.rotation);
    this.sprite.scale = origScale;
};

