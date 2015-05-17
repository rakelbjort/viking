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
Bullet.prototype.velX = 10;
Bullet.prototype.velY = 10;

Bullet.prototype.getRadius = function () {
    return (this.sprite.width / 4);
};
// If bullet hits something then "kill" the bullet
Bullet.prototype.takeBulletHit = function(){
    this.kill();
};
Bullet.prototype.canMoveObject = function(){
    return true;
};
Bullet.prototype.collectable = function(){
    return false;
};
Bullet.prototype.canMedusaSeeThroughThis = function(){
    return true;
};
Bullet.prototype.canSnowballGoThroughObject = function(){
    return false;
};
Bullet.prototype.isDead = function(){
    return false;
};

Bullet.prototype.update = function (du) {
    spatialManager.unregister(this);

    if(this._isDeadNow || this.lifeSpan<0) return entityManager.KILL_ME_NOW;
    this.lifeSpan -= du;
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
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) {
            canTakeHit.call(hitEntity);
            // stop drawing the bullet if there is a hit!
            this.takeBulletHit();
        } 
    }
    var hitSnowball = this.findHitEntity();
    if (hitSnowball) {
        if(hitSnowball.moveableSnowball){
            hitSnowball.shootSnowballOfScreen(this.direction);
        }
    }
    spatialManager.register(this);
};
Bullet.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
    ctx.globalAlpha = 1;
};