// pause.js

// functions to implement pausing and unpausing the game

function gamePause() {
    if (pauseInput.isDown) {
        game.paused = true;
        menu = game.add.sprite(game.camera.x, game.camera.y, 'menu');
    }
}

function gameUnpause(event) {
    if(game.paused){
        var x1 = 500 - 270/2, x2 = 500 + 270/2;
        var y1 = 300 - 180/2, y2 = 300 + 180/2;

        menu.destroy();
        game.paused = false;
    }
}