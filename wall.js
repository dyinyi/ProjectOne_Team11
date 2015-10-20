function Wall(x, y, w, h) {
    wall =	game.add.tileSprite(x, y, w, h, 'wall');
    game.physics.arcade.enable(wall, Phaser.Physics.ARCADE);
    wall.body.collideWorldBounds = true;
    walls.add(wall);
	wall.body.immovable = true;
	//wall.scale.setTo(0.5,0.5);
}

function drawWalls() {
	Wall(0,320,2240,32);
	Wall(2240,320,32,480);
	Wall(160,960,2480,32);
	Wall(320,960,32,576);
	Wall(320,1536,256,32);
	Wall(640,1536,32,288);
	Wall(960,1280,32,448);
	Wall(960,1824,32,96);
	Wall(480,1280,480,32);
	Wall(1440,992,32,832);
	Wall(1280,352,32,512);
	Wall(320,1568,32,256);
	Wall(672,1600,288,32);
	Wall(352,1792,288,32);
	Wall(2610,992,32,900);
	Wall(1600,1890,1038,32);
}

function Block(x, y, w, h) {
    block =	game.add.tileSprite(x, y, w, h, 'sandbrick');
    game.physics.arcade.enable(block, Phaser.Physics.ARCADE);
    block.body.collideWorldBounds = true;
    blocks.add(block);
	block.body.immovable = false;
	block.body.checkCollision.left = false;
}

function drawBlocks() {   
	Block(640,1888,320,96);
}