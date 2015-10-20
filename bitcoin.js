//bitcoin.js

Bitcoin.prototype = Object.create(Phaser.Sprite.prototype);
Bitcoin.prototype.constructor = Bitcoin;
Bitcoin.prototype.pickupcoin = pickUpCoin;

function Bitcoin(game, x, y, value) {
	Phaser.Sprite.call(this, game, x, y, 'coin');
	this.scale.setTo(0.025,0.025);
	this.anchor.setTo(0.5,0.5);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	game.add.existing(this);
	this.value = value;
	bitcoinGroup.add(this);
}

function pickUpCoin() {
	player.cash += this.value;
	this.destroy();
	player.health += 10;
	coinFX.play();
}

Bitcoin.prototype.update = function() {
	game.physics.arcade.overlap(this, player, Bitcoin.prototype.pickupcoin, null, this);
}

// dogecoin lol
Dogecoin.prototype = Object.create(Phaser.Sprite.prototype);
Dogecoin.prototype.constructor = Dogecoin;
Dogecoin.prototype.pickupdogecoin = pickUpDogeCoin;

function Dogecoin(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'dogecoin');
	this.scale.setTo(0.5,0.5);
	this.anchor.setTo(0.5,0.5);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	game.add.existing(this);
	bitcoinGroup.add(this);
}

Dogecoin.prototype.update = function() {
	game.physics.arcade.overlap(this, player, Dogecoin.prototype.pickupdogecoin, null, this);
}

function pickUpDogeCoin() {
	win();
	this.kill();
}

// Win situations
function win () {
    //  You Win!
    gameEndText = game.add.text(0,0, "YOU WIN!!!",
        { font: "100px Arial", fill: "#fff", align: "center" });
    gameEndText.fixedToCamera = true;
    gameEndText.cameraOffset.setTo(300,300);
    game.time.events.add(Phaser.Timer.SECOND * 5, restart, this);
}





