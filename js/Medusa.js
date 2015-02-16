"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Medusa(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rememberResets();
    // Default sprite
    this.sprite = this.sprite || g_sprites.medusa[1];
    this.currentSprite = this.currentSprite ||g_sprites.medusa[1]
    this.angry = 0;
    this._scale = 1;
};

Medusa.prototype.setup = function (descr) {
    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
};

Medusa.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

// Updates the face og Medusa
Medusa.prototype.update = function (du) {
    if(this.angry === 1 ) {
        this.currentSprite = g_sprites.medusa[0];
    };
    if(this.angry === 0) {
        this.currentSprite = g_sprites.medusa[1];
    };
};

// If medusa sees the viking it gets angry
// called from entityManager
Medusa.prototype.seesViking = function(vikingCx, vikingCy) {
    if (vikingCx === this.cx || vikingCy === this.cy){
        this.angry =1;
        if (this.isVikingSafe(vikingCx, vikingCy) === true){
        };
        if (this.isVikingSafe(vikingCx, vikingCy) === false){
            g_main.gameOver();
        };
    } 
    else {
        this.angry =0;
    }
};

// Checks if there is a block between Medusa and the Viking
// Later will check for sheep and other objects
Medusa.prototype.isVikingSafe = function(vikingCx, vikingCy){
    var topRightCx;
    var topRightCy;
    var isSafe = false;
    for(var bx = 0; bx < background_level01.character.length; bx++) {
        for(var by = 0; by < background_level01.character[bx].length; by++) {
            if(background_level01.character[bx][by]=== '#') {
                //Find the coords for the blocks to compare to the Viking and Medusa
                topRightCx = background_level01.xBase + (background_level01.cellWidth*by);
                topRightCy = background_level01.yBase + (background_level01.cellHeight*bx);
                
                // Check X
                if ((this.cx === topRightCx) &&
                (topRightCx === vikingCx)){
                    if((this.cy < topRightCy) &&
                    (topRightCy < vikingCy) 
                    ||
                    (vikingCy < topRightCy) &&
                    (topRightCy< this.cy)
                    ){
                        isSafe= true;
                    }
                }
                // Check Y
                else if ( (this.cy === topRightCy) &&
                    (topRightCy === vikingCy)){
                    if((this.cx > topRightCx)&&
                        (topRightCx > vikingCx) ||
                        (vikingCx > topRightCx) &&
                        (topRightCx >this.cx)
                        ){
                        isSafe =true;
                    }  
                }  
            }
        }
    }
    return isSafe;
}

Medusa.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    var origScale = 1;
    this.currentSprite.scale = 1;
    this.currentSprite.drawCentredAt(ctx,this.cx,this.cy, this.rotation);
    this.currentSprite.scale = origScale;

};