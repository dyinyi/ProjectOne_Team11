// access.js

function setupKey() {
	keys = game.add.group();
	keys.enableBody = true;
	//var key = keys.create(600, 1800, 'key');
	var endKey = keys.create(1500, 1880, 'key');
}

function setupDoor() {
	doors = game.add.group();
	doors.enableBody = true;
	door = doors.create(940, 1840, 'door');
	door.body.immovable = true;
}

function endDoor() {
	endDoors = game.add.group();
	endDoors.enableBody = true;
	var endDoor = endDoors.create(200, 1500, 'endDoor');
	endDoor.body.immovable = true;
	endDoor.scale.set(0.75, 0.75);
}

function killPlayer() {
	player.destroy();
	game.add.text(player.x, player.y, "GAME OVER",
		{ font: "30px Arial", fill: "#fff", align: "center" });
	game.time.events.add(Phaser.Timer.SECOND * 3, restart, this);
}

function restart() {
	game.state.restart();	
}

function setupSandBrick() {
	sandBricks = game.add.group();
	sandBricks.enableBody = true;
	sandBrick = sandBricks.create(1360, 1700, 'sandBrick');
	sandBrick.scale.setTo(2.3, 1);
	sandBrick.body.immovable = true;
	sandBrick.health = 10;
}

function destroyBrick(sandBrick, projectile) {
	sandBrick.damage(projectile.parent.power);
	projectile.destroy();
}

function collectKey(player, key) {
    key.kill();
    hasKey += 1;
}

function openDoor() {
	if (hasKey == 1) {
		doors.destroy();
	}
}

function openEndDoor() {
	if (hasKey == 1) {
		game.add.text(100, 1500, "LEVEL COMPLETE",
		{ font: "30px Arial", fill: "#fff", align: "center" });
		restart();
	}
}