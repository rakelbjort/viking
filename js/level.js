var background_level01 = new Background({
    xBase: 32,
    yBase : 32,
    cellWidth : 64,
    cellHeight : 64,
    character : [
     
        ['-','-','-','-','-','-','-','=','-','-'],
        ['-','o','*','/','/','/','/','/','*','-'],
        ['-','/','/','/','/','/','/','/','/','-'],
        ['-','/','/','/','/','/','/','/','/','-'],
        ['-','/','/','#','/','/','/','/','s','-'],
        ['-','/','/','m','*','/','h','*','/','-'],
        ['-','/','/','#','/','/','/','/','/','-'],
        ['-','*','/','/','/','#','/','/','/','-'],
        ['-','*','*','/','!','/','*','*','h','-'],
        ['-','-','-','-','-','-','-','-','-','-']
    ]
});

var g_heartCollect =0;

var g_pause = { text : 'Press P to Play/Pause' };

g_pause.render = function (ctx) {
    ctx.save();    
    ctx.font = "bold 30px Arial";

    // Draws Pause-text in the middle of the canvas
    ctx.fillStyle="white";
    ctx.strokeStyle="black";
    ctx.textAlign = "center"; 
    ctx.fillText(g_pause.text, g_canvas.width/2, g_canvas.height/2);
    ctx.strokeText(g_pause.text, g_canvas.width/2, g_canvas.height/2);
    ctx.restore();
};