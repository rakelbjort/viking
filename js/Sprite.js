// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */
// Construct a "sprite" from the given `image`,
//
function Sprite(image,width,height,sx,sy) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.scale = 1;
    this.sx = sx;
    this.sy = sy;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    if (rotation === undefined) rotation = 0;
    var w = this.width,
        h = this.height;
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(rotation);
    ctx.translate(-x,-y)
    ctx.scale(this.scale, this.scale);
    ctx.drawImage(this.image,this.x,this.y, w,h,x,y,w,h);
    ctx.restore();
};


Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    ctx.translate(-cx,-cy);
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image, this.sx,this.sy,w,h,cx-w/2, cy-h/2,w,h);
    ctx.restore();
};  

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    var sw = g_canvas.width; 
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {
    // Get "screen height"
    var sh = g_canvas.height;
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);  
};