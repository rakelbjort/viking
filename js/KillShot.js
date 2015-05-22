"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function KillShot(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.bullet_medusa[0];
    this.currentSprite = this.currentSprite ||g_sprites.bullet_medusa[0];
    this._scale = 1;
    this.direction;
};

KillShot.prototype = new Entity();

KillShot.prototype.rotation = 0;
KillShot.prototype.cx = 0;
KillShot.prototype.cy = 0;
KillShot.prototype.velX = 15;
KillShot.prototype.velY = 15;

KillShot.prototype.takeBulletHit = function(){
    this.kill();
};
KillShot.prototype.canMedusaSeeThroughThis = function(){
    return true;
};
KillShot.prototype.isDead = function(){
    return false;
};
KillShot.prototype.canMedusaKillIt = function(){
    return false;
}
KillShot.prototype.canSnowballGoThroughObject = function(){
    return false;
};

KillShot.prototype.update = function (du) {
    spatialManager.unregister(this);

    if(this._isDeadNow) return entityManager.KILL_ME_NOW;

    if (this.direction === 'right'){
        this.currentSprite = g_sprites.bullet_medusa[0];
        this.cx += this.velX * du;
    };
    if (this.direction === 'left'){
        this.currentSprite = g_sprites.bullet_medusa[0];
        this.cx -= this.velX * du;
    };
    if (this.direction === 'down'){
        this.currentSprite = g_sprites.bullet_medusa[1];
        this.cy += this.velY * du;
    };
    if(this.direction === 'up'){
        this.currentSprite = g_sprites.bullet_medusa[1];    
        this.cy -= this.velY * du;
    };
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.isDead();
        if (canTakeHit) {
            // canTakeHit.call(hitEntity);
            // stop drawing the bullet if there is a hit!
            this.takeBulletHit();
            hitEntity._isDeadNow = true;

        };
        return;
    };
    spatialManager.register(this);

};

KillShot.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

KillShot.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
    ctx.globalAlpha = 1;
};