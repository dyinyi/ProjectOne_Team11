//sound.js

//add these in game.js

//global vars
var startScene;
var bossScene;
var endScene;
var bulletsFX;
var lasersFX;
var rocketsFX;
var nukesFX;
var multiBulletsFX;
var multiLasersFX;
var hitFX;
var explosion1FX;
var explosion2FX;
var explosion3FX;
var explosion4FX;
var coinFX;


function preload() {

    game.load.audio('startScene', 'audio/All of Us.mp3');
    game.load.audio('bossScene', "audio/We're the Resistors.mp3");
    game.load.audio('endScene', "audio/We're all under the stars.mp3");
    game.load.audio('bulletsFX', 'audio/bullets.wav');
    game.load.audio('lasersFX', 'audio/lasers.wav');
    game.load.audio('rocketsFX', 'audio/rockets.wav');
    game.load.audio('nukesFX', 'audio/nukes.wav');
    game.load.audio('multiBulletsFX', 'audio/multiBullets.wav');
    game.load.audio('multiLasersFX', 'audio/multiLasers.wav');
 // game.load.audio('multiLasersFX', 'audio/multiLasers_b.wav');
    game.load.audio('hitFX', 'audio/hit.wav');
    game.load.audio('explosion1FX', 'audio/explosion1');
    game.load.audio('explosion2FX', 'audio/explosion2');
    game.load.audio('explosion3FX', 'audio/explosion3');
    game.load.audio('explosion4FX', 'audio/explosion4');
    game.load.audio('coinFX', 'audio/coin');


}



function create() {
	startScene = game.add.audio('startScene');
	startScene.loop = true;
	bossScene = game.add.audio('bossScene');
	bossScene.loop = true;
	endScene = game.add.audio('endScene');
	bulletsFX = game.add.audio('bulletsFX');
	lasersFX = game.add.audio('lasersFX');
	rocketsFX = game.add.audio('rocketsFX');
	nukesFX = game.add.audio('nukesFX');
	multiBulletsFX = game.add.audio('multiBulletsFX');
	multiLasersFX = game.add.audio('multiLasersFX');
	hitFX = game.add.audio('hitFX');
	explosion1FX = game.add.audio('explosion1FX');
	explosion2FX = game.add.audio('explosion2FX');
	explosion3FX = game.add.audio('explosion3FX');
	explosion4FX = game.add.audio('explosion4FX');
	coinFX = game.add.audio('coinFX');

//when the level starts
	startScene.play();


}

function update(){

	//when switching music
	startScene.stop();
	bossScene.play();
	//end scene
	bossScene.stop();
	endScene.play();

}



//in bitcoin.js add

function pickUpCoin() {
	coinFX.play();
}



//in player.js

function EbulletsVsPlayer(){
    console.log(player.health);
    hitFX.play();
    player.damage(Ebullets.power);
    //Ebullets.kill();
}

function weaponFire() {

    // Checks for user input (click) for weapons fire
    // Fires weapon based on selection (Z,X,C)
    if (player.alive) {
        if (game.input.activePointer.isDown) {
            if (player.weapon === 'bullets') {
            	bulletsFx.play();
                singleFire(bullets);
            } else if (player.weapon === 'rockets') {
            	rocketsFX.play();
                singleFire(rockets);
            } else if (player.weapon === 'laser') {
            	laserFX.play();
                singleFire(lasers);
            } else if (player.weapon === 'multiBullets') {
            	multiBullets.play();
                multiFire(multiBullets);
            } else if (player.weapon === 'multiLasers') {
            	multiLasers.play();
                multiFire(multiLasers);
            } 
        }

        if (arsenal.nukes.isDown && player.weaponsCaches[5]) {
        	nukesFX.play();
            nukeFire(nukes);
        }
    }
}

//in enemy.js

Enemy.prototype.enemyTakesDamage = function(enemy,projectile) {

    // enemy takes damage
    this.damage(projectile.parent.power);
    rndN = game.rnd.between(1,4);
    if (rndN == 1){explosion1FX.play();}
    else if(rndN == 2){explosion2FX.play();}
    else if(rndN == 3){explosion3FX.play();}
    else if(rndN == 4){explosion4FX.play();}
    // destroy projectile
    endProjectile(projectile);
}



