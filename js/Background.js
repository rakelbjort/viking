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

            // Make a Door
            if(this.character[bx][by]=== '=') {
                var door = new Door({
                    topRightX : this.xBase + (this.cellWidth*by),
                    topRightY : this.yBase + (this.cellHeight*bx),
                });
                door.render(ctx,door.topRightX,door.topRightY);            
            }      

            // Make a Tree      
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

Background.prototype.collidesWithWinningDoor = function (cx,cy) {
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

Background.prototype.collisionCheckDown = function (cx,cy) {
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length;by++) {
            if(this.character[bx][by] === '-' ||        // border
            this.character[bx][by] === 's' ||           // sheep
            this.character[bx][by] === 'm' ||           // medusa
            this.character[bx][by] === '*') {           // tree

                var nextCellX = Math.floor( (cx - this.xBase) / this.cellWidth) + by;
                var nextCellY = Math.floor( (cy - this.yBase) / this.cellHeight) + bx +1;

                if(this.character[nextCellY] === undefined) {
                    return 0;
                }
                if(this.character[nextCellY][nextCellX] === undefined) {
                    return 0;
                }

                if(this.character[nextCellY][nextCellX] ==='-' ||   // border
                this.character[nextCellY][nextCellX] ==='s' ||      // sheep
                this.character[nextCellY][nextCellX] ==='m' ||      // medusa
                this.character[nextCellY][nextCellX] ==='*') {      // tree
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

Background.prototype.collisionCheckUp= function (cx,cy) {
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length;by++) {
            if(this.character[bx][by] === '-' ||    // border
            this.character[bx][by] === 's' ||       // sheep
            this.character[bx][by] === 'm' ||       // medusa
            this.character[bx][by] === '=' ||       // door
            this.character[bx][by] === '*' &&       // tree
            background_level01.countingHeart() !== 0) {
                
                var nextCellX = Math.floor( (cx - this.xBase) / this.cellWidth) + by;
                var nextCellY = Math.floor( (cy - this.yBase) / this.cellHeight) - bx -1 ;

                if(this.character[nextCellY] === undefined) {
                    return 0;
                }
                if(this.character[nextCellY][nextCellX] === undefined) {
                    return 0;
                }                    

                if(this.character[nextCellY][nextCellX] === '-' ||  // border
                this.character[nextCellY][nextCellX] === 's' ||     // sheep
                this.character[nextCellY][nextCellX] === 'm' ||     // medusa
                this.character[nextCellY][nextCellX] === '*' ||     // tree
                this.character[nextCellY][nextCellX] === '='&&      // door
                background_level01.countingHearts() !== 0) {
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
Background.prototype.collisionCheckSides = function (cx,cy) {
    for(var bx = 0; bx < this.character.length; bx++) {
        for(var by = 0; by < this.character[bx].length;by++) {
            if(this.character[bx][by] === '-' ||    // border
                this.character[bx][by] === 's' ||   // sheep
                this.character[bx][by] === 'm' ||   // medusa
                this.character[bx][by] === '*') {   // tree
                //Check if the wall has a brick colliding with the next brick
                var nextCellX = Math.floor( (cx - this.xBase) / this.cellWidth) + by;
                var nextCellY = Math.floor( (cy - this.yBase) / this.cellHeight) + bx ;

                if(this.character[nextCellY] === undefined) {
                    return 0;
                }

                if(this.character[nextCellY][nextCellX] === undefined) {
                    return 0;
                }
                if(this.character[nextCellY][nextCellX] === '-' ||  // border
                    this.character[nextCellY][nextCellX] === 's' || // sheep
                    this.character[nextCellY][nextCellX] === 'm' || // medusa
                    this.character[nextCellY][nextCellX] === '*') { // tree
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

// Counts the hearts in the level
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