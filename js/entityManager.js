"use strict";

var entityManager = {

_levelSwitch : [],
_viking : [],
_medusa : [],
_sheep : [],
_treasure_box : [],
_door : [],
_bullet : [],
_killShot: [],
_border:[],
_tree:[],
_heart:[],
_block:[],
_water: [],
_bridge :[],
_mountain :[],
_lundi : [],
_dragon : [],
_dragonShoot : [],

KILL_ME_NOW : -1,

// Viking can shoot bullets
fireBullet: function(cx, cy,direction) {
    this._bullet.push(new Bullet({
        cx   : cx,
        cy   : cy,
        direction:direction,

    }));
},

// Medusa has the kill stare
fireKillStare: function(cx, cy,direction) {
    this._killShot.push(new KillShot({
        cx   : cx,
        cy   : cy,
        direction:direction,

    }));
},

// Medusa has the kill stare
dragonFire: function(cx, cy,direction) {
    this._dragonShoot.push(new DragonShoot({
        cx   : cx,
        cy   : cy,
        direction:direction,

    }));
},


_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

deferredSetup : function () {
    this._categories = [
    this._medusa, this._bridge, this._water, this._treasure_box, 
    this._door,this._bullet , this._block, this._border, 
    this._tree, this._heart, this._sheep, this._dragonShoot, this._dragon, this._viking, 
    this._killShot, this._mountain, this._lundi,this._levelSwitch];
},

init: function() {
},
generateLevelSwitch : function(descr) {
    this._levelSwitch.push(new LevelSwitch(descr));
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
generateTreasureBox : function(descr) {
    this._treasure_box.push(new Treasure_Box(descr));
},
generateDoor : function(descr) {
    this._door.push(new Door(descr));
},
generateBorder : function(descr) {
    this._border.push(new Border(descr));
},
generateTree : function(descr) {
    this._tree.push(new Tree(descr));
},
generateHeart : function(descr) {
    this._heart.push(new Heart(descr));
},
generateBlock : function(descr) {
    this._block.push(new Block(descr));
},
generateWater : function(descr) {
    this._water.push(new Water(descr));
},
generateBridge : function(descr) {
    this._bridge.push(new Bridge(descr));
},
generateMountain : function(descr) {
    this._mountain.push(new Mountain(descr));
},
generateLundi : function(descr) {
    this._lundi.push(new Lundi(descr));
},
generateDragon : function(descr) {
    this._dragon.push(new Dragon(descr));
},
killEverything : function(descr){

    for (var a = 0 ; a< this._tree.length ; a++){
         spatialManager.unregister(this._tree[a]);
    };
    for (var a = 0 ; a< this._border.length ; a++){
         spatialManager.unregister(this._border[a]);
    };
    for (var a = 0 ; a< this._block.length ; a++){
         spatialManager.unregister(this._block[a]);
    };
    for (var a = 0 ; a< this._mountain.length ; a++){
         spatialManager.unregister(this._mountain[a]);
    };
    for (var a = 0 ; a< this._water.length ; a++){
         spatialManager.unregister(this._water[a]);
    }; 
    for (var a = 0 ; a< this._heart.length ; a++){
         spatialManager.unregister(this._heart[a]);
    };
    for (var a = 0 ; a< this._lundi.length ; a++){
         spatialManager.unregister(this._lundi[a]);
    };       
    for (var a = 0 ; a< this._medusa.length ; a++){
         spatialManager.unregister(this._medusa[a]);
    };     
    for (var a = 0 ; a< this._sheep.length ; a++){
         spatialManager.unregister(this._sheep[a]);
    };  
    for (var a = 0 ; a< this._bullet.length ; a++){
         spatialManager.unregister(this._bullet[a]);
    };     
    for (var a = 0 ; a< this._killShot.length ; a++){
         spatialManager.unregister(this._killShot[a]);
    }; 
    for (var a = 0 ; a< this._dragon.length ; a++){
         spatialManager.unregister(this._dragon[a]);
    }; 
    for (var a = 0 ; a< this._dragonShoot.length ; a++){
         spatialManager.unregister(this._dragonShoot[a]);
    }; 
    for (var a = 0 ; a< this._bridge.length ; a++){
         spatialManager.unregister(this._bridge[a]);
    };  
    spatialManager.unregister(this._viking[0]);
    spatialManager.unregister(this._door[0]);
    spatialManager.unregister(this._treasure_box[0]);

    this._viking.splice(0,this._viking.length);
    this._border.splice(0,this._border.length);
    this._tree.splice(0,this._tree.length);
    this._block.splice(0,this._block.length);
    this._mountain.splice(0,this._mountain.length);
    this._water.splice(0,this._water.length);
    this._bridge.splice(0,this._bridge.length);
    this._treasure_box.splice(0,this._treasure_box.length);
    this._door.splice(0,this._door.length);    
    this._heart.splice(0,this._heart.length);
    this._lundi.splice(0,this._lundi.length);
    this._medusa.splice(0,this._medusa.length);
    this._sheep.splice(0,this._sheep.length);
    this._bullet.splice(0,this._bullet.length);
    this._killShot.splice(0,this._killShot.length);
    this._dragon.splice(0,this._dragon.length);
    this._dragonShoot.splice(0,this._dragonShoot.length);
    g_isUpdatePaused= false;
},


update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {
            // medusa
            if (c === 0) {
                if(this._categories[3][0].takeTreasure()){
                    aCategory[i].dissapear();
                }
                //We're dealing with a medusa, check if he sees the viking
                aCategory[i].seesViking(this._categories[13][0].cx,this._categories[13][0].cy);
            }
            //sheep
            if(c === 10){
                if(this._categories[3][0].takeTreasure()){
                    aCategory[i].dissapear();
                }
                if((this._categories[13][0].cx === aCategory[i].cx) && (this._categories[13][0].cy === aCategory[i].cy)){
                    aCategory[i].isCollidingWithViking = true;
                }
                else {
                    aCategory[i].isCollidingWithViking = false;
                }
                //We're checking the direction which the sheep should me looking at
                aCategory[i].lookingAtViking(this._categories[13][0].cx,this._categories[13][0].cy);

            }
            // door         
            if(c === 4){
                // We're checking if the door should open
                // First if the treasure has been collected
                if(this._categories[3][0].takeTreasure()){
                    aCategory[i].openDoor();
                }
            }
            // Lundi
            if(c===16){
                if(this._categories[3][0].takeTreasure()){
                    aCategory[i].dissapear();
                }
            }
            // dragon
            if(c===12){
                aCategory[i].seesViking(this._categories[13][0].cx,this._categories[13][0].cy);
                if(this._categories[3][0].takeTreasure()){
                    aCategory[i].dissapear();
                }
                if((this._categories[13][0].cx === aCategory[i].cx) && (this._categories[13][0].cy === aCategory[i].cy)){
                    aCategory[i].isCollidingWithViking = true;
                }
                else aCategory[i].isCollidingWithViking = false;
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
