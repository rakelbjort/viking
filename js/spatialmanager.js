/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    return this._nextSpatialID++;
    // TODO: YOUR STUFF HERE!

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    
    this._entities[spatialID] = entity;
    // TODO: YOUR STUFF HERE!
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    this._entities[spatialID] = undefined;

},

//-----------------------------
// Medusa Kill Check for Objects
// in line with Medusa
//-----------------------------


findEntityInLineAbove : function (posX,posY){
    // all objects in
    var objects = [];
    var shortestDistance = 0;
    var shortestObject;

    for(var ID in this._entities){
        if (this._entities[ID] != null){
            var e = this._entities[ID];
                if ((e.cx === posX || (e.cx + e.sprite.height/2) === posX || (e.cx - e.sprite.height/2) === posX) 
                    && e.cy < posY && e.canMedusaSeeThroughThis() === false){
                        objects.push(e);
                }  
        }
    }

    for (var i = 0; i< objects.length; i++){
        if(objects[i].cy > shortestDistance){
            shortestDistance = objects[i].cy;
            shortestObject = objects[i];
        }
    }

    return shortestObject;

},
findEntityInLineDown : function (posX,posY){
    var objects = [];
    var shortestDistance = 1000;
    var shortestObject;
    for(var ID in this._entities){
        if (this._entities[ID] != null){
            var e = this._entities[ID];
                if ((e.cx === posX ||  
                    (e.cx + e.sprite.height/2) === posX ||
                    (e.cx - e.sprite.height/2) === posX) && 
                    e.cy > posY && e.canMedusaSeeThroughThis() === false){
                        objects.push(e);
                }  
        }
    }
    for (var i = 0; i< objects.length; i++){
        if(objects[i].cy < shortestDistance){
            shortestDistance = objects[i].cy;
            shortestObject = objects[i];
        }
    }
    return shortestObject;

},

findEntityInSameLineRightForDragon : function (posX,posY){
    var objects = [];
    var shortestDistance = 1000;
    var shortestObject;
    for(var ID in this._entities){
        if (this._entities[ID] != null){
            var e = this._entities[ID];
                if ((e.cy === posY )
                    && e.cx > posX && e.canMedusaSeeThroughThis() === true){
                    objects.push(e);
                }  
        }
    }
    for (var i = 0; i< objects.length; i++){
        if(objects[i].cx <  shortestDistance){
            shortestDistance = objects[i].cx;
            shortestObject = objects[i];
        }
    }
    return shortestObject;


},

findEntityInLineRight : function (posX,posY){
    var objects = [];
    var shortestDistance = 1000;
    var shortestObject;
    for(var ID in this._entities){
        if (this._entities[ID] != null){
            var e = this._entities[ID];
                if ((e.cy === posY || (e.cy + e.sprite.height/2) === posY || (e.cy - e.sprite.height/2) === posY) 
                    && e.cx > posX && e.canMedusaSeeThroughThis() === false){
                    objects.push(e);
                }  
        }
    }
    for (var i = 0; i< objects.length; i++){
        if(objects[i].cx <  shortestDistance){
            shortestDistance = objects[i].cx;
            shortestObject = objects[i];
        }
    }
    return shortestObject;

},

findEntityInLineLeft : function (posX,posY){
    var objects = [];
    var shortestDistance = 0;
    var shortestObject;
    for(var ID in this._entities){
        if (this._entities[ID] != null){
            var e = this._entities[ID];
                if ((e.cy === posY || (e.cy + e.sprite.height/2) === posY || (e.cy - e.sprite.height/2) === posY)  
                    && e.cx < posX && e.canMedusaSeeThroughThis() === false){
                        objects.push(e);
                }  
        }
    }
    for (var i = 0; i< objects.length; i++){
        if(objects[i].cx >  shortestDistance){
            shortestDistance = objects[i].cx;
            shortestObject = objects[i];
        }
    }
    return shortestObject;

},


//-----------------------------
// For collision check
//-----------------------------


findEntityInRange: function(posX, posY, radius) {
    for(var ID in this._entities){
        if (this._entities[ID] != null){
            var e = this._entities[ID];
            var radii = Math.pow((e.getRadius() + radius),2);
            var distance = util.distSq(e.cx, e.cy, posX, posY);
            if(distance<radii){
                return e;
            }
        }

    }
},
}




