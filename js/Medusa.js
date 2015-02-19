"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Medusa(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    // Default sprite
    this.sprite = this.sprite || g_sprites.medusa[1];
    this.currentSprite = this.currentSprite ||g_sprites.medusa[1]
    this.angry = 0;
    this._scale = 1;
    this.currentLevel = background_level01;

};

Medusa.prototype = new Entity();

Medusa.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};
// Updates the face og Medusa
Medusa.prototype.update = function (du) {
    spatialManager.unregister(this);
    if(this.angry === 1 ) {
        this.currentSprite = g_sprites.medusa[0];
    };
    if(this.angry === 0) {
        this.currentSprite = g_sprites.medusa[1];
    };
    spatialManager.register(this);
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

// Checks if there is an object between Medusa and the Viking
// They can't shoot through rocks, blocks, hearts, or other monsters though.
Medusa.prototype.isVikingSafe = function(vikingCx, vikingCy){
    var topRightCx;
    var topRightCy;
    var isSafe = false;
    for(var bx = 0; bx < this.currentLevel.character.length; bx++) {
        for(var by = 0; by < this.currentLevel.character[bx].length; by++) {
            if(this.currentLevel.character[bx][by]=== '#'||    // block
            this.currentLevel.character[bx][by]=== 's' ||      // sheep
            this.currentLevel.character[bx][by]=== 'h') {      // heart
                //Find the coords for the objects to compare to the Viking and Medusa
                topRightCx = this.currentLevel.xBase + (this.currentLevel.cellWidth*by);
                topRightCy = this.currentLevel.yBase + (this.currentLevel.cellHeight*bx);
                
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