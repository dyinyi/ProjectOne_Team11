// lava.js

Lava.prototype = Object.create(Phaser.Sprite.prototype);
Lava.prototype.constructor = Lava;

function Lava(game, x, y, key, group) {
	Phaser.Sprite.call(this, game, x, y, key, group);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	
	this.anchor.setTo(0.5, 0.5);
	this.body.customSeparateX = true;
    this.body.customSeparateY = true;
	this.enableBody = true;
	this.body.immovable = true;
	this.playerLocked = false;

	game.add.existing(this);
}

Lava.prototype.addMotionPath = function (motionPath) {
	this.tweenX = this.game.add.tween(this.body);
    this.tweenY = this.game.add.tween(this.body);
    
    for (var i = 0; i < motionPath.length; i++) {
    	this.tweenX.to( { x: motionPath[i].x }, motionPath[i].xSpeed, motionPath[i].xEase);
        this.tweenY.to( { y: motionPath[i].y }, motionPath[i].ySpeed, motionPath[i].yEase);
    }
    
    this.tweenX.loop();
    this.tweenY.loop();
};

Lava.prototype.start = function () {
	this.tweenX.start();
    this.tweenY.start();
};

Lava.prototype.stop = function () {
	this.tweenX.stop();
	this.tweenY.stop();
};

function addLavas() {
    lava = new Lava(game, 400, 990, 'lava', this.lavas);
    lava.body.collideWorldBounds = true;
    lava.scale.set(1, 10);
    lava.addMotionPath([
    		{ x: "0", xSpeed: 2000, xEase: "Linear", y: "-350", ySpeed: 500, yEase: "Sine.easeOut" },
            { x: "0", xSpeed: 2000, xEase: "Linear", y: "+350", ySpeed: 500, yEase: "Sine.easeIn" }
    ]);
    lava.start();
    
    lava2 = new Lava(game, 800, 640, 'lava', this.lavas);
    lava2.body.collideWorldBounds = true;
    lava2.scale.set(1, 10);
    lava2.addMotionPath([
    		{ x: "0", xSpeed: 2000, xEase: "Linear", y: "+350", ySpeed: 500, yEase: "Sine.easeOut" },
            { x: "0", xSpeed: 2000, xEase: "Linear", y: "-350", ySpeed: 500, yEase: "Sine.easeIn" }
    ]);
    lava2.start();
    
    lava3 = new Lava(game, 600, 440, 'lava', this.lavas);
    lava3.body.collideWorldBounds = true;
    lava3.scale.set(2, 2);
    lava3.addMotionPath([
    		{ x: "+350", xSpeed: 2000, xEase: "Linear", y: "-350", ySpeed: 1000, yEase: "Sine.easeOut" },
            { x: "-350", xSpeed: 2000, xEase: "Linear", y: "+350", ySpeed: 1000, yEase: "Sine.easeOut" },
            { x: "-350", xSpeed: 2000, xEase: "Linear", y: "-350", ySpeed: 1000, yEase: "Sine.easeIn" },
            { x: "+350", xSpeed: 2000, xEase: "Linear", y: "+350", ySpeed: 1000, yEase: "Sine.easeIn" }
    ]);
    lava3.start();
}