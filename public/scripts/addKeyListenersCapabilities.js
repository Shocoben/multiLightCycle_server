define(function(){
	var addKeyListeners = function (o) {
        o.keysDown = {};

        if(!o.onKeyDown){
            o.onKeyDown=function(){};    
        }
        if(!o.onKeyUp){
            o.onKeyUp=function(){};
        }

        addEventListener("keydown", function (e) {
            o.keysDown[e.keyCode] = true;
            o.onKeyDown(e);
        }, false);

        addEventListener("keyup", function (e) {
            delete o.keysDown[e.keyCode];
            o.onKeyUp(e);
        }, false);
    };

    return addKeyListeners;
});