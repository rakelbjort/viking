"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.bullet[0];
    this.currentSprite = this.currentSprite ||g_sprites.bullet[0];
    this._scale = 1;
    this.direction;
};

Bullet.prototype = new Entity();

Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 10;
Bullet.prototype.velY = 10;


Bullet.prototype.update = function (du) {
    spatialManager.unregister(this);
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
    var hitEntity = this.findHitEntity();
        if (hitEntity) {

            console.log('its a hit!');
        }


    spatialManager.register(this);

};

Bullet.prototype.getRadius = function(){
    return 4;
}


Bullet.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};
