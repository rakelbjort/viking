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