"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Door(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.door[0];
    this.currentSprite = this.currentSprite || g_sprites.door[0];
    this.doorOpened = 0;
};

Door.prototype = new Entity();


Door.prototype.update = function (du) {
    if (this.doorOpened ===1){
        this.currentSprite = g_sprites.door[1];
    }
};

// Opens the door
// Called from entityManager
Door.prototype.openDoor = function(){
    this.doorOpened =1;
}

Door.prototype.render = function (ctx) {

    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
    this.currentSprite.scale = origScale;
};

