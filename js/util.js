// =====
// UTILS
// =====


function clearCanvas(ctx) {

    ctx.drawImage(g_background, 0, 0, ctx.canvas.width, ctx.canvas.height);
}


function renderPauseText(ctx) {
    if (g_isUpdatePaused) {
        g_pause.render(ctx); 
    }
}
var util ={
square: function(x) {
    return x*x;
},
distSq: function(x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
}
}