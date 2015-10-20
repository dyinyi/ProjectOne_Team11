// access.js

function setupKey() {
	keys = game.add.group();
	keys.enableBody = true;
	var key = keys.create(2180, 356, 'key');
	key.scale.setTo(0.08,0.08);
}

function changeBackground() {
	background.kill();
}

function firstDoor() {
	firstDoors = game.add.group();
	firstDoors.enableBody = true;
	var firstDoor = firstDoors.create(1268, 870, 'firstDoor');
	firstDoor.body.immovable = true;
	firstDoor.scale.set(0.15, 0.15);
}

function killPlayer() {
	player.kill();
	game.add.text(player.x, player.y, "GAME OVER",
		{ font: "30px Arial", fill: "#fff", align: "center" });
	game.time.events.add(Phaser.Timer.SECOND * 3, restart, this);
}

function restart() {
	game.state.restart();
	setupKey();
}

function collectKey(player, key) {
    key.kill();
    hasKey += 1;
}

function openDoor() {
	if (hasKey == 1) {
		firstDoors.destroy();
	}
}

function openEndDoor() {
	if (hasKey == 1) {
		game.add.text(100, 1500, "LEVEL COMPLETE",
		{ font: "30px Arial", fill: "#fff", align: "center" });
		restart();
	}
}
