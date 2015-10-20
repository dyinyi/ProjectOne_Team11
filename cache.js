// cache.js

// Weapon values: bullets (0), rockets (1), laser (2), 
//				  multi bullets (3), multi laser (4),
//				  nukes (5)

Cache.prototype = Object.create(Phaser.Sprite.prototype);
Cache.prototype.constructor = Cache;

function Cache(game, x, y, sprite, weaponVal, directions) {
    
    Phaser.Sprite.call(this, game, x, y, sprite);
    this.scale.setTo(0.5,0.5);
    this.anchor.setTo(0.5,0.5);
    this.val = weaponVal;
    this.directions = directions;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);

}

Cache.prototype.update = function() {

	// check for player/cache overlap
	game.physics.arcade.overlap(player,this,retrieved,null,this);

}

function retrieved(player, barrel) {

	player.weaponsCaches[barrel.val] = true;

	barrel.kill(); // remove barrel

	var howTo = game.add.text(player.x, player.y - 50, barrel.directions,
						 { font: "20px Arial", fill: "red", align: "center" });

	game.time.events.add(Phaser.Timer.SECOND * 3, howTo.kill, howTo);
}

function addCaches() {
	// bullets/pokeball
	var directions = "Press the `/~ key\nand click to\nfire bullets";
	poke_barrel = new Cache(game,200,200,'poke_barrel',0,directions);
	
	// bombs
	directions = "Press the '1' key\nand click to\nfire homing bombs";
	bomb_barrel = new Cache(game,2400,600,'bomb_barrel',1,directions);

	/*// laser
	directions = "Press the '2' key\nand click to\nfire the laser";
	laser_barrel = new Cache(game,184,477,'laser_barrel',2,directions);*/

	// multi bullets/tomatoes
	directions = "Press the '3' key\nand click to \nfire tomato bullets";
	tomato_barrel = new Cache(game,500,1700,'tomato_barrel',3,directions);

	/*// multi laser/blueBall
	directions = "Press the '4' key\nand click to \nfire the ultra laser";
	blueBall_barrel = new Cache(game,1701,1408,'blueBall_barrel',4,directions);

	// nuke
	directions = "Press SPACEBAR to \nfire a nuke";
	nuke_barrel = new Cache(game,128,1765,'nuke_barrel',5,directions);*/
}