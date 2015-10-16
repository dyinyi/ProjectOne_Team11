// projectile.js
// ShooterBlaser projectile file

// Pokéball = bullet
// bomb = rocket
// blueBall = laser

Projectile.prototype = Object.create(Phaser.Group.prototype);
Projectile.prototype.constructor = Projectile;
Projectile.prototype.force = {x:0.0, y:0.0};

function Projectile(game) {

    // bullets
    bullets = game.add.group();
    weaponType(bullets,'bullets','pokeball',5,0.5,70,2,500,false,false);

    // rockets
    rockets = game.add.group();
    weaponType(rockets,'rockets','bomb',20,0.8,1500,100,50,true,true);

    // lasers
    lasers = game.add.group();
    weaponType(lasers,'lasers','blueBall',20,0.4,1,2,100,false,false);
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
    group.explosive = explosive

}

function weaponCollisions(weapon) {

    for (var i = 0; i < bullets.length; i++) {

        if (game.physics.arcade.overlap(weapon.children[i],walls)) {
            endProjectile(weapon.children[i]);
        }
    }
}

// allows for consistent rate of fire 
var nextFire = 0;

// prep firing weapon
// Made based on the very helpful Phaser game: Tanks
//      http://phaser.io/examples/v2/games/tanks
function singleFire(group) {

    // establish physics
    group.enableBody = true;
    group.physicsBodyType = Phaser.Physics.ARCADE;

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
    accelerateToObject(bullet,target,5);
}

// move toward object
// Uses trigonometry to get objects to follow
function accelerateToObject(obj1, obj2, speed) {

    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);

    // correct angle of projectiles
    obj1.rotation = angle + game.math.degToRad(90);
    obj1.body.x += Math.cos(angle) * speed;    // accelerateToObject 
    obj1.body.y += Math.sin(angle) * speed;


}

// explodes a sprite:
//  1. destroys the sprite 
//  2. runs an explosion sequence
function endProjectile(object) {

    // non-explosives die
    if (object.parent.explosive === false) {
        object.destroy();
    } 

    // explosives EXPLODE
    else {

        explosion = this.game.add.sprite(object.x-20, object.y-20, 'explosion');
        explosion.killOnComplete = true;

        object.destroy();
        explosion.animations.add('explosion', [0,1,2,3,4,5,6,7,8,9], 10, false);
        explosion.animations.play('explosion',30,false,true);

    }

}

