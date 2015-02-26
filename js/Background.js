function Background(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Background.prototype.update = function(du) {

// }
// // Calls the render function for each brick in the wall
// Background.prototype.render = function (ctx) {

// }

// Door is closed  
var openDoor = false ;

Background.prototype.treasureOpen= function () {
    //if called from entityManager then we open the door
    openDoor = true;
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
