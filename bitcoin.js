//bitcoin.js

var bitcoinID = 0;

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
	this.name = bitcoinID;
	bitcoinID += 1;
	bitcoinGroup.add(this);
	console.log("bitcoin created"+" " +value + " " +" ID:" + bitcoinID);
}

function pickUpCoin() {
	player.cash += this.value;
	console.log("bitcoin collected"+" " +this.value);
	this.destroy();
}

Bitcoin.prototype.update = function (){
	game.physics.arcade.overlap(this, player, Bitcoin.prototype.pickupcoin, null, this);
}