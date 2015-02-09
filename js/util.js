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

