// player.js
// ShooterBlaster player file

var P_skin = { health:0, type:0, name:"N/A", speed:0};
var P_weapon = "temp";
var wasd;
var arsenal;

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
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

    // Weapon cache values: bullets:0, rockets:1, laser:2,
    //             multi bullets:3, multi laser:4, nukes:5
    this.weaponsCaches = [false, false, false, false, false];

}

// allows different player types
function setSkin(skinType) {

    if (skinType == 1) {
        P_skin.health = 15000;
        P_skin.type = 1;
        P_skin.name = 'player1';
        P_skin.speed = 10;
    }

    else {
        P_skin.health = 30;
        P_skin.type = 2;
        P_skin.name = 'player2';
        P_skin.speed = 2;
    }

}

function updatePlayer(){

    if (player.health <= 0) {
        rektFX.play();
        player.kill();
        game.add.text(player.x, player.y, "GAME OVER",
            { font: "30px Arial", fill: "#fff", align: "center" });
        game.time.events.add(Phaser.Timer.SECOND * 3, restart, this);
    }

    game.camera.follow(player);

    // moves player
    movePlayer(player);

    // damage to player from enemies and enemy fire
    game.physics.arcade.overlap(enemyGroup, player, enemyVsPlayer, null, this);
    game.physics.arcade.overlap(Ebullets, player, EweaponsVsPlayer, null, this);
    game.physics.arcade.overlap(Elasers, player, EweaponsVsPlayer, null, this);
    game.physics.arcade.overlap(Ebombs, player, EweaponsVsPlayer, null, this);


    // player weapon selection and fire
    weaponChoice();
    weaponFire();
}

// enemy weapon/player interaction
function EweaponsVsPlayer(player,Eweapon) {

    player.damage(Eweapon.parent.power); // damage player
    endProjectile(Eweapon); // destroy projectile

    // Audio
    hitFX.play();
}


function enemyVsPlayer(){
    player.health -= 5;
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
                bulletsFX.play();
                singleFire(bullets);
            } else if (player.weapon === 'rockets') {
                singleFire(rockets);
            } else if (player.weapon === 'laser') {
                singleFire(lasers);
            } else if (player.weapon === 'multiBullets') {
                multiBulletsFX.play();
                multiFire(multiBullets);
            } else if (player.weapon === 'multiLasers') {
                multiLaserFX.play()
                multiFire(multiLasers);
            } 
        }

        if (arsenal.nukes.isDown && player.weaponsCaches[5]) {
            nukesFX.play();
            nukeFire(nukes);
        }
    }
}

