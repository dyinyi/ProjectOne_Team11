// player.js
// ShooterBlaster player file

var P_skin = { health:0, type:0, name:"N/A", speed:0};
var P_weapon = "temp";
var wasd;
var arsenal;

Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

//Player.prototype.enemyVsPlayer = enemyVsPlayer;
//Player.prototype.projectilesVsPlayer = projectilesVsPlayer;
//Player.prototype.deploy = deploy;
//Player.prototype.setWeapon = setWeapon;

Player.prototype.setSkin = setSkin;

function Player(game, x, y, P_skin) { //, P_weapon) {
	
    Phaser.Sprite.call(this, game, x, y, P_skin.name);
    
    this.scale.setTo(0.1,0.1);
    this.anchor.setTo(0.5,0.5);
    
    game.add.existing(this);
    
    this.enableBody = true;
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);

    this.health = P_skin.health;

    this.cursors = game.input.keyboard.createCursorKeys();

    wasd = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    specials = {
        special1: game.input.keyboard.addKey(Phaser.Keyboard.Q),
        special2: game.input.keyboard.addKey(Phaser.Keyboard.E)
    };

    arsenal = {
        bullets: game.input.keyboard.addKey(Phaser.Keyboard.Z),
        rockets: game.input.keyboard.addKey(Phaser.Keyboard.X),
        laser: game.input.keyboard.addKey(Phaser.Keyboard.C),
    }
    this.weapon = 'bullets';
}


function setSkin(skinType) {

    if (skinType == 1) {
        P_skin.health = 15;
        P_skin.type = 1;
        P_skin.name = 'player1';
        P_skin.speed = 4.5;
    }

    else {
        P_skin.health = 30;
        P_skin.type = 2;
        P_skin.name = 'player2';
        P_skin.speed = 2;
    }

}


function useSpecial1() {
    if (P_skin.type == 1) {
        //cooldown = new Timer(game);
        
        player.x -= 5*P_skin.speed; //no .body for now
        // todo: call drifting/teleport animation function
    }
    if (P_skin.type == 2) {
        player.health += 5;
        // todo: call heal animation function as well
    }

}

function useSpecial2(game) {
    if (P_skin.type == 1) {
        player.x += 5*P_skin.speed; //no .body for now
        // todo: call drifting/teleport animation function
    }
    if (P_skin.type == 2) {
        // todo: use weapon of massive destruction   
    }
}

/*
function projectilesVsPlayer(enemyProjectiles){
    this.health -= enemyProjectiles.power;
    enemyProjectiles.kill();
}
*/

/*
function enemyVsPlayer(){
    this.health -= 5;
}
*/

function updatePlayer(){

    if (player.health <= 0) {
        player.kill();
        // todo: call end game screen function
    }

    game.camera.follow(player);

    //game.physics.arcade.overlap(enemyProjectiles, Player, damaging, null, this);

    var mX = game.input.mousePointer.x;
    var mY = game.input.mousePointer.y;
    
    player.angle = Math.atan2(player.position.x - mX, player.position.y - mY)  * -57.2957795;

    if (wasd.up.isDown) {
        player.body.y -= P_skin.speed;
    }
    if (wasd.down.isDown) {
        player.body.y += P_skin.speed;
    }
    if (wasd.left.isDown) {
        player.body.x -= P_skin.speed;
    }
    if (wasd.right.isDown) {
        player.body.x += P_skin.speed;
    }

    // Checks for user input (click) for weapons fire
    // Fires weapon based on selection (Z,X,C)
    if (game.input.activePointer.isDown) {
        //if (this.weapon === 'bullets') {
            singleFire(bullets);
        /*} else if (this.weapon === 'rockets') {
            singleFire(rockets);
       // } else if (this.weapon === 'laser') {
            singleFire(lasers);
        }
        */
    }
/*
    if (specials.special1.isDown) {
        useSpecial1();
    }
    if (specials.special2.isDown) {
        useSpecial2();
    }
*/
    //game.physics.arcade.overlap(enemyGroup, this, enemyVsPlayer, null, this);
    //game.physics.arcade.overlap(projectilesGroup, this, projectilesVsPlayer, null, this);

    // player chooses desired weapon
    if (arsenal.bullets.isDown) {
        this.weapon = 'bullets';
    } else if (arsenal.rockets.isDown) {
        this.weapon = 'rockets';
    } else if (arsenal.laser.isDown) {
        this.weapon = 'laser';
    }
}


/*
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.force = {x:0.0, y:0.0};

// control stuff
var wasd;
var arsenal;
var player;

// Arthur's sample code was instrumental in making this function
function Player(game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'player');
    this.scale.set(0.15, 0.15);
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false;
    game.add.existing(this);

    this.cursors = game.input.keyboard.createCursorKeys();

    // dictionary for game input
    wasd = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    }


///
    // dictionary for weapons choice
    arsenal = {
    	bullets: game.input.keyboard.addKey(Phaser.Keyboard.Z),
    	rockets: game.input.keyboard.addKey(Phaser.Keyboard.X),
    	laser: game.input.keyboard.addKey(Phaser.Keyboard.C),
    }
///


    this.weapon = 'bullets';
}

Player.prototype.update = function() {

    // from Arthur's example code
    var mX = game.input.mousePointer.x;
    var mY = game.input.mousePointer.y;
    
    // look at the mouse
    this.angle = Math.atan2(player.position.x - mX, player.position.y - mY)  * -57.2957795;

    // move player sprite around
    if (wasd.up.isDown) {
        this.y -= 4;
    }
    if (wasd.down.isDown) {
        this.y += 4;
    }
    if (wasd.left.isDown) {
        this.x -= 4;
    }
    if (wasd.right.isDown) {
        this.x += 4;
    }

///
    // player chooses desired weapon
    if (arsenal.bullets.isDown) {
    	this.weapon = 'bullets';
    } else if (arsenal.rockets.isDown) {
    	this.weapon = 'rockets';
    } else if (arsenal.laser.isDown) {
    	this.weapon = 'laser';
    }
///

    // Checks for user input (click) for weapons fire
    // Fires weapon based on selection (Z,X,C)
    if (game.input.activePointer.isDown) {
    	if (this.weapon === 'bullets') {
            singleFire(bullets);
    	} else if (this.weapon === 'rockets') {
            singleFire(rockets);
    	} else if (this.weapon === 'laser') {
            singleFire(lasers);
    	}
    }

}
*/