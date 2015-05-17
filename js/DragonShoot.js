"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function DragonShoot(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.dragonBall[0];
    this.currentSprite = this.currentSprite ||g_sprites.dragonBall[0];
    this._scale = 1;
    this.direction;
};

DragonShoot.prototype = new Entity();

DragonShoot.prototype.rotation = 0;
DragonShoot.prototype.velX = 10;
DragonShoot.prototype.velY = 10;

DragonShoot.prototype.getRadius = function () {
    return (this.sprite.width / 4);
};

// If bullet hits something then "kill" the bullet
DragonShoot.prototype.takeBulletHit = function(){
    this.kill();
};
DragonShoot.prototype.canMoveObject = function(){
    return true;
};
DragonShoot.prototype.collectable = function(){
    return false;
};
DragonShoot.prototype.canMedusaSeeThroughThis = function(){
    return true;
};
DragonShoot.prototype.canSnowballGoThroughObject = function(){
    return false;
};
DragonShoot.prototype.isDead = function(){
    return false;
};

DragonShoot.prototype.update = function (du) {
    spatialManager.unregister(this);

    if(this._isDeadNow || this.lifeSpan<0) return entityManager.KILL_ME_NOW;
    this.lifeSpan -= du;
    // direction of the bullet same direction as the Viking
    // this.rotation +=1 * du;
    if (this.direction === 'right'){
        this.cx += this.velX * du;
    }
    if (this.direction === 'left'){
        this.currentSprite = g_sprites.dragonBall_toTheLeft[0];
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
        g_dragon_shoot.play();

        var canTakeHit = hitEntity.takeDragonHit;
        if (canTakeHit) {
            // stop drawing the bullet if there is a hit!
            this.takeBulletHit();
        } 
        var canTakeHit = hitEntity.isDead();
        if (canTakeHit) {
            hitEntity.changeSprite = true;

            // stop drawing the bullet if there is a hit!
            // this.takeBulletHit();
            hitEntity.isDead();
            hitEntity._isDeadNow = true;
            hitEntity.isFrozen = true;

        }
    }

    spatialManager.register(this);
};
DragonShoot.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
    ctx.globalAlpha = 1;
};