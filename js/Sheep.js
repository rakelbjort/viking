"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Sheep(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.sheep[0];
    this.currentSprite = this.currentSprite ||g_sprites.sheep[0]
    this._scale = 1;
    this.lookingDirection=0;
    this.moveable = false;
};

Sheep.prototype = new Entity();
Sheep.prototype.lifeSpan = 1500 / NOMINAL_UPDATE_INTERVAL;
Sheep.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Sheep.prototype.takeBulletHit = function(){
    this.kill();
}
Sheep.prototype.update = function (du) {
    spatialManager.unregister(this);
    //has it been shot
    if(this.moveable){
        // decrease lifeSpan of the snowball
        this.lifeSpan -= du;
        if (this.lifeSpan < 0) {
            this.resetSheep();
        }
    }

    // Sheep looks left
    if(this.lookingDirection === 0 ) {
        this.currentSprite = g_sprites.sheep[0];
    };
    //Sheep looks right
    if(this.lookingDirection === 1) {
        this.currentSprite = g_sprites.sheep[1];
    };    
    //Sheep looks up
    if(this.lookingDirection === 2) {
        this.currentSprite = g_sprites.sheep[2];
    };      
    //Sheep looks down
    if(this.lookingDirection === 3) {
        this.currentSprite = g_sprites.sheep[3];
    };
    if(this._isDeadNow) {
        this.currentSprite = g_sprites.snowball[0];
        this.moveable = true;
    }
    spatialManager.register(this);
};

Sheep.prototype.resetSheep = function(){
    this._isDeadNow = false;
    this.currentSprite = g_sprites.sheep[0];
    this.moveable = false;
    this.lifeSpan = 1500 / NOMINAL_UPDATE_INTERVAL;
}
// called from entityManager
Sheep.prototype.lookingAtViking = function(vikingCx, vikingCy) {
    // looks right
    if (vikingCx > this.cx && vikingCy === this.cy){
        this.lookingDirection=1;
    }
    // looks left
    if(vikingCx<= this.cx && vikingCy === this.cy){
        this.lookingDirection =0;
    }
    // looks down
    if (vikingCy > this.cy){
        this.lookingDirection = 3;
    }
    // looks up
    if (vikingCy < this.cy){
        this.lookingDirection =2;
    }
}

Sheep.prototype.render = function (ctx) {
    if (this.moveable){
        var fadeThresh = Sheep.prototype.lifeSpan / 3;


        if (this.lifeSpan < fadeThresh) {
            ctx.globalAlpha = this.lifeSpan / fadeThresh;

        }


    }
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
    ctx.globalAlpha = 1;

};

