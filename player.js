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
        bullets: game.input.keyboard.addKey(Phaser.Keyboard.TILDE),
        rockets: game.input.keyboard.addKey(Phaser.Keyboard.ONE),
        laser: game.input.keyboard.addKey(Phaser.Keyboard.TWO),
        multiBullets: game.input.keyboard.addKey(Phaser.Keyboard.THREE),
        multiLasers: game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
        nukes: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    }

    this.weapon;
    this.cash = 0;
    this.weaponsCaches = setCaches();

}

// Weapon values: bullets:0, rockets:1, laser:2, multi bullets:3,
//                multi laser:4, nukes:5
function setCaches() {

    array = [false, false, false, false, false];
    return array;

}


function setSkin(skinType) {

    if (skinType == 1) {
        P_skin.health = 150;
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

function EbulletsVsPlayer(){
    console.log(player.health);
    player.damage(Ebullets.power);
    //Ebullets.kill();
}


function enemyVsPlayer(){
    player.health -= 5;
}


function updatePlayer(){

    if (player.health <= 0) {
        player.kill();
        // todo: call end game screen function
    }

    game.camera.follow(player);

    //game.physics.arcade.overlap(enemyProjectiles, player, damaging, null, this);

    // moves player
    movePlayer(player);

    // damage to player from enemies
    game.physics.arcade.overlap(enemyGroup, player, enemyVsPlayer, null, this);
    game.physics.arcade.overlap(Ebullets, player, EbulletsVsPlayer, null, this);

    // player weapon selection and fire
    weaponChoice();
    weaponFire();

    // when player finds a new weapon
}

// player movements
function movePlayer() {

    var mX = game.input.mousePointer.x;
    var mY = game.input.mousePointer.y;
    
    player.angle = Math.atan2(player.position.x - mX, player.position.y - mY) * -57.2957795;

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
}

// player chooses desired weapon
function weaponChoice() {

    if (arsenal.bullets.isDown && player.weaponsCaches[0]) {
        player.weapon = 'bullets';
    } else if (arsenal.rockets.isDown && player.weaponsCaches[1]) {
        player.weapon = 'rockets';
    } else if (arsenal.laser.isDown && player.weaponsCaches[2]) {
        player.weapon = 'laser';
    } else if (arsenal.multiBullets.isDown && player.weaponsCaches[3]) {
        player.weapon = 'multiBullets';
    } else if (arsenal.multiLasers.isDown && player.weaponsCaches[4]) {
        player.weapon = 'multiLasers';
    }
}

// player fires equipped weapon
function weaponFire() {

    // Checks for user input (click) for weapons fire
    // Fires weapon based on selection (Z,X,C)
    if (player.alive) {
        if (game.input.activePointer.isDown) {
            if (player.weapon === 'bullets') {
                singleFire(bullets);
            } else if (player.weapon === 'rockets') {
                singleFire(rockets);
            } else if (player.weapon === 'laser') {
                singleFire(lasers);
            } else if (player.weapon === 'multiBullets') {
                multiFire(multiBullets);
            } else if (player.weapon === 'multiLasers') {
                multiFire(multiLasers);
            } 
        }

        if (arsenal.nukes.isDown && player.weaponsCaches[5]) {
            nukeFire(nukes);
        }
    }
}

