"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Tree(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rememberResets();
    // Default sprite
    this.sprite = this.sprite || g_sprites.tree[0];
    this._scale = 1;
};


Tree.prototype.setup = function (descr) {
    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
};

Tree.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;

};

Tree.prototype.update = function (du) {
};

Tree.prototype.render = function (ctx,cx,cy) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.sprite.scale = 1;
    this.sprite.drawCentredAt(ctx, cx, cy, this.rotation);
    this.sprite.scale = origScale;
};

