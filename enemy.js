// enemy.js
// ShooterBlaster enemy file

var enemyID = 0;

var enemyType1 = setEnemyType(20,'speedship',100,200,250,1,10,18,'Ebullets'); // basic
var enemyType2 = setEnemyType(100,'heavyship',250,200,350,1.3,60,80,'Ebullets'); // secondary
var enemyType3 = setEnemyType(200,'elShip',300,1000,300,1.6,200,200,'Elasers');//boss
var enemyType4 = setEnemyType(50,'turrett',0,50,300,0.5,10,20,'Ebombs'); // turret

var E_type = { health:20, name:"N/A", speed:0, coin:1, aggro:0, 
                    scale:1, sizeX:10, sizeY:10, weapon:"N/A" };

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.gettingHitByP = gettingHitByP;
Enemy.prototype.dropCoin = dropCoin;

function Enemy(game, x, y, E_type) {
    Phaser.Sprite.call(this, game, x, y, E_type.name);
    this.scale.setTo(E_type.scale,E_type.scale);
    this.anchor.setTo(0.5,0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
    enemyID += 1;
    this.body.setSize(E_type.sizeX,E_type.sizeY);
    this.health = E_type.health;
    this.type = E_type.type;
    this.name = E_type.name;
    this.speed = E_type.speed;
    this.coin = E_type.coin;
    this.aggro = E_type.aggro;
    this.weapon = E_type.weapon;
    enemyGroup.add(this);
}

// gives each enemy specific properties
function setEnemyType(health, name, speed, coin, aggro, scale, sizeX, sizeY, weapon){
    var newE_type = {health:20, name:"N/A", speed:0, coin:0, dmg: 0};
    newE_type.health = health;
    newE_type.name= name;
    newE_type.speed = speed;
    newE_type.coin = coin;
    newE_type.aggro = aggro;
    newE_type.scale = scale;
    newE_type.sizeX = sizeX;
    newE_type.sizeY = sizeY;
    newE_type.weapon = weapon;
    
    return newE_type;
}

// adds enemy variables into the game
function addEnemies() {

    enemyGroup = game.add.group();
    enemy1 = new Enemy(game,1350,800,enemyType1);
    enemy2 = new Enemy(game,400,700,enemyType2); 
    enemy3 = new Enemy(game,1500,600,enemyType1)
    enemy4 = new Enemy(game,1575,800,enemyType1);
    enemy5 = new Enemy(game,800,700,enemyType2);
    enemy6 = new Enemy(game,1725,600,enemyType1);
    enemy7 = new Enemy(game,1900,800,enemyType2);    
    enemy8 = new Enemy(game,1200,700,enemyType1);
    enemy9 = new Enemy(game,2050,600,enemyType2);
    enemy10 = new Enemy(game,1280,80,enemyType1);
    enemy11 = new Enemy(game,2200,160,enemyType1);
    enemy12 = new Enemy(game,2000,1700,enemyType3);
    enemy13 = new Enemy(game,200,600,enemyType4);
    enemy14 = new Enemy(game,100,800,enemyType4);
    enemy15 = new Enemy(game,1000,700,enemyType4);
    enemy16 = new Enemy(game,1200,1500,enemyType4);

    enemyGroup.enableBody = true;
    enemyGroup.collideWorldBounds = true;
}

Enemy.prototype.update = function() {

    // destroy enemy and release coin if health zero or less
    if (this.health <=0) {
        this.destroy();
        this.dropCoin();
        killCount += 1;
    } else {
        // move enemies toward player
        if (game.physics.arcade.distanceBetween(this,player) < this.aggro) {
            
            game.physics.arcade.moveToObject(this, player, this.speed);

            if (this.weapon === 'Ebullets') {
                enemyFire(Ebullets,this);
            } else if (this.weapon === 'Elasers') {
                enemyFire(Elasers,this);
            } else if (this.weapon === 'Ebombs') {
                enemyFire(Ebombs,this);
            }
        }

    }

    // Overlap with player fire
    game.physics.arcade.overlap(this,bullets,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,rockets,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,lasers,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,multiBullets,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,multiLasers,this.enemyTakesDamage,null,this);
    game.physics.arcade.overlap(this,nukes,this.enemyTakesDamage,null,this);

}

// Lowers enemy health based on power of taken weapon fire
Enemy.prototype.enemyTakesDamage = function(enemy,projectile) {
    
    this.damage(projectile.parent.power); // enemy takes damage

    // Audio
    rndN = game.rnd.between(1,4);
    if (rndN == 1) {
        explosion1FX.play();
    } else if(rndN == 2) {
        explosion2FX.play();
    } else if(rndN == 3) {
        explosion3FX.play();
    } else if(rndN == 4) {
        explosion4FX.play();
    }

    endProjectile(projectile); // destroy projectile
}

//debugging function
function gettingHitByP() {
    killPlayer();
    this.dropCoin();
}

function dropCoin() {

    if (this.name === 'elShip') {
        new Dogecoin(game, this.position.x, this.position.y);
    } else {
        new Bitcoin(game, this.position.x, this.position.y, this.coin);
    }
}

// ENEMY PROJECTILE IMPLEMENTATION
var nextEnemyFire = 0;

function enemyFire(group,enemy) {

    console.log(enemy);

    // create sprite and define boundary properties
    group.createMultiple(1,group.img);
    group.setAll('checkWorldBounds',true);
    group.setAll('outOfBoundsKill',true);

    // fire weapon 
    if (game.time.now > nextEnemyFire && group.countDead() > 0) {
        nextEnemyFire = game.time.now + group.fireRate;
        var round = group.getFirstDead();
        round.scale.setTo(group.proportion,group.proportion);
        round.body.setSize(group.hitSize,group.hitSize);
        round.reset(enemy.x, enemy.y - 20);
        game.physics.arcade.moveToObject(round,player,group.speed);
    }
}
