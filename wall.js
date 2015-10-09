// wall.js

function Wall(x, y, w, h) {
    wall =	game.add.tileSprite(x, y, w, h, 'wall');
    game.physics.arcade.enable(wall, Phaser.Physics.ARCADE);
    wall.body.collideWorldBounds = true;
    walls.add(wall);
	wall.body.immovable = true;
}

function drawWalls() {
	Wall(0, 1470, 258, 32);
	Wall(258, 1470, 32, 320);
	Wall(258, 1790, 64, 32);
	Wall(320, 1278, 32, 544);
	Wall(320, 1278, 640, 32);
	Wall(960, 1278, 32, 544);
	Wall(1088, 642, 32, 1280);
	Wall(130, 642, 960, 32);
	Wall(130, 546 , 32, 96);
	Wall(130, 546, 1184, 32);
	Wall(1314, 546, 32, 1408);
}