"use strict";

var entityManager = {

_viking : [],
_medusa : [],
_sheep : [],

KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

deferredSetup : function () {
    this._categories = [this._viking, this._medusa, this._sheep];
},

init: function() {
},

generateViking : function(descr) {

    this._viking.push(new Viking(descr));
},

generateMedusa : function(descr) {

    this._medusa.push(new Medusa(descr));
},
generateSheep : function(descr) {

    this._sheep.push(new Sheep(descr));
},


update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {
            if (c === 1) {
                //We're dealing with a medusa, check if he sees the viking
                aCategory[i].seesViking(this._categories[0][0].cx,this._categories[0][0].cy);
            }
            if(c === 2){
                //We're checking the direction which the sheep should me looking at
                aCategory[i].lookingAtViking(this._categories[0][0].cx,this._categories[0][0].cy);
            }
            var status = aCategory[i].update(du);
            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            } else {
                ++i;
            }
        }
    }
},

render: function(ctx) {
    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {
        var aCategory = this._categories[c];
        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
        }
        debugY += 10;

    }

}
}
// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
