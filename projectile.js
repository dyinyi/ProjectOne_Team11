// projectile.js
// ShooterBlaser projectile file

// Pokéball = bullet
// bomb = rocket
// blueBall = laser

Projectile.prototype = Object.create(Phaser.Sprite.prototype);
Projectile.prototype.constructor = Projectile;
Projectile.prototype.force = {x:0.0, y:0.0};

function Projectile(game) {

    // bullets
    bullets = game.add.group();
    weaponType(bullets,'bullets','pokeball',0.5,70,1,500,false);

    // rockets
    rockets = game.add.group();
    weaponType(rockets,'rockets','bomb',0.5,500,50,100,true);
    
    // lasers
    lasers = game.add.group();
    weaponType(lasers,'lasers','blueBall',0.4,1,2,100,false);
}

function weaponType(group,name,img,prop,rate,pwr,speed,homing) {

    group.enableBody = true;
    group.physicsBodyType = Phaser.Physics.ARCADE;

    group.name = name;
    group.img = img;
    group.proportion = prop;
    group.fireRate = rate;
    group.power = pwr;
    group.speed = speed;
    group.homing = homing;

}

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
        round.body.setSize(25,25);
        round.reset(player.x, player.y - 20);
        game.physics.arcade.moveToPointer(round,group.speed);
    }

}

// HOMING TO BE IMPLEMENTED IN THE FUTURE
/*
// takes in projectile to home and direts it along with the
// target and homing speed to the main homing function
function startHoming (bullet) {

    var target = game.physics.arcade.distanceBetween(bullet,enemyGroup.children[0]);

    for (var i; i < enemyGroup.children.length; i++) {

        if (game.physics.arcade.distanceBetween(bullet,enemyGroup.children[i]) 
                        < game.physics.arcade.distanceBetween(bullet,target)) {
            target = game.physics.arcade.distanceBetween(bullet,enemyGroup.children[i]);
        }
    }

    console.log(bullet);
    console.log(target);
    console.log(enemyGroup.children[0]);

    accelerateToObject(bullet,target,3);

}

// move toward object
// Uses trigonometry to get objects to follow
function accelerateToObject(obj1, obj2, speed) {

    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);

    // correct angle of angry enemies
    obj1.rotation = angle + game.math.degToRad(90);
    obj1.position.x += Math.cos(angle) * speed;    // accelerateToObject 
    obj1.position.y += Math.sin(angle) * speed;

}
*/

// explodes a sprite:
//  1. destroys the sprite 
//  2. runs an explosion sequence
function explode(object) {

    explosion = this.game.add.sprite(object.x-20, object.y-20, 'explosion');
    explosion.killOnComplete = true;

    object.destroy();
    explosion.animations.add('explosion', [0,1,2,3,4,5,6,7,8,9], 10, false);
    explosion.animations.play('explosion',30,false,true);

}


