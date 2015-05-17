// =================
// KEYBOARD HANDLING
// =================

var g_keys = [];



// function traceEvent(e){
// $(".logs").prepend(jQuery("<li>").html(
//   "Key = " + e.keyCode
// ).fadeIn());

// console.log(e);
// }

// $(document).ready(function(){
//   	 document.addEventListener("keydown", function(e){
// 	 });

// 	// $("#buttons-generic").find("button").click(function(){
//  //    var eventObj = document.createEventObject ?
//  //      document.createEventObject() : document.createEvent("Events");
//  //    eventObj.keyCode = parseInt($(this).attr("data-key"));
// 	//   handleKeydown(eventObj);
// 	// });

// });


function handleKeydown(evt) {
    g_keys[evt.keyCode] = true;
    // console.log("Keycode:" + evt.keyCode);
};

function handleKeyup(evt) {
    g_keys[evt.keyCode] = false;
};

// Inspects, and then clears, a key's state
//
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
//
function eatKey(keyCode) {
    var isDown = g_keys[keyCode];
    // g_keys[keyCode] = false;
    return isDown;
};
function key(keyCode) {
    var isDown = g_keys[keyCode];
    g_keys[keyCode] = false;
    return isDown;
};

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);