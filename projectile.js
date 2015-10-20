// projectile.js
// ShooterBlaser projectile file

Projectile.prototype = Object.create(Phaser.Group.prototype);
Projectile.prototype.constructor = Projectile;
Projectile.prototype.force = {x:0.0, y:0.0};

function Projectile(game) {
                            /* Player Weapons */
    // bullets
    bullets = game.add.group();
    weaponType(bullets,'bullets','pokeball',8,0.5,70,2,500,false,false);

    // rockets
    rockets = game.add.group();
    weaponType(rockets,'rockets','bomb',20,0.8,1300,50,5,true,true);

    // lasers
    lasers = game.add.group();
    weaponType(lasers,'lasers','greenBeam',10,0.15,35,2,300,false,false);

    // multi (tomato) bullets
    multiBullets = game.add.group();
    weaponType(multiBullets,'multiBullets','tomato',20,0.1,70,2,500,false,true);

    // multi lasers
    multiLasers = game.add.group();
    weaponType(multiLasers,'multiLasers','bluBall',20,0.5,35,2,1000,false,false);

    // nukes
    nukes = game.add.group();
    weaponType(nukes,'nukes','nuke',20,0.8,10000,100,2,true,true);

                            /* Enemy weapons */
    // enemy bullets
    Ebullets = game.add.group();
    weaponType(Ebullets,'Ebullets','pokeball',8,0.5,150,2*baseDMG,500,false,false);

    // enemy lasers
    Elasers = game.add.group();
    weaponType(Elasers,'Elasers','greenBeam',10,0.4,10,20*baseDMG,600,false,false);

    // enemy bombs
    Ebombs = game.add.group();
    weaponType(Ebombs,'Ebombs','aBomb',80,1,3000,300*baseDMG,300,false,true);
}

function weaponType(group,name,img,size,prop,rate,pwr,speed,homing,explosive) {

    group.enableBody = true;
    group.physicsBodyType = Phaser.Physics.ARCADE;

    // name and sprite
    group.name = name;
    group.img = img;

    // size and proportion to sprite file
    group.hitSize = size;
    group.proportion = prop;

    // weapon properties
    group.fireRate = rate;
    group.power = pwr;
    group.speed = speed;
    group.homing = homing;
    group.explosive = explosive;

}

// calls the weapon collisions against the
// walls function for all weapon types 
function weaponCollisionsUpdate() {
    weaponCollisions(bullets);
    weaponCollisions(rockets);
    weaponCollisions(lasers);
    weaponCollisions(multiBullets);
    weaponCollisions(multiLasers);
    weaponCollisions(nukes);

    // enemy weapons
    weaponCollisions(Ebullets);
    weaponCollisions(Elasers);
    weaponCollisions(Ebombs);
}

// ends projectiles if they touch the walls
function weaponCollisions(weapon) {

    for (var i = 0; i < weapon.length; i++) {

        if (game.physics.arcade.overlap(weapon.children[i],walls)) {
            endProjectile(weapon.children[i]);
        }
    }
}

// allows for consistent rate of fire 
var nextFire = 0;

// prep firing single shot weapons
// Made based on the very helpful Phaser game: Tanks
//      http://phaser.io/examples/v2/games/tanks
function singleFire(group) {

    // create sprite and define boundary properties
    group.createMultiple(1,group.img);
    group.setAll('checkWorldBounds',true);
    group.setAll('outOfBoundsKill',true);

    // fire weapon 
    if (game.time.now > nextFire && group.countDead() > 0) {
        nextFire = game.time.now + group.fireRate;
        var round = group.getFirstDead();
        round.scale.setTo(group.proportion,group.proportion);
        round.body.setSize(group.hitSize,group.hitSize);
        round.reset(player.x, player.y - 20);
        game.physics.arcade.moveToPointer(round,group.speed);

        if (group.name === 'rockets') {
            rocketsFX.play();
        }
    }
}

// MULTI-FIRE
var firePos = 0;
// prep firing multi fire weapons
// Made based on the very helpful Phaser game: Tanks
//      http://phaser.io/examples/v2/games/tanks
function multiFire(group) {

    // create sprite and define boundary properties
    group.createMultiple(1,group.img);
    group.setAll('checkWorldBounds',true);
    group.setAll('outOfBoundsKill',true);

    // fire weapon 
    if (game.time.now > nextFire && group.countDead() > 0) {
        nextFire = game.time.now + group.fireRate/3;
        var round = group.getFirstDead();
        round.scale.setTo(group.proportion,group.proportion);
        round.body.setSize(group.hitSize,group.hitSize);
        setFirePos(round); // keeps cycling fire position
        game.physics.arcade.moveToPointer(round,group.speed);
    }

}

// sets where the projectile sprite spawns
function setFirePos(round) {

    // keeps fire position counter in the 0-2 range
    if (firePos > 2) {
        firePos = 0;
    }

    // set fire position
    if (firePos === 0) {
        round.reset(player.x + 15, player.y);
    } else if (firePos === 1) {
        round.reset(player.x - 30, player.y);
    } else {
        round.reset(player.x, player.y - 30);
    }

    firePos++;
}

// special fire function for the nuke
function nukeFire(group) {

    // create sprite and define boundary properties
    group.createMultiple(1,group.img);
    group.setAll('checkWorldBounds',true);
    group.setAll('outOfBoundsKill',true);

    // fire weapon 
    if (game.time.now > nextFire && group.countDead() > 0) {
        nextFire = game.time.now + group.fireRate/3;
        var round = group.getFirstDead();
        round.scale.setTo(group.proportion,group.proportion);
        round.body.setSize(group.hitSize,group.hitSize);
        setFirePos(round); // keeps cycling fire position
        game.physics.arcade.moveToPointer(round,group.speed);
    }

}


// takes in projectile to home and direts it along with the
// target and homing speed to the main homing function
function pickTarget (bullet) {

    var target = enemyGroup.children[0]; // intialize target

    // loop through all enemies
    for (var i = 0; i < enemyGroup.length; i++) {
        // if an enemy is closer than enemy 1, set that as the target
        if (game.physics.arcade.distanceBetween(bullet,enemyGroup.children[i])
                        < game.physics.arcade.distanceBetween(bullet,target)) {
            target = enemyGroup.children[i];
        }
    }

    // move toward target
    accelerateToObject(bullet,target,bullet.parent.speed);
}

// move toward object
// Uses trigonometry to get objects to follow
function accelerateToObject(obj1, obj2, speed) {

    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);

    // correct angle of projectiles
    obj1.rotation = angle + game.math.degToRad(90);
    obj1.body.x += Math.cos(angle) * speed;
    obj1.body.y += Math.sin(angle) * speed;

}

// explodes a sprite:
//  1. destroys the sprite 
//  2. runs an explosion sequence
function endProjectile(object) {

    // Explosives explode
    if (object.parent.explosive) {

        var explosion;

        // multi bullets/tomatoes
        if (object.parent.name === 'multiBullets') {
            explosion=this.game.add.sprite(object.x-80,object.y-80,'tomatoExplosion');
            explosion.scale.setTo(0.75,0.75);
            explosion.killOnComplete = true;
            explosion.animations.add('tomatoExplosion', [0,1,2,3,4,5,6,7,8,9,10,11,12], 12, false);
            explosion.animations.play('tomatoExplosion',30,false,true);
        }

        // nukes, rockets, and enemy bombs (Ebombs)
        else {

            if (object.parent.name === 'nukes' || object.parent.name === 'Ebombs') {
                explosion=this.game.add.sprite(object.x-80,object.y-80,'explosion');
                explosion.scale.setTo(3,3);
            } else {
                explosion=this.game.add.sprite(object.x-20,object.y-20,'explosion');
            }
            explosion.killOnComplete = true;
            explosion.animations.add('explosion', [0,1,2,3,4,5,6,7,8,9], 10, false);
            explosion.animations.play('explosion',30,false,true);
        }
    }
    object.destroy();
}
