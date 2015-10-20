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
    lava = new Lava(game, 0, 1248, 'lava', this.lavas);
    lava.body.collideWorldBounds = true;
    lava.scale.set(0.3,0.3);
    lava.addMotionPath([
    		{ x: "+320", xSpeed: 1000, xEase: "Linear", y: "0", ySpeed: 0, yEase: "Linear" },
            { x: "-320", xSpeed: 500, xEase: "Linear", y: "0", ySpeed: 0, yEase: "Linear" }
    ]);
    lava.start();
    
    lava2 = new Lava(game, 288, 1536, 'lava', this.lavas);
    lava2.body.collideWorldBounds = true;
    lava2.scale.set(0.3,0.3);
    lava2.addMotionPath([
    		{ x: "-320", xSpeed: 500, xEase: "Linear", y: "0", ySpeed: 0, yEase: "Linear" },
            { x: "+320", xSpeed: 1000, xEase: "Linear", y: "0", ySpeed: 0, yEase: "Linear" }
    ]);
    lava2.start();
    
    lava3 = new Lava(game, 700, 270, 'lava', this.lavas);
    lava3.body.collideWorldBounds = true;
    lava3.scale.set(0.5, 0.5);
    lava3.addMotionPath([
    		{ x: "+270", xSpeed: 2000, xEase: "Linear", y: "-270", ySpeed: 1000, yEase: "Linear" },
            { x: "-270", xSpeed: 2000, xEase: "Linear", y: "+270", ySpeed: 1000, yEase: "Linear" }
    ]);
    lava3.start();
    
    lava4 = new Lava(game, 960, 0, 'lava', this.lavas);
    lava4.body.collideWorldBounds = true;
    lava4.scale.set(0.5,0.5);
    lava4.addMotionPath([
    		{ x: "-270", xSpeed: 2000, xEase: "Linear", y: "+270", ySpeed: 1000, yEase: "Linear" },
            { x: "+270", xSpeed: 2000, xEase: "Linear", y: "-270", ySpeed: 1000, yEase: "Linear" }
    ]);
    lava4.start();
    
    lava5 = new Lava(game, 1480, 270, 'lava', this.lavas);
    lava5.body.collideWorldBounds = true;
    lava5.scale.set(0.5,0.5);
    lava5.addMotionPath([
    		{ x: "+270", xSpeed: 2000, xEase: "Linear", y: "-270", ySpeed: 1000, yEase: "Linear" },
            { x: "-270", xSpeed: 2000, xEase: "Linear", y: "+270", ySpeed: 1000, yEase: "Linear" }
    ]);
    lava5.start();
    
    lava6 = new Lava(game, 1740, 0, 'lava', this.lavas);
    lava6.body.collideWorldBounds = true;
    lava6.scale.set(0.5,0.5);
    lava6.addMotionPath([
    		{ x: "-270", xSpeed: 2000, xEase: "Linear", y: "+270", ySpeed: 1000, yEase: "Linear" },
            { x: "+270", xSpeed: 2000, xEase: "Linear", y: "-270", ySpeed: 1000, yEase: "Linear" }
    ]);
    lava6.start();
    
    lava7 = new Lava(game, 448, 1056, 'lava', this.lavas);
    lava7.body.collideWorldBounds = true;
    lava7.scale.set(1,0.5);
    lava7.addMotionPath([
    		{ x: "+640", xSpeed: 1000, xEase: "Linear", y: "0", ySpeed: 0, yEase: "Linear" },
    		{ x: "0", xSpeed: 0, xEase: "Linear", y: "+160", ySpeed: 1000, yEase: "Linear" },
    		{ x: "-640", xSpeed: 1000, xEase: "Linear", y: "0", ySpeed: 0, yEase: "Linear" },
    		{ x: "0", xSpeed: 0, xEase: "Linear", y: "-160", ySpeed: 1000, yEase: "Linear" }
    ]);
    lava7.start();
}