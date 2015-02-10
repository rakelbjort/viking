function Background(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Background.prototype.update = function(ctx) {
}

// Calls the render function for each brick in the wall
Background.prototype.render = function (ctx) {
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length; by++) {

            // Make Hearts
            if(this.character[bx][by]=== 'h') {
                var heart = new Heart({
                    topRightX : this.xBase + (this.cellWidth*by),
                    topRightY : this.yBase + (this.cellHeight*bx),
                });
                heart.render(ctx,heart.topRightX,heart.topRightY);            
            }

            // Make Borders
            if(this.character[bx][by]=== '-') {
                var border = new Border({
                    topRightX : this.xBase + (this.cellWidth*by),
                    topRightY : this.yBase + (this.cellHeight*bx),
                });
                border.render(ctx,border.topRightX,border.topRightY);            
            }

            // Make Trees      
            if(this.character[bx][by]=== '*') {
                var tree = new Tree({
                    topRightX : this.xBase + (this.cellWidth*by),
                    topRightY : this.yBase + (this.cellHeight*bx),
                });
                tree.render(ctx,tree.topRightX,tree.topRightY);            
            }           

        }
    }
}

// Door is closed  
var openDoor = false ;

Background.prototype.treasureOpen= function () {
    //if called from entityManager then we open the door
    openDoor = true;
}

// ================
// Collision Check
// ================

// Checks for objects in the level
Background.prototype.firstCheck = function (){
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length;by++) {
            if(
            this.character[bx][by] === '-' ||           // border
            this.character[bx][by] === 's' ||           // sheep
            this.character[bx][by] === 'm' ||           // medusa
            this.character[bx][by] === '*' ||           // tree

            this.character[bx][by] === 'o' &&           // treasure box and 
            background_level01.countingHearts() !==0){
                return true;
            }
        }
    }
}

// Checks for objects in the next X and Y cell
Background.prototype.secondCheck = function(nextCellX,nextCellY){
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length;by++){
            if(
            this.character[nextCellY][nextCellX] ==='-' ||      // border
            this.character[nextCellY][nextCellX] ==='s' ||      // sheep
            this.character[nextCellY][nextCellX] ==='m' ||      // medusa
            this.character[nextCellY][nextCellX] ==='*' ||      // tree

            this.character[nextCellY][nextCellX] ==='o' &&      // treasure box and
            background_level01.countingHearts() !==0) {
                    return true;
            }
        }
    }
}

// Checks if the viking is colliding with objects when he is moving down
Background.prototype.collisionCheckDown = function (cx,cy) {
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length;by++) {
            if(this.firstCheck) { 
                var nextCellX = Math.floor( (cx - this.xBase) / this.cellWidth) + by;
                var nextCellY = Math.floor( (cy - this.yBase) / this.cellHeight) + bx +1;

                if(this.character[nextCellY] === undefined) {
                    return 0;
                }
                if(this.character[nextCellY][nextCellX] === undefined) {
                    return 0;
                }

                if(this.secondCheck(nextCellX,nextCellY)) {         // have not collected all hearts

                    if ((cy + (this.cellHeight*bx) >= (this.yBase + (nextCellY-1)*this.cellHeight)) && 
                    (cy + (this.cellHeight*bx)<= (this.yBase + ((nextCellY)*this.cellHeight)))) {
                        return 1;
                    }                    
                } 
                else return;
            }
        }
    }
} 


// Checks if the viking is colliding with objects when he is moving up
Background.prototype.collisionCheckUp= function (cx,cy) {
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length;by++) {
            if(this.firstCheck) { // have not collected all hearts
                
                var nextCellX = Math.floor( (cx - this.xBase) / this.cellWidth) + by;
                var nextCellY = Math.floor( (cy - this.yBase) / this.cellHeight) - bx -1 ;

                if(this.character[nextCellY] === undefined) {
                    return 0;
                }
                if(this.character[nextCellY][nextCellX] === undefined) {
                    return 0;
                }                    

                if(this.secondCheck(nextCellX,nextCellY)) {         

                    if((cx + (this.cellWidth*by) >= (this.xBase + ((nextCellX-1)*this.cellWidth))) && 
                       (cx + (this.cellWidth*by) <= (this.xBase + ((nextCellX)*this.cellWidth)))) {
                        return 1;
                    }                
                } 
                else return; 
            }
        }
    }
}    
  
// Checks if the viking is colliding with objects when he is moving to the sides
Background.prototype.collisionCheckSides = function (cx,cy) {
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length;by++) {
            if(this.firstCheck) { // have not collected all hearts

                var nextCellX = Math.floor( (cx - this.xBase) / this.cellWidth) + by;
                var nextCellY = Math.floor( (cy - this.yBase) / this.cellHeight) + bx ;

                if(this.character[nextCellY] === undefined) {
                    return 0;
                }

                if(this.character[nextCellY][nextCellX] === undefined) {
                    return 0;
                }
                if(this.secondCheck(nextCellX,nextCellY)) {    

                    if((cx + (this.cellWidth*by) >= (this.xBase + ((nextCellX-1)*this.cellWidth))) && 
                       (cx + (this.cellWidth*by) <= (this.xBase + ((nextCellX)*this.cellWidth)))) {
                        return 1;
                    }                
                } 
                else return; 
            }
        }
    }
} 

// Checks if the viking is colliding with a heart, if so 
// add it to the g_heartCollect
Background.prototype.collidesWithHeart = function (cx,cy) {
    var topRightCx;
    var topRightCy;
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length; by++) {
            if(this.character[bx][by]=== 'h') {
                topRightCx = this.xBase + (this.cellWidth*by);
                topRightCy = this.yBase + (this.cellHeight*bx);
                if(cy === topRightCy && cx === topRightCx) {
                    // If Viking collides with heart 'h', then make it a grass '/''
                    this.character[bx][by]='/';
                    g_heartCollect +=1;
                    return true;
                }  
            }
        }
    }
}

// Checks if viking is colliding with an OPEN treasure box
// and collecting the treasure
// called from Viking.js
Background.prototype.collectTreasure = function (cx,cy) {
    var topRightCx;
    var topRightCy;
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length; by++) {
            if(this.character[bx][by]=== 'o') {
                topRightCx = this.xBase + (this.cellWidth*by);
                topRightCy = this.yBase + (this.cellHeight*bx);
                if(cy === topRightCy && cx === topRightCx) {
                    return 1;
                }   
            }
        }
    }
} 

// Checks if viking is at the OPEN door (after treasure has been collected)
// called from Viking.js
Background.prototype.goToOpenDoor = function (cx,cy) {
    var topRightCx;
    var topRightCy;
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length; by++) {
            if(this.character[bx][by]=== '=') {
                topRightCx = this.xBase + (this.cellWidth*by);
                topRightCy = this.yBase + (this.cellHeight*bx);
                if(cy === topRightCy && cx === topRightCx) {
                    return 1;
                }   
            }
        }
    }
} 

// ================
// Counting Hearts
// ================


// Counts the hearts in the level
// Updates when viking collides with hearts
Background.prototype.countingHearts = function(){
    var countingHeart =0 ;
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length; by++) {
            if(this.character[bx][by]=== 'h') {
                ++countingHeart;
            }
        }
    }
    return countingHeart;
};
